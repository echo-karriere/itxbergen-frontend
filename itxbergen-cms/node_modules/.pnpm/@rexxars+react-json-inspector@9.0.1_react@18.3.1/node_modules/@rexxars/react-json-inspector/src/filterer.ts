import {isEmpty} from './isEmpty'
import {JsonInspectorProps} from './JsonInspector'
import {isObject} from './isObject'

export const getFilterer = memoize(
  (data: unknown, opts?: JsonInspectorProps['filterOptions']) => {
    const options = opts || {cacheResults: true}

    const cache: Record<string, Record<string, unknown>> = {}

    return function (query: string) {
      if (!options.cacheResults) {
        return find(data, query, options)
      }

      let subquery

      if (!cache[query]) {
        for (var i = query.length - 1; i > 0; i -= 1) {
          subquery = query.slice(0, i)

          if (cache[subquery]) {
            cache[query] = find(cache[subquery], query, options)
            break
          }
        }
      }

      if (!cache[query]) {
        cache[query] = find(data, query, options)
      }

      return cache[query]
    }
  },
)

function find(
  data: unknown,
  query: string,
  options: JsonInspectorProps['filterOptions'],
) {
  if (!isObject(data) && !Array.isArray(data)) {
    return {}
  }

  return Object.keys(data).reduce(function (
    acc: Record<string, unknown>,
    key: string,
  ) {
    // This fails because data can be an array, but it technically speaking works.
    // I'd rather refactor this entire thing, but for now I am just porting it with least-effort.
    const value = (data as any)[key]

    let matches

    if (!value) {
      return acc
    }

    if (typeof value !== 'object') {
      if (contains(query, key, options) || contains(query, value, options)) {
        acc[key] = value
      }
      return acc
    }

    // If _key_ matches, include it
    if (contains(query, key, options)) {
      acc[key] = value
      return acc
    }

    matches = find(value, query, options)

    if (!isEmpty(matches)) {
      Object.assign(acc, pair(key, matches))
    }

    return acc
  }, {})
}

function contains(
  query: string,
  value: unknown,
  options: JsonInspectorProps['filterOptions'],
) {
  if (!value) {
    return false
  }

  var haystack = String(value)
  var needle = query

  if (options?.ignoreCase) {
    haystack = haystack.toLowerCase()
    needle = needle.toLowerCase()
  }

  return haystack.indexOf(needle) !== -1
}

function pair(key: string, value: unknown) {
  return {[key]: value}
}

function memoize<R>(
  fn: (data: unknown, opts?: JsonInspectorProps['filterOptions']) => R,
) {
  let lastData: unknown | undefined
  let lastOptions: JsonInspectorProps['filterOptions'] | undefined
  let lastResult: R | undefined

  return (data: unknown, options: JsonInspectorProps['filterOptions']): R => {
    if (!lastResult || data !== lastData || options !== lastOptions) {
      lastData = data
      lastOptions = options
      lastResult = fn(data, options)
    }
    return lastResult
  }
}
