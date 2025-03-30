import { fromString } from "@sanity/util/paths";
import arrify from "arrify";
import { SanityEncoder } from "@sanity/mutate";
import { open, unlink, mkdir } from "node:fs/promises";
import createDebug from "debug";
import FIFO from "fast-fifo";
import { createSafeJsonParser } from "@sanity/util/createSafeJsonParser";
import { parse as parse$1, evaluate } from "groq-js";
import { createClient } from "@sanity/client";
import { createClientConcurrencyLimiter } from "@sanity/util/client";
import { tmpdir } from "node:os";
import path from "node:path";
function defineMigration(migration) {
  return migration;
}
async function* decodeText(it) {
  const decoder = new TextDecoder();
  for await (const chunk of it)
    yield decoder.decode(chunk, { stream: !0 });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function* delay(it, ms) {
  for await (const chunk of it)
    await sleep(ms), yield chunk;
}
async function* filter(it, predicate) {
  for await (const chunk of it)
    await predicate(chunk) && (yield chunk);
}
async function* parseJSON(it, { parse: parse2 = JSON.parse } = {}) {
  for await (const chunk of it)
    yield parse2(chunk);
}
async function* stringifyJSON(it) {
  for await (const chunk of it)
    yield JSON.stringify(chunk);
}
async function* map(it, project) {
  for await (const chunk of it)
    yield project(chunk);
}
async function* split(it, delimiter) {
  let buf = "";
  for await (const chunk of it)
    if (buf += chunk, buf.includes(delimiter)) {
      const lastIndex = buf.lastIndexOf(delimiter), parts = buf.slice(0, Math.max(0, lastIndex)).split(delimiter);
      for (const part of parts)
        yield part;
      buf = buf.slice(Math.max(0, lastIndex + delimiter.length));
    }
  yield buf;
}
function parse(it, options) {
  return parseJSON(
    filter(split(it, `
`), (line) => !!(line && line.trim())),
    options
  );
}
async function* stringify(iterable) {
  for await (const doc of iterable)
    yield `${JSON.stringify(doc)}
`;
}
async function* take(it, count) {
  let i = 0;
  for await (const chunk of it) {
    if (i++ >= count) return;
    yield chunk;
  }
}
async function toArray(it) {
  const result = [];
  for await (const chunk of it)
    result.push(chunk);
  return result;
}
function create(document) {
  return { type: "create", document };
}
function patch(id, patches, options) {
  return {
    type: "patch",
    id,
    patches: arrify(patches),
    ...options ? { options } : {}
  };
}
function at(path2, operation) {
  return {
    path: typeof path2 == "string" ? fromString(path2) : path2,
    op: operation
  };
}
function createIfNotExists(document) {
  return { type: "createIfNotExists", document };
}
function createOrReplace(document) {
  return { type: "createOrReplace", document };
}
function delete_(id) {
  return { type: "delete", id };
}
const del = delete_, set = (value) => ({ type: "set", value }), setIfMissing = (value) => ({
  type: "setIfMissing",
  value
}), unset = () => ({ type: "unset" }), inc = (amount = 1) => ({
  type: "inc",
  amount
}), dec = (amount = 1) => ({
  type: "dec",
  amount
}), diffMatchPatch = (value) => ({
  type: "diffMatchPatch",
  value
});
function insert(items, position, indexOrReferenceItem) {
  return {
    type: "insert",
    referenceItem: indexOrReferenceItem,
    position,
    items: arrify(items)
  };
}
function append(items) {
  return insert(items, "after", -1);
}
function prepend(items) {
  return insert(items, "before", 0);
}
function insertBefore(items, indexOrReferenceItem) {
  return insert(items, "before", indexOrReferenceItem);
}
const insertAfter = (items, indexOrReferenceItem) => insert(items, "after", indexOrReferenceItem);
function truncate(startIndex, endIndex) {
  return {
    type: "truncate",
    startIndex,
    endIndex
  };
}
function replace(items, referenceItem) {
  return {
    type: "replace",
    referenceItem,
    items: arrify(items)
  };
}
function transaction(idOrMutations, _mutations) {
  const [id, mutations] = typeof idOrMutations == "string" ? [idOrMutations, _mutations] : [void 0, idOrMutations];
  return { type: "transaction", id, mutations };
}
function isMutation(mutation) {
  return mutation !== null && typeof mutation == "object" && "type" in mutation && (mutation.type === "create" || mutation.type === "createIfNotExists" || mutation.type === "createOrReplace" || mutation.type === "patch" || mutation.type === "delete");
}
function isTransaction(mutation) {
  return mutation !== null && typeof mutation == "object" && "type" in mutation && mutation.type === "transaction";
}
function isOperation(value) {
  return value !== null && typeof value == "object" && "type" in value && (value.type === "set" || value.type === "unset" || value.type === "insert" || value.type === "diffMatchPatch" || value.type === "dec" || value.type === "inc" || value.type === "upsert" || value.type === "unassign" || value.type === "truncate" || value.type === "setIfMissing");
}
function isNodePatch(change) {
  return change !== null && typeof change == "object" && "path" in change && Array.isArray(change.path) && "op" in change && isOperation(change.op);
}
function getValueType(value) {
  return Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
}
function callMap(mapFn, value, path2) {
  const res = mapFn(value, path2);
  return Array.isArray(res) ? res : [res];
}
function getPathWithKey(item, index, container) {
  return item && Array.isArray(container) && typeof item == "object" && "_key" in item && typeof item._key == "string" ? { _key: item._key } : index;
}
function mapObject(reducerFn, object, path2) {
  return [
    ...callMap(reducerFn, object, path2),
    ...Object.keys(object).flatMap(
      (key) => flatMapAny(reducerFn, object[key], path2.concat(getPathWithKey(object[key], key, object)))
    )
  ];
}
function mapArray(mapFn, array, path2) {
  return [
    ...callMap(mapFn, array, path2),
    ...array.flatMap(
      (item, index) => flatMapAny(mapFn, item, path2.concat(getPathWithKey(item, index, array)))
    )
  ];
}
function flatMapAny(mapFn, val, path2) {
  const type = getValueType(val);
  return type === "object" ? mapObject(mapFn, val, path2) : type === "array" ? mapArray(mapFn, val, path2) : callMap(mapFn, val, path2);
}
function flatMapDeep(value, mapFn) {
  return flatMapAny(mapFn, value, []);
}
function normalizeMigrateDefinition(migration) {
  return typeof migration.migrate == "function" ? normalizeIteratorValues(migration.migrate) : createAsyncIterableMutation(migration.migrate, {
    documentTypes: migration.documentTypes
  });
}
function normalizeIteratorValues(asyncIterable) {
  return async function* (docs, context) {
    for await (const documentMutations of asyncIterable(docs, context))
      yield normalizeMutation(documentMutations);
  };
}
function normalizeMutation(change) {
  return Array.isArray(change) ? change.flatMap((ch) => normalizeMutation(ch)) : isRawMutation(change) ? SanityEncoder.decodeAll([change]) : [change];
}
function isRawMutation(mutation) {
  return "createIfNotExists" in mutation || "createOrReplace" in mutation || "create" in mutation || "patch" in mutation || "delete" in mutation;
}
function createAsyncIterableMutation(migration, opts) {
  const documentTypesSet = new Set(opts.documentTypes);
  return async function* (docs, context) {
    for await (const doc of docs()) {
      if (opts.documentTypes && !documentTypesSet.has(doc._type)) continue;
      const documentMutations = await collectDocumentMutations(migration, doc, context);
      documentMutations.length > 0 && (yield documentMutations);
    }
  };
}
async function collectDocumentMutations(migration, doc, context) {
  const documentMutations = Promise.resolve(migration.document?.(doc, context)), nodeMigrations = flatMapDeep(doc, async (value, path2) => {
    const [nodeReturnValues, nodeTypeReturnValues] = await Promise.all([
      Promise.resolve(migration.node?.(value, path2, context)),
      Promise.resolve(migrateNodeType(migration, value, path2, context))
    ]);
    return [...arrify(nodeReturnValues), ...arrify(nodeTypeReturnValues)].map(
      (change) => change && normalizeNodeMutation(path2, change)
    );
  });
  return (await Promise.all([...arrify(await documentMutations), ...nodeMigrations])).flat().flatMap((change) => change ? normalizeDocumentMutation(doc._id, change) : []);
}
function normalizeDocumentMutation(documentId, change) {
  return Array.isArray(change) ? change.flatMap((ch) => normalizeDocumentMutation(documentId, ch)) : isRawMutation(change) ? SanityEncoder.decodeAll([change])[0] : isTransaction(change) || isMutation(change) ? change : patch(documentId, change);
}
function normalizeNodeMutation(path2, change) {
  return Array.isArray(change) ? change.flatMap((ch) => normalizeNodeMutation(path2, ch)) : isRawMutation(change) ? SanityEncoder.decodeAll([change])[0] : isNodePatch(change) ? at(path2.concat(change.path), change.op) : isOperation(change) ? at(path2, change) : change;
}
function migrateNodeType(migration, value, path2, context) {
  switch (getValueType(value)) {
    case "string":
      return migration.string?.(value, path2, context);
    case "number":
      return migration.number?.(value, path2, context);
    case "boolean":
      return migration.boolean?.(value, path2, context);
    case "object":
      return migration.object?.(value, path2, context);
    case "array":
      return migration.array?.(value, path2, context);
    case "null":
      return migration.null?.(value, path2, context);
    default:
      throw new Error("Unknown value type");
  }
}
function wrapDocumentsIteratorProducer(factory) {
  function documents() {
    return factory();
  }
  return documents[Symbol.asyncIterator] = () => {
    throw new Error(
      `The migration is attempting to iterate over the "documents" function, please call the function instead:

      // BAD:
      for await (const document of documents) {
        // ...
      }

      // GOOD:                        \u{1F447} This is a function and has to be called
      for await (const document of documents()) {
        // ...
      }
      `
    );
  }, documents;
}
function collectMigrationMutations(migration, documents, context) {
  return normalizeMigrateDefinition(migration)(wrapDocumentsIteratorProducer(documents), context);
}
const MUTATION_ENDPOINT_MAX_BODY_SIZE = 262144, DEFAULT_MUTATION_CONCURRENCY = 6, MAX_MUTATION_CONCURRENCY = 10;
var baseDebug = createDebug("sanity:migrate");
const debug$1 = baseDebug.extend("bufferThroughFile"), CHUNK_SIZE$1 = 1024;
function bufferThroughFile(source, filename, options) {
  const signal = options?.signal;
  let writeHandle, readHandle, bufferDone = !1;
  signal?.addEventListener("abort", async () => {
    debug$1("Aborting bufferThroughFile"), await Promise.all([
      writeHandle && writeHandle.close(),
      readHandle && (await readHandle).close()
    ]);
  });
  let readerCount = 0, ready;
  async function pump(reader) {
    try {
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done || signal?.aborted)
          return;
        await writeHandle.write(value);
      }
    } finally {
      await writeHandle.close(), bufferDone = !0, reader.releaseLock();
    }
  }
  function createBufferedReader() {
    let totalBytesRead = 0;
    return async function tryReadFromBuffer(handle) {
      const { bytesRead, buffer } = await handle.read(
        new Uint8Array(CHUNK_SIZE$1),
        0,
        CHUNK_SIZE$1,
        totalBytesRead
      );
      return bytesRead === 0 && !bufferDone && !signal?.aborted ? (debug$1("Not enough data in buffer file, waiting for more data to be written"), tryReadFromBuffer(handle)) : (totalBytesRead += bytesRead, { bytesRead, buffer });
    };
  }
  function init() {
    return ready || (ready = (async () => {
      debug$1("Initializing bufferThroughFile"), writeHandle = await open(filename, "w"), debug$1("Start buffering source stream to file"), pump(source.getReader()).then(() => {
        debug$1("Buffering source stream to buffer file");
      });
    })()), ready;
  }
  function getReadHandle() {
    return readHandle || (debug$1("Opening read handle on %s", filename), readHandle = open(filename, "r")), readHandle;
  }
  function onReaderStart() {
    readerCount++;
  }
  async function onReaderEnd() {
    if (readerCount--, readerCount === 0 && readHandle) {
      const handle = readHandle;
      readHandle = null, debug$1("Closing read handle on %s", filename), await (await handle).close(), options?.keepFile !== !0 && (debug$1("Removing buffer file", filename), await unlink(filename));
    }
  }
  return () => {
    const readChunk = createBufferedReader();
    let didEnd = !1;
    function onEnd() {
      didEnd || (didEnd = !0, onReaderEnd());
    }
    return new ReadableStream({
      async start() {
        if (signal?.aborted)
          throw new Error("Cannot create new buffered readers on aborted stream");
        debug$1("Reader started reading from file handle"), onReaderStart(), await init(), await getReadHandle();
      },
      async pull(controller) {
        if (!readHandle)
          throw new Error("Cannot read from closed handle");
        const { bytesRead, buffer } = await readChunk(await readHandle);
        bytesRead === 0 && bufferDone ? (debug$1("Reader done reading from file handle"), await onEnd(), controller.close()) : controller.enqueue(buffer.subarray(0, bytesRead));
      },
      cancel() {
        onEnd();
      }
    });
  };
}
const objectToString = Object.prototype.toString, uint8ArrayStringified = "[object Uint8Array]";
function isUint8Array(value) {
  return value ? value.constructor === Uint8Array ? !0 : objectToString.call(value) === uint8ArrayStringified : !1;
}
function assertUint8Array(value) {
  if (!isUint8Array(value))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof value}\``);
}
function concatUint8Arrays(arrays, totalLength) {
  if (arrays.length === 0)
    return new Uint8Array(0);
  totalLength ??= arrays.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0);
  const returnValue = new Uint8Array(totalLength);
  let offset = 0;
  for (const array of arrays)
    assertUint8Array(array), returnValue.set(array, offset), offset += array.length;
  return returnValue;
}
function areUint8ArraysEqual(a, b) {
  if (assertUint8Array(a), assertUint8Array(b), a === b)
    return !0;
  if (a.length !== b.length)
    return !1;
  for (let index = 0; index < a.length; index++)
    if (a[index] !== b[index])
      return !1;
  return !0;
}
function peekInto(readable, options) {
  const { size } = options;
  return new Promise((resolve, reject) => {
    let totalBytesRead = 0, streamCompleted = !1;
    const chunks = [], reader = readable.getReader();
    function settled() {
      const head = concatUint8Arrays(chunks);
      resolve([
        head,
        new ReadableStream({
          start(controller) {
            controller.enqueue(head), streamCompleted && controller.close();
          },
          async pull(controller) {
            const { done, value } = await reader.read();
            done ? controller.close() : controller.enqueue(value);
          }
        })
      ]);
    }
    (async () => {
      for (; ; ) {
        const { done, value: chunk } = await reader.read();
        if (done) {
          streamCompleted = !0;
          break;
        } else if (totalBytesRead += chunk.byteLength, chunks.push(chunk), totalBytesRead >= size)
          break;
      }
    })().then(settled, reject);
  });
}
function isGzip(buffer) {
  return buffer.length > 3 && buffer[0] === 31 && buffer[1] === 139 && buffer[2] === 8;
}
function isDeflate(buf) {
  return buf.length > 2 && buf[0] === 120 && (buf[1] === 1 || buf[1] === 156 || buf[1] === 218);
}
async function maybeDecompress(readable) {
  const [head, stream] = await peekInto(readable, { size: 10 });
  return isGzip(head) ? stream.pipeThrough(new DecompressionStream("gzip")) : isDeflate(head) ? stream.pipeThrough(new DecompressionStream("deflate-raw")) : stream;
}
const debug = baseDebug.extend("readFileAsWebStream"), CHUNK_SIZE = 1024 * 16;
function readFileAsWebStream(filename) {
  let fileHandle, position = 0;
  return new ReadableStream({
    async start() {
      debug("Starting readable stream from", filename), fileHandle = await open(filename, "r");
    },
    async pull(controller) {
      const { bytesRead, buffer } = await fileHandle.read(
        new Uint8Array(CHUNK_SIZE),
        0,
        CHUNK_SIZE,
        position
      );
      bytesRead === 0 ? (await fileHandle.close(), debug("Closing readable stream from", filename), controller.close()) : (position += bytesRead, controller.enqueue(buffer.subarray(0, bytesRead)));
    },
    cancel() {
      return debug("Cancelling readable stream from", filename), fileHandle.close();
    }
  });
}
async function drain(stream) {
  const reader = stream.getReader();
  for (; ; ) {
    const { done } = await reader.read();
    if (done)
      return;
  }
}
const EMPTY = new Uint8Array();
class BufferList {
  buffered;
  shifted;
  queue;
  _offset;
  constructor() {
    this.buffered = 0, this.shifted = 0, this.queue = new FIFO(), this._offset = 0;
  }
  push(buffer) {
    this.buffered += buffer.byteLength, this.queue.push(buffer);
  }
  shiftFirst(size) {
    return this.buffered === 0 ? null : this._next(size);
  }
  shift(size) {
    if (size > this.buffered) return null;
    if (size === 0) return EMPTY;
    let chunk = this._next(size);
    if (size === chunk.byteLength) return chunk;
    const chunks = [chunk];
    for (; (size -= chunk.byteLength) > 0; )
      chunk = this._next(size), chunks.push(chunk);
    return concatUint8Arrays(chunks);
  }
  _next(size) {
    const buf = this.queue.peek(), rem = buf.byteLength - this._offset;
    if (size >= rem) {
      const sub = this._offset ? buf.subarray(this._offset, buf.byteLength) : buf;
      return this.queue.shift(), this._offset = 0, this.buffered -= rem, this.shifted += rem, sub;
    }
    return this.buffered -= size, this.shifted += size, buf.subarray(this._offset, this._offset += size);
  }
}
const ZERO_OFFSET = 48, USTAR_MAGIC = new Uint8Array([117, 115, 116, 97, 114, 0]), GNU_MAGIC = new Uint8Array([117, 115, 116, 97, 114, 32]), GNU_VER = new Uint8Array([32, 0]), MAGIC_OFFSET = 257, VERSION_OFFSET = 263;
function decode(buf, filenameEncoding, allowUnknownFormat) {
  let typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET, name = decodeStr(buf, 0, 100, filenameEncoding);
  const mode = decodeOct(buf, 100, 8), uid = decodeOct(buf, 108, 8), gid = decodeOct(buf, 116, 8), size = decodeOct(buf, 124, 12), mtime = decodeOct(buf, 136, 12), type = toType(typeflag), linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding), uname = decodeStr(buf, 265, 32), gname = decodeStr(buf, 297, 32), devmajor = decodeOct(buf, 329, 8), devminor = decodeOct(buf, 337, 8), c = cksum(buf);
  if (c === 8 * 32) return null;
  if (c !== decodeOct(buf, 148, 8))
    throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
  if (isUSTAR(buf))
    buf[345] && (name = `${decodeStr(buf, 345, 155, filenameEncoding)}/${name}`);
  else if (!isGNU(buf) && !allowUnknownFormat)
    throw new Error("Invalid tar header: unknown format.");
  return typeflag === 0 && name && name[name.length - 1] === "/" && (typeflag = 5), {
    type,
    name,
    mode,
    uid,
    gid,
    size,
    mtime: mtime ? new Date(1e3 * mtime) : null,
    linkname,
    uname,
    gname,
    devmajor,
    devminor
  };
}
function isUSTAR(buf) {
  return areUint8ArraysEqual(USTAR_MAGIC, buf.subarray(MAGIC_OFFSET, MAGIC_OFFSET + 6));
}
function isGNU(buf) {
  return areUint8ArraysEqual(GNU_MAGIC, buf.subarray(MAGIC_OFFSET, MAGIC_OFFSET + 6)) && areUint8ArraysEqual(GNU_VER, buf.subarray(VERSION_OFFSET, VERSION_OFFSET + 2));
}
function clamp(index, len, defaultValue) {
  return typeof index != "number" ? defaultValue : (index = ~~index, index >= len ? len : index >= 0 || (index += len, index >= 0) ? index : 0);
}
function toType(flag) {
  switch (flag) {
    case 0:
      return "file";
    case 1:
      return "link";
    case 2:
      return "symlink";
    case 3:
      return "character-device";
    case 4:
      return "block-device";
    case 5:
      return "directory";
    case 6:
      return "fifo";
    case 7:
      return "contiguous-file";
    case 72:
      return "pax-header";
    case 55:
      return "pax-global-header";
    case 27:
      return "gnu-long-link-path";
    case 28:
    case 30:
      return "gnu-long-path";
    default:
      return null;
  }
}
function indexOf(block, num, offset, end) {
  for (; offset < end; offset++)
    if (block[offset] === num) return offset;
  return end;
}
function cksum(block) {
  let sum = 256;
  for (let i = 0; i < 148; i++) sum += block[i];
  for (let j = 156; j < 512; j++) sum += block[j];
  return sum;
}
function parse256(buf) {
  let positive;
  if (buf[0] === 128) positive = !0;
  else if (buf[0] === 255) positive = !1;
  else return null;
  const tuple = [];
  let i;
  for (i = buf.length - 1; i > 0; i--) {
    const byte = buf[i];
    positive ? tuple.push(byte) : tuple.push(255 - byte);
  }
  let sum = 0;
  const l = tuple.length;
  for (i = 0; i < l; i++)
    sum += tuple[i] * Math.pow(256, i);
  return positive ? sum : -1 * sum;
}
const decoders = {}, getCachedDecoder = (encoding) => (encoding in decoders || (decoders[encoding] = new TextDecoder(encoding)), decoders[encoding]);
function toString(uint8, encoding = "utf-8") {
  return getCachedDecoder(encoding).decode(uint8);
}
function decodeOct(val, offset, length) {
  if (val = val.subarray(offset, offset + length), offset = 0, val[offset] & 128)
    return parse256(val);
  for (; offset < val.length && val[offset] === 32; ) offset++;
  const end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
  for (; offset < end && val[offset] === 0; ) offset++;
  return end === offset ? 0 : parseInt(toString(val.subarray(offset, end)), 8);
}
function decodeStr(val, offset, length, encoding) {
  return toString(val.subarray(offset, indexOf(val, 0, offset, offset + length)), encoding);
}
const emptyReadableStream = () => new ReadableStream({
  pull(controller) {
    controller.close();
  }
});
function untar(stream, options = {}) {
  const buffer = new BufferList(), reader = stream.getReader();
  let readingChunk = !1;
  return new ReadableStream({
    async pull(controller) {
      if (readingChunk)
        return;
      const { done, value } = await reader.read();
      done || buffer.push(value);
      const headerChunk = buffer.shift(512);
      if (!headerChunk)
        throw new Error("Unexpected end of tar file. Expected 512 bytes of headers.");
      const header = decode(
        headerChunk,
        options.filenameEncoding ?? "utf-8",
        options.allowUnknownFormat ?? !1
      );
      header ? header.size === null || header.size === 0 || header.type === "directory" ? controller.enqueue([header, emptyReadableStream()]) : (readingChunk = !0, controller.enqueue([
        header,
        entryStream(reader, header.size, buffer, () => {
          readingChunk = !1;
        })
      ])) : done && controller.close();
    }
  });
}
function entryStream(reader, expectedBytes, buffer, next) {
  let totalBytesRead = 0;
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read(), remaining = expectedBytes - totalBytesRead;
      done || buffer.push(value);
      const chunk = buffer.shiftFirst(remaining);
      if (!chunk)
        throw new Error("Premature end of tar stream");
      controller.enqueue(chunk), totalBytesRead += chunk.byteLength, chunk?.byteLength === remaining && (discardPadding(buffer, expectedBytes), controller.close(), next());
    }
  });
}
function getPadding(size) {
  return size &= 511, size === 0 ? 0 : 512 - size;
}
function discardPadding(bl, size) {
  const overflow = getPadding(size);
  overflow > 0 && bl.shift(overflow);
}
async function* streamToAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
async function* fromExportArchive(path2) {
  for await (const [header, entry] of streamToAsyncIterator(
    untar(await maybeDecompress(readFileAsWebStream(path2)))
  ))
    if (header.type === "file" && header.name.endsWith(".ndjson"))
      for await (const chunk of streamToAsyncIterator(entry))
        yield chunk;
    else
      await drain(entry);
}
const endpoints = {
  data: {
    query: (dataset) => ({
      global: !1,
      method: "GET",
      path: `/query/${dataset}`,
      searchParams: [["perspective", "raw"]]
    }),
    export: (dataset, documentTypes) => ({
      global: !1,
      method: "GET",
      path: `/data/export/${dataset}`,
      searchParams: documentTypes && documentTypes?.length > 0 ? [["types", documentTypes.join(",")]] : []
    }),
    mutate: (dataset, options) => {
      const params = [
        options?.tag && ["tag", options.tag],
        options?.returnIds && ["returnIds", "true"],
        options?.returnDocuments && ["returnDocuments", "true"],
        options?.autoGenerateArrayKeys && ["autoGenerateArrayKeys", "true"],
        options?.visibility && ["visibility", options.visibility],
        options?.dryRun && ["dryRun", "true"]
      ].filter(Boolean);
      return {
        global: !1,
        method: "POST",
        path: `/data/mutate/${dataset}`,
        searchParams: params
      };
    }
  }
};
class HTTPError extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message), this.name = "HTTPError", this.statusCode = statusCode;
  }
}
async function assert2xx(res) {
  if (res.status < 200 || res.status > 299) {
    const jsonResponse = await res.json().catch(() => null);
    let message;
    throw jsonResponse?.error ? jsonResponse?.error?.description ? message = `${jsonResponse?.error?.type || res.status}: ${jsonResponse.error.description}` : message = `${jsonResponse.error}: ${jsonResponse.message}` : message = `HTTP Error ${res.status}: ${res.statusText}`, new HTTPError(res.status, message);
  }
}
async function fetchStream({ url, init }) {
  const response = await fetch(url, init);
  if (await assert2xx(response), response.body === null) throw new Error("No response received");
  return response.body;
}
async function fetchAsyncIterator(options) {
  return streamToAsyncIterator(await fetchStream(options));
}
function getUserAgent() {
  if (typeof window > "u")
    try {
      const pkg = require("../../package.json");
      return `${pkg.name}@${pkg.version}`;
    } catch {
    }
  return null;
}
function normalizeApiHost(apiHost) {
  return apiHost.replace(/^https?:\/\//, "");
}
function toFetchOptions(req) {
  const { endpoint, apiVersion, tag, projectId, apiHost, token, body } = req, requestInit = {
    method: endpoint.method || "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body
  }, ua = getUserAgent();
  ua && (requestInit.headers = {
    ...requestInit.headers,
    "User-Agent": ua
  }), token && (requestInit.headers = {
    ...requestInit.headers,
    Authorization: `bearer ${token}`
  });
  const normalizedApiHost = normalizeApiHost(apiHost), path2 = `/${apiVersion}${endpoint.path}`, host = endpoint.global ? normalizedApiHost : `${projectId}.${normalizedApiHost}`, searchParams = new URLSearchParams([
    ...endpoint.searchParams,
    ...tag ? [["tag", tag]] : []
  ]).toString();
  return {
    url: `https://${host}/${path2}${searchParams ? `?${searchParams}` : ""}`,
    init: requestInit
  };
}
function fromExportEndpoint(options) {
  return fetchStream(
    toFetchOptions({
      projectId: options.projectId,
      apiVersion: options.apiVersion,
      token: options.token,
      apiHost: options.apiHost ?? "api.sanity.io",
      tag: "sanity.migration.export",
      endpoint: endpoints.data.export(options.dataset, options.documentTypes)
    })
  );
}
const safeJsonParser = createSafeJsonParser({
  errorLabel: "Error streaming dataset"
});
function asyncIterableToStream(it) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await it.next();
      done ? controller.close() : controller.enqueue(value);
    }
  });
}
function isSystemDocumentId(id) {
  return id.startsWith("_.");
}
function parseGroqFilter(filter2) {
  try {
    return parse$1(`*[${filter2}]`);
  } catch (err) {
    throw err.message = `Failed to parse GROQ filter "${filter2}": ${err.message}`, err;
  }
}
async function matchesFilter(parsedFilter, document) {
  return (await (await evaluate(parsedFilter, { dataset: [document] })).get()).length === 1;
}
async function* applyFilters(migration, documents) {
  const documentTypes = migration.documentTypes, parsedFilter = migration.filter ? parseGroqFilter(migration.filter) : void 0;
  for await (const doc of documents)
    isSystemDocumentId(doc._id) || documentTypes && documentTypes.length > 0 && !documentTypes.includes(doc._type) || parsedFilter && !await matchesFilter(parsedFilter, doc) || (yield doc);
}
const MAX_FETCH_CONCURRENCY = 10, limitClientConcurrency = createClientConcurrencyLimiter(MAX_FETCH_CONCURRENCY);
function createContextClient(config) {
  return restrictClient(
    limitClientConcurrency(
      createClient({ ...config, useCdn: !1, requestTagPrefix: "sanity.migration" })
    )
  );
}
const ALLOWED_PROPERTIES = [
  "fetch",
  "clone",
  "config",
  "withConfig",
  "getDocument",
  "getDocuments",
  "users",
  "projects"
];
function restrictClient(client) {
  return new Proxy(client, {
    get: (target, property) => {
      switch (property) {
        case "clone":
          return (...args) => restrictClient(target.clone(...args));
        case "config":
          return (...args) => {
            const result = target.config(...args);
            return args[0] ? restrictClient(result) : result;
          };
        case "withConfig":
          return (...args) => restrictClient(target.withConfig(...args));
        default: {
          if (ALLOWED_PROPERTIES.includes(property))
            return target[property];
          throw new Error(
            `Client method "${String(
              property
            )}" can not be called during a migration. Only ${ALLOWED_PROPERTIES.join(
              ", "
            )} are allowed.`
          );
        }
      }
    }
  });
}
function createFilteredDocumentsClient(getFilteredDocumentsReadableStream) {
  function getAllDocumentsFromBuffer() {
    return parse(decodeText(streamToAsyncIterator(getFilteredDocumentsReadableStream())), {
      parse: safeJsonParser
    });
  }
  async function getDocumentsFromBuffer(ids) {
    const found = {};
    let remaining = ids.length;
    for await (const doc of getAllDocumentsFromBuffer())
      if (ids.includes(doc._id) && (remaining--, found[doc._id] = doc), remaining === 0) break;
    return ids.map((id) => found[id]);
  }
  async function getDocumentFromBuffer(id) {
    return (await getDocumentsFromBuffer([id]))[0];
  }
  return {
    getDocument: getDocumentFromBuffer,
    getDocuments: getDocumentsFromBuffer
  };
}
async function createBufferFile() {
  const bufferDir = path.join(
    tmpdir(),
    "sanity-migrate",
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  return await mkdir(bufferDir, { recursive: !0 }), path.join(bufferDir, "snapshot.ndjson");
}
async function* dryRun(config, migration) {
  const source = config.exportPath ? fromExportArchive(config.exportPath) : streamToAsyncIterator(
    await fromExportEndpoint({ ...config.api, documentTypes: migration.documentTypes })
  ), filteredDocuments = applyFilters(
    migration,
    parse(decodeText(source), { parse: safeJsonParser })
  ), abortController = new AbortController(), createReader = bufferThroughFile(
    asyncIterableToStream(stringify(filteredDocuments)),
    await createBufferFile(),
    { signal: abortController.signal }
  ), client = createContextClient({ ...config.api, useCdn: !1 }), filteredDocumentsClient = createFilteredDocumentsClient(createReader);
  yield* collectMigrationMutations(
    migration,
    () => parse(decodeText(streamToAsyncIterator(createReader())), { parse: safeJsonParser }),
    {
      client,
      filtered: filteredDocumentsClient,
      dryRun: !0
    }
  ), abortController.abort();
}
async function* concatStr(it) {
  let buf = "";
  for await (const chunk of it)
    buf += chunk;
  yield buf;
}
async function lastValueFrom(it, options) {
  const defaultGiven = "defaultValue" in {};
  let latestValue, didYield = !1;
  for await (const value of it)
    didYield = !0, latestValue = value;
  if (!didYield) {
    if (defaultGiven)
      return options.defaultValue;
    throw new Error(
      "No value yielded from async iterable. If this iterable is empty, provide a default value."
    );
  }
  return latestValue;
}
async function mapAsync(it, project, concurrency) {
  const { pMapIterable } = await import("p-map");
  return pMapIterable(it, (v) => project(v), {
    concurrency
  });
}
async function* tap(it, interceptor) {
  for await (const chunk of it)
    interceptor(chunk), yield chunk;
}
const PADDING_SIZE = 16;
function isTransactionPayload(payload) {
  return payload && payload.mutations && Array.isArray(payload.mutations);
}
async function* batchMutations(mutations, maxBatchSize) {
  let currentBatch = [], currentBatchSize = 0;
  for await (const mutation of mutations) {
    if (isTransactionPayload(mutation)) {
      yield { mutations: currentBatch }, yield mutation, currentBatch = [], currentBatchSize = 0;
      continue;
    }
    const mutationSize = JSON.stringify(mutation).length;
    if (mutationSize >= maxBatchSize + PADDING_SIZE) {
      currentBatch.length && (yield { mutations: currentBatch }), yield { mutations: [...arrify(mutation)] }, currentBatch = [], currentBatchSize = 0;
      continue;
    }
    currentBatchSize += mutationSize, currentBatchSize >= maxBatchSize + PADDING_SIZE && (yield { mutations: currentBatch }, currentBatch = [], currentBatchSize = 0), currentBatch.push(...arrify(mutation));
  }
  currentBatch.length > 0 && (yield { mutations: currentBatch });
}
async function* toSanityMutations(it) {
  for await (const mutation of it)
    for (const mut of arrify(mutation)) {
      if (isTransaction(mut)) {
        yield {
          transactionId: mut.id,
          mutations: SanityEncoder.encodeAll(mut.mutations)
        };
        continue;
      }
      yield SanityEncoder.encodeAll(arrify(mut));
    }
}
async function* toFetchOptionsIterable(apiConfig, mutations) {
  for await (const transaction2 of mutations)
    yield toFetchOptions({
      projectId: apiConfig.projectId,
      apiVersion: apiConfig.apiVersion,
      token: apiConfig.token,
      tag: "sanity.migration.mutate",
      apiHost: apiConfig.apiHost ?? "api.sanity.io",
      endpoint: endpoints.data.mutate(apiConfig.dataset, {
        returnIds: !0,
        visibility: "async",
        autoGenerateArrayKeys: !0
      }),
      body: JSON.stringify(transaction2)
    });
}
async function run(config, migration) {
  const stats = {
    documents: 0,
    mutations: 0,
    pending: 0,
    queuedBatches: 0,
    completedTransactions: [],
    currentTransactions: []
  }, filteredDocuments = applyFilters(
    migration,
    parse(
      decodeText(
        streamToAsyncIterator(
          await fromExportEndpoint({ ...config.api, documentTypes: migration.documentTypes })
        )
      ),
      { parse: safeJsonParser }
    )
  ), abortController = new AbortController(), createReader = bufferThroughFile(
    asyncIterableToStream(stringify(filteredDocuments)),
    await createBufferFile(),
    { signal: abortController.signal }
  ), client = createContextClient({
    ...config.api,
    useCdn: !1,
    requestTagPrefix: "sanity.migration"
  }), filteredDocumentsClient = createFilteredDocumentsClient(createReader), mutations = tap(collectMigrationMutations(migration, () => tap(
    parse(decodeText(streamToAsyncIterator(createReader())), {
      parse: safeJsonParser
    }),
    () => {
      config.onProgress?.({ ...stats, documents: ++stats.documents });
    }
  ), {
    client,
    filtered: filteredDocumentsClient,
    dryRun: !1
  }), (muts) => {
    stats.currentTransactions = arrify(muts), config.onProgress?.({
      ...stats,
      mutations: ++stats.mutations
    });
  }), concurrency = config?.concurrency ?? DEFAULT_MUTATION_CONCURRENCY;
  if (concurrency > MAX_MUTATION_CONCURRENCY)
    throw new Error(`Concurrency exceeds maximum allowed value (${MAX_MUTATION_CONCURRENCY})`);
  const batches = tap(
    batchMutations(toSanityMutations(mutations), MUTATION_ENDPOINT_MAX_BODY_SIZE),
    () => {
      config.onProgress?.({ ...stats, queuedBatches: ++stats.queuedBatches });
    }
  ), submit = async (opts) => lastValueFrom(parseJSON(concatStr(decodeText(await fetchAsyncIterator(opts))))), commits = await mapAsync(
    toFetchOptionsIterable(config.api, batches),
    (opts) => (config.onProgress?.({ ...stats, pending: ++stats.pending }), submit(opts)),
    concurrency
  );
  for await (const result of commits)
    stats.completedTransactions.push(result), config.onProgress?.({
      ...stats
    });
  config.onProgress?.({
    ...stats,
    done: !0
  }), abortController.abort();
}
function* fromDocuments(documents) {
  for (const document of documents)
    yield document;
}
export {
  DEFAULT_MUTATION_CONCURRENCY,
  MAX_MUTATION_CONCURRENCY,
  append,
  at,
  collectMigrationMutations,
  create,
  createIfNotExists,
  createOrReplace,
  dec,
  decodeText,
  defineMigration,
  del,
  delay,
  delete_,
  diffMatchPatch,
  dryRun,
  filter,
  fromDocuments,
  fromExportArchive,
  fromExportEndpoint,
  inc,
  insert,
  insertAfter,
  insertBefore,
  map,
  parse,
  parseJSON,
  patch,
  prepend,
  replace,
  run,
  safeJsonParser,
  set,
  setIfMissing,
  split,
  stringify,
  stringifyJSON,
  take,
  toArray,
  toFetchOptionsIterable,
  transaction,
  truncate,
  unset
};
//# sourceMappingURL=index.mjs.map
