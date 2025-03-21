const pMap = require('p-map')
const progressStepper = require('./util/progressStepper')
const retryOnFailure = require('./util/retryOnFailure')
const suffixTag = require('./util/suffixTag')
const {partition} = require('lodash')

const DOCUMENT_IMPORT_CONCURRENCY = 6

async function importBatches(batches, options) {
  const progress = progressStepper(options.onProgress, {
    step: 'Importing documents',
    total: batches.length,
  })

  const mapOptions = {concurrency: DOCUMENT_IMPORT_CONCURRENCY}
  const batchSizes = await pMap(batches, importBatch.bind(null, options, progress), mapOptions)

  return batchSizes.reduce((prev, add) => prev + add, 0)
}

function importBatch(options, progress, batch) {
  const {client, operation, releasesOperation, tag} = options
  const maxRetries = operation === 'create' ? 1 : 3

  return retryOnFailure(
    () => {
      const [releaseDocs, docs] = partition(batch, (doc) => doc._id.startsWith('_.releases.'))

      const docsTransaction =
        docs.length > 0
          ? docs
              .reduce((trx, doc) => trx[operation](doc), client.transaction())
              .commit({visibility: 'async', tag: suffixTag(tag, 'doc.create')})
              .then(progress)
              .then((res) => res.results.length)
          : Promise.resolve(0)

      const releasesAction = releaseDocs.map((doc) =>
        client
          .action({
            actionType: 'sanity.action.release.import',
            releaseId: doc.name,
            attributes: doc,
            ifExists: releasesOperation,
          })
          .then(() => 1)
          .catch((err) => {
            err.message = `Release import failed for ${doc._id}: ${err.message}`

            throw err
          }),
      )

      return Promise.all([docsTransaction, ...releasesAction]).then((results) => {
        const totalCount = results.reduce((sum, count) => sum + count, 0)
        return totalCount
      })
    },
    {maxRetries, isRetriable},
  )
}

function isRetriable(err) {
  return !err.response || err.response.statusCode !== 409
}

module.exports = importBatches
