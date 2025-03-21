"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
));
var fs = require("node:fs"), os = require("node:os"), path = require("node:path"), readline = require("node:readline"), node_stream = require("node:stream"), node_worker_threads = require("node:worker_threads"), client = require("@sanity/client"), types = require("@sanity/types"), sanity = require("sanity"), zlib = require("node:zlib"), tar = require("tar-stream"), getStudioWorkspaces = require("../../../_chunks-cjs/getStudioWorkspaces.js"), mockBrowserEnvironment = require("../../../_chunks-cjs/mockBrowserEnvironment.js");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var fs__default = /* @__PURE__ */ _interopDefaultCompat(fs), os__default = /* @__PURE__ */ _interopDefaultCompat(os), path__default = /* @__PURE__ */ _interopDefaultCompat(path), readline__default = /* @__PURE__ */ _interopDefaultCompat(readline), zlib__default = /* @__PURE__ */ _interopDefaultCompat(zlib), tar__default = /* @__PURE__ */ _interopDefaultCompat(tar);
const HEADER_SIZE = 300, isGzip = (buf) => buf.length >= 3 && buf[0] === 31 && buf[1] === 139 && buf[2] === 8, isDeflate = (buf) => buf.length >= 2 && buf[0] === 120 && (buf[1] === 1 || buf[1] === 156 || buf[1] === 218), isTar = (buf) => buf.length >= 262 && buf[257] === 117 && buf[258] === 115 && buf[259] === 116 && buf[260] === 97 && buf[261] === 114;
async function* extract(stream, extractor) {
  const drained = new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        for await (const chunk of stream) extractor.write(chunk);
        extractor.end(), resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
  yield* extractor, await drained, extractor.destroy();
}
async function* maybeExtractNdjson(stream) {
  let buffer = Buffer.alloc(0);
  for await (const chunk of stream) {
    if (buffer = Buffer.concat([buffer, chunk]), buffer.length < HEADER_SIZE) continue;
    const fileHeader = buffer, restOfStream = async function* () {
      yield fileHeader, yield* stream;
    };
    if (isGzip(fileHeader)) {
      yield* maybeExtractNdjson(extract(restOfStream(), zlib__default.default.createGunzip()));
      return;
    }
    if (isDeflate(fileHeader)) {
      yield* maybeExtractNdjson(extract(restOfStream(), zlib__default.default.createDeflate()));
      return;
    }
    if (isTar(fileHeader))
      for await (const entry of extract(restOfStream(), tar__default.default.extract())) {
        const filename = path__default.default.basename(entry.header.name);
        if (!(path__default.default.extname(filename).toLowerCase() !== ".ndjson" || filename.startsWith("."))) {
          for await (const ndjsonChunk of entry) yield ndjsonChunk;
          return;
        }
      }
    yield* restOfStream();
  }
}
async function* extractDocumentsFromNdjsonOrTarball(file) {
  const lines = readline__default.default.createInterface({
    input: node_stream.Readable.from(maybeExtractNdjson(file))
  });
  for await (const line of lines) {
    const trimmed = line.trim();
    trimmed && (yield JSON.parse(trimmed));
  }
  lines.close();
}
function createReporter(parentPort) {
  if (!parentPort)
    throw new Error("parentPart was falsy");
  return {
    event: new Proxy({}, {
      get: (target, name) => typeof name != "string" ? target[name] : (payload) => {
        const message = {
          type: "event",
          name,
          payload
        };
        parentPort.postMessage(message);
      }
    }),
    stream: new Proxy({}, {
      get: (target, name) => typeof name != "string" ? target[name] : {
        emit: (payload) => {
          const message = {
            type: "emission",
            name,
            payload
          };
          parentPort.postMessage(message);
        },
        end: () => {
          const message = {
            type: "end",
            name
          };
          parentPort.postMessage(message);
        }
      }
    })
  };
}
const MAX_VALIDATION_CONCURRENCY = 100, DOCUMENT_VALIDATION_TIMEOUT = 3e4, REFERENCE_INTEGRITY_BATCH_SIZE = 100, {
  clientConfig,
  workDir,
  workspace: workspaceName,
  configPath,
  dataset,
  ndjsonFilePath,
  projectId,
  level,
  maxCustomValidationConcurrency,
  maxFetchConcurrency,
  studioHost
} = node_worker_threads.workerData;
if (node_worker_threads.isMainThread || !node_worker_threads.parentPort)
  throw new Error("This module must be run as a worker thread");
const levelValues = {
  error: 0,
  warning: 1,
  info: 2
}, report = createReporter(node_worker_threads.parentPort), getReferenceIds = (value) => {
  const ids = /* @__PURE__ */ new Set();
  function traverse(node) {
    if (types.isReference(node)) {
      ids.add(node._ref);
      return;
    }
    if (typeof node == "object" && node)
      for (const item of Object.values(node)) traverse(item);
  }
  return traverse(value), ids;
}, idRegex = /^[^-][A-Z0-9._-]*$/i, isValidId = (id) => typeof id == "string" && idRegex.test(id), shouldIncludeDocument = (document) => !document._type.startsWith("system.") && !document._type.startsWith("sanity.");
async function* readerToGenerator(reader) {
  for (; ; ) {
    const {
      value,
      done
    } = await reader.read();
    if (value && (yield value), done) return;
  }
}
main().then(() => process.exit());
async function loadWorkspace() {
  const workspaces = await getStudioWorkspaces.getStudioWorkspaces({
    basePath: workDir,
    configPath
  });
  if (!workspaces.length)
    throw new Error("Configuration did not return any workspaces.");
  let _workspace;
  if (workspaceName) {
    if (_workspace = workspaces.find((w) => w.name === workspaceName), !_workspace)
      throw new Error(`Could not find any workspaces with name \`${workspaceName}\``);
  } else {
    if (workspaces.length !== 1)
      throw new Error("Multiple workspaces found. Please specify which workspace to use with '--workspace'.");
    _workspace = workspaces[0];
  }
  const workspace = _workspace, client$1 = client.createClient({
    ...clientConfig,
    dataset: dataset || workspace.dataset,
    projectId: projectId || workspace.projectId,
    requestTagPrefix: "sanity.cli.validate"
  }).config({
    apiVersion: "v2021-03-25"
  });
  return report.event.loadedWorkspace({
    projectId: workspace.projectId,
    dataset: workspace.dataset,
    name: workspace.name,
    basePath: workspace.basePath
  }), {
    workspace,
    client: client$1
  };
}
async function downloadFromExport(client2) {
  const exportUrl = new URL(client2.getUrl(`/data/export/${client2.config().dataset}`, !1)), documentCount = await client2.fetch("length(*)");
  report.event.loadedDocumentCount({
    documentCount
  });
  const {
    token
  } = client2.config(), reader = (await fetch(exportUrl, {
    headers: new Headers({
      ...token && {
        Authorization: `Bearer ${token}`
      }
    })
  })).body?.getReader();
  if (!reader) throw new Error("Could not get reader from response body.");
  let downloadedCount = 0;
  const referencedIds = /* @__PURE__ */ new Set(), documentIds = /* @__PURE__ */ new Set(), lines = readline__default.default.createInterface({
    input: node_stream.Readable.from(readerToGenerator(reader))
  }), slugDate = (/* @__PURE__ */ new Date()).toISOString().replace(/[^a-z0-9]/gi, "-").toLowerCase(), tempOutputFile = path__default.default.join(os__default.default.tmpdir(), `sanity-validate-${slugDate}.ndjson`), outputStream = fs__default.default.createWriteStream(tempOutputFile);
  for await (const line of lines) {
    const document = JSON.parse(line);
    if (shouldIncludeDocument(document)) {
      documentIds.add(document._id);
      for (const referenceId of getReferenceIds(document))
        referencedIds.add(referenceId);
      outputStream.write(`${line}
`);
    }
    downloadedCount++, report.stream.exportProgress.emit({
      downloadedCount,
      documentCount
    });
  }
  return await new Promise((resolve, reject) => outputStream.close((err) => err ? reject(err) : resolve())), report.stream.exportProgress.end(), report.event.exportFinished({
    totalDocumentsToValidate: documentIds.size
  }), {
    documentIds,
    referencedIds,
    getDocuments: () => extractDocumentsFromNdjsonOrTarball(fs__default.default.createReadStream(tempOutputFile)),
    cleanup: () => fs__default.default.promises.rm(tempOutputFile)
  };
}
async function downloadFromFile(filePath) {
  const referencedIds = /* @__PURE__ */ new Set(), documentIds = /* @__PURE__ */ new Set(), getDocuments = () => extractDocumentsFromNdjsonOrTarball(fs__default.default.createReadStream(filePath));
  for await (const document of getDocuments())
    if (shouldIncludeDocument(document)) {
      documentIds.add(document._id);
      for (const referenceId of getReferenceIds(document))
        referencedIds.add(referenceId);
    }
  return report.event.exportFinished({
    totalDocumentsToValidate: documentIds.size
  }), {
    documentIds,
    referencedIds,
    getDocuments,
    cleanup: void 0
  };
}
async function checkReferenceExistence({
  client: client2,
  documentIds,
  referencedIds: _referencedIds
}) {
  const existingIds = new Set(documentIds), idsToCheck = Array.from(_referencedIds).filter((id) => !existingIds.has(id) && isValidId(id)).sort(), batches = idsToCheck.reduce((acc, next, index) => {
    const batchIndex = Math.floor(index / REFERENCE_INTEGRITY_BATCH_SIZE);
    return acc[batchIndex].push(next), acc;
  }, Array.from({
    length: Math.ceil(idsToCheck.length / REFERENCE_INTEGRITY_BATCH_SIZE)
  }).map(() => []));
  for (const batch of batches) {
    const {
      omitted
    } = await client2.request({
      uri: client2.getDataUrl("doc", batch.join(",")),
      json: !0,
      query: {
        excludeContent: "true"
      },
      tag: "documents-availability"
    }), omittedIds = omitted.reduce((acc, next) => (acc[next.id] = next.reason, acc), {});
    for (const id of batch)
      omittedIds[id] !== "existence" && existingIds.add(id);
  }
  return report.event.loadedReferenceIntegrity(), {
    existingIds
  };
}
async function main() {
  const {
    default: pMap
  } = await import("p-map"), cleanupBrowserEnvironment = mockBrowserEnvironment.mockBrowserEnvironment(workDir);
  let cleanupDownloadedDocuments;
  try {
    const {
      client: client2,
      workspace
    } = await loadWorkspace(), {
      documentIds,
      referencedIds,
      getDocuments,
      cleanup
    } = ndjsonFilePath ? await downloadFromFile(ndjsonFilePath) : await downloadFromExport(client2);
    cleanupDownloadedDocuments = cleanup;
    const {
      existingIds
    } = await checkReferenceExistence({
      client: client2,
      referencedIds,
      documentIds
    }), getClient = (options) => client2.withConfig(options), getDocumentExists = ({
      id
    }) => Promise.resolve(existingIds.has(id)), getLevel = (markers) => {
      let foundWarning = !1;
      for (const marker of markers) {
        if (marker.level === "error") return "error";
        marker.level === "warning" && (foundWarning = !0);
      }
      return foundWarning ? "warning" : "info";
    };
    let validatedCount = 0;
    const validate = async (document) => {
      let markers;
      try {
        const timeout = Symbol("timeout"), result = await Promise.race([sanity.validateDocument({
          document,
          workspace,
          getClient,
          getDocumentExists,
          environment: "cli",
          maxCustomValidationConcurrency,
          maxFetchConcurrency
        }), new Promise((resolve) => setTimeout(() => resolve(timeout), DOCUMENT_VALIDATION_TIMEOUT))]);
        if (result === timeout)
          throw new Error(`Document '${document._id}' failed to validate within ${DOCUMENT_VALIDATION_TIMEOUT}ms.`);
        markers = result.map(({
          item,
          ...marker
        }) => marker).filter((marker) => {
          const markerValue = levelValues[marker.level], flagLevelValue = levelValues[level] ?? levelValues.info;
          return markerValue <= flagLevelValue;
        });
      } catch (err) {
        markers = [{
          message: `Exception occurred while validating value: ${sanity.isRecord(err) && typeof err.message == "string" ? err.message : "Unknown error"}`,
          level: "error",
          path: []
        }];
      }
      validatedCount++;
      const intentUrl = studioHost && `${studioHost}${path__default.default.resolve(workspace.basePath, `/intent/edit/id=${encodeURIComponent(document._id)};type=${encodeURIComponent(document._type)}`)}`;
      report.stream.validation.emit({
        documentId: document._id,
        documentType: document._type,
        revision: document._rev,
        ...intentUrl && {
          intentUrl
        },
        markers,
        validatedCount,
        level: getLevel(markers)
      });
    };
    await pMap(getDocuments(), validate, {
      concurrency: MAX_VALIDATION_CONCURRENCY
    }), report.stream.validation.end();
  } finally {
    await cleanupDownloadedDocuments?.(), cleanupBrowserEnvironment();
  }
}
//# sourceMappingURL=validateDocuments.js.map
