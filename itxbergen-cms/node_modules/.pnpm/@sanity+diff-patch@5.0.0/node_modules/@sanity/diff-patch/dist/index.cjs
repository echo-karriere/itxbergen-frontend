"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var diffMatchPatch = require("@sanity/diff-match-patch");
const IS_DOTTABLE_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;
function pathToString(path) {
  return path.reduce((target, segment, i) => {
    if (Array.isArray(segment))
      return `${target}[${segment.join(":")}]`;
    if (isKeyedObject(segment))
      return `${target}[_key=="${segment._key}"]`;
    if (typeof segment == "number")
      return `${target}[${segment}]`;
    if (typeof segment == "string" && !IS_DOTTABLE_RE.test(segment))
      return `${target}['${segment}']`;
    if (typeof segment == "string")
      return `${target}${i === 0 ? "" : "."}${segment}`;
    throw new Error(`Unsupported path segment "${segment}"`);
  }, "");
}
function isKeyedObject(obj) {
  return typeof obj == "object" && typeof obj._key == "string";
}
class DiffError extends Error {
  path;
  value;
  serializedPath;
  constructor(message, path, value) {
    const serializedPath = pathToString(path);
    super(`${message} (at '${serializedPath}')`), this.path = path, this.serializedPath = serializedPath, this.value = value;
  }
}
const idPattern = /^[a-z0-9][a-z0-9_.-]+$/i, propPattern = /^[a-zA-Z_][a-zA-Z0-9_-]*$/, propStartPattern = /^[a-z_]/i;
function validateProperty(property, value, path) {
  if (!propStartPattern.test(property))
    throw new DiffError("Keys must start with a letter (a-z)", path.concat(property), value);
  if (!propPattern.test(property))
    throw new DiffError(
      "Keys can only contain letters, numbers and underscores",
      path.concat(property),
      value
    );
  if (property === "_key" || property === "_ref" || property === "_type") {
    if (typeof value != "string")
      throw new DiffError("Keys must be strings", path.concat(property), value);
    if (!idPattern.test(value))
      throw new DiffError("Invalid key - use less exotic characters", path.concat(property), value);
  }
  return property;
}
const ignoredKeys = ["_id", "_type", "_createdAt", "_updatedAt", "_rev"], defaultOptions = {
  hideWarnings: !1,
  diffMatchPatch: {
    enabled: !0,
    // Only use diff-match-patch if target string is longer than this threshold
    lengthThresholdAbsolute: 30,
    // Only use generated diff-match-patch if the patch length is less than or equal to
    // (targetString * relative). Example: A 100 character target with a relative factor
    // of 1.2 will allow a 120 character diff-match-patch. If larger than this number,
    // it will fall back to a regular `set` patch.
    lengthThresholdRelative: 1.2
  }
};
function mergeOptions(options) {
  return {
    ...defaultOptions,
    ...options,
    diffMatchPatch: { ...defaultOptions.diffMatchPatch, ...options.diffMatchPatch || {} }
  };
}
function diffPatch(itemA, itemB, opts) {
  const options = mergeOptions(opts || {}), id = options.id || itemA._id === itemB._id && itemA._id, revisionLocked = options.ifRevisionID, ifRevisionID = typeof revisionLocked == "boolean" ? itemA._rev : revisionLocked, basePath = options.basePath || [];
  if (!id)
    throw new Error(
      "_id on itemA and itemB not present or differs, specify document id the mutations should be applied to"
    );
  if (revisionLocked === !0 && !ifRevisionID)
    throw new Error(
      "`ifRevisionID` is set to `true`, but no `_rev` was passed in item A. Either explicitly set `ifRevisionID` to a revision, or pass `_rev` as part of item A."
    );
  if (basePath.length === 0 && itemA._type !== itemB._type)
    throw new Error(`_type is immutable and cannot be changed (${itemA._type} => ${itemB._type})`);
  const operations = diffItem(itemA, itemB, options, basePath, []);
  return serializePatches(operations, { id, ifRevisionID: revisionLocked ? ifRevisionID : void 0 });
}
function diffItem(itemA, itemB, opts = defaultOptions, path = [], patches = []) {
  if (itemA === itemB)
    return patches;
  const aType = Array.isArray(itemA) ? "array" : typeof itemA, bType = Array.isArray(itemB) ? "array" : typeof itemB, aIsUndefined = aType === "undefined", bIsUndefined = bType === "undefined";
  if (aIsUndefined && !bIsUndefined)
    return patches.push({ op: "set", path, value: itemB }), patches;
  if (!aIsUndefined && bIsUndefined)
    return patches.push({ op: "unset", path }), patches;
  const options = mergeOptions(opts), dataType = aIsUndefined ? bType : aType;
  return dataType === "object" || dataType === "array" ? aType !== bType ? (patches.push({ op: "set", path, value: itemB }), patches) : dataType === "array" ? diffArray(itemA, itemB, options, path, patches) : diffObject(itemA, itemB, options, path, patches) : diffPrimitive(itemA, itemB, options, path, patches);
}
function diffObject(itemA, itemB, options, path, patches) {
  const atRoot = path.length === 0, aKeys = Object.keys(itemA).filter(atRoot ? isNotIgnoredKey : yes).map((key) => validateProperty(key, itemA[key], path)), aKeysLength = aKeys.length, bKeys = Object.keys(itemB).filter(atRoot ? isNotIgnoredKey : yes).map((key) => validateProperty(key, itemB[key], path)), bKeysLength = bKeys.length;
  for (let i = 0; i < aKeysLength; i++) {
    const key = aKeys[i];
    key in itemB || patches.push({ op: "unset", path: path.concat(key) });
  }
  for (let i = 0; i < bKeysLength; i++) {
    const key = bKeys[i];
    diffItem(itemA[key], itemB[key], options, path.concat([key]), patches);
  }
  return patches;
}
function diffArray(itemA, itemB, options, path, patches) {
  if (itemB.length > itemA.length && patches.push({
    op: "insert",
    after: path.concat([-1]),
    items: itemB.slice(itemA.length).map((item, i) => nullifyUndefined(item, path, i, options))
  }), itemB.length < itemA.length) {
    const isSingle = itemA.length - itemB.length === 1, unsetItems = itemA.slice(itemB.length);
    isRevisionLocked(options) || !isUniquelyKeyed(unsetItems) ? patches.push({
      op: "unset",
      path: path.concat([isSingle ? itemB.length : [itemB.length, ""]])
    }) : patches.push(
      ...unsetItems.map(
        (item) => ({ op: "unset", path: path.concat({ _key: item._key }) })
      )
    );
  }
  for (let i = 0; i < itemB.length; i++)
    if (Array.isArray(itemB[i]))
      throw new DiffError("Multi-dimensional arrays not supported", path.concat(i), itemB[i]);
  const overlapping = Math.min(itemA.length, itemB.length), segmentA = itemA.slice(0, overlapping), segmentB = itemB.slice(0, overlapping);
  return isUniquelyKeyed(segmentA) && isUniquelyKeyed(segmentB) ? diffArrayByKey(segmentA, segmentB, options, path, patches) : diffArrayByIndex(segmentA, segmentB, options, path, patches);
}
function diffArrayByIndex(itemA, itemB, options, path, patches) {
  for (let i = 0; i < itemA.length; i++)
    diffItem(
      itemA[i],
      nullifyUndefined(itemB[i], path, i, options),
      options,
      path.concat(i),
      patches
    );
  return patches;
}
function diffArrayByKey(itemA, itemB, options, path, patches) {
  const keyedA = indexByKey(itemA), keyedB = indexByKey(itemB);
  if (!arrayIsEqual(keyedA.keys, keyedB.keys))
    return diffArrayByIndex(itemA, itemB, options, path, patches);
  for (let i = 0; i < keyedB.keys.length; i++) {
    const key = keyedB.keys[i], valueA = keyedA.index[key], valueB = nullifyUndefined(keyedB.index[key], path, i, options);
    diffItem(valueA, valueB, options, path.concat({ _key: key }), patches);
  }
  return patches;
}
function getDiffMatchPatch(itemA, itemB, options, path) {
  const { enabled, lengthThresholdRelative, lengthThresholdAbsolute } = options.diffMatchPatch, segment = path[path.length - 1];
  if (!enabled || // Don't use for anything but strings
  typeof itemA != "string" || typeof itemB != "string" || // Don't use for `_key`, `_ref` etc
  typeof segment == "string" && segment[0] === "_" || // Don't use on short strings
  itemB.length < lengthThresholdAbsolute)
    return;
  let strPatch = "";
  try {
    const patch = diffMatchPatch.makeDiff(itemA, itemB), diff = diffMatchPatch.cleanupEfficiency(patch);
    strPatch = diffMatchPatch.stringifyPatches(diffMatchPatch.makePatches(diff));
  } catch {
    return;
  }
  return strPatch.length > itemB.length * lengthThresholdRelative ? void 0 : { op: "diffMatchPatch", path, value: strPatch };
}
function diffPrimitive(itemA, itemB, options, path, patches) {
  const dmp = getDiffMatchPatch(itemA, itemB, options, path);
  return patches.push(
    dmp || {
      op: "set",
      path,
      value: itemB
    }
  ), patches;
}
function isNotIgnoredKey(key) {
  return ignoredKeys.indexOf(key) === -1;
}
function serializePatches(patches, options) {
  if (patches.length === 0)
    return [];
  const { id, ifRevisionID } = options, set = patches.filter((patch) => patch.op === "set"), unset = patches.filter((patch) => patch.op === "unset"), insert = patches.filter((patch) => patch.op === "insert"), dmp = patches.filter((patch) => patch.op === "diffMatchPatch"), withSet = set.length > 0 && set.reduce(
    (patch, item) => {
      const path = pathToString(item.path);
      return patch.set[path] = item.value, patch;
    },
    { id, set: {} }
  ), withUnset = unset.length > 0 && unset.reduce(
    (patch, item) => {
      const path = pathToString(item.path);
      return patch.unset.push(path), patch;
    },
    { id, unset: [] }
  ), withInsert = insert.reduce((acc, item) => {
    const after = pathToString(item.after);
    return acc.concat({ id, insert: { after, items: item.items } });
  }, []), withDmp = dmp.length > 0 && dmp.reduce(
    (patch, item) => {
      const path = pathToString(item.path);
      return patch.diffMatchPatch[path] = item.value, patch;
    },
    { id, diffMatchPatch: {} }
  );
  return [withUnset, withSet, withDmp, ...withInsert].filter(
    (item) => item !== !1
  ).map((patch, i) => ({
    patch: ifRevisionID && i === 0 ? { ...patch, ifRevisionID } : patch
  }));
}
function isUniquelyKeyed(arr) {
  const keys = [];
  for (let i = 0; i < arr.length; i++) {
    const key = getKey(arr[i]);
    if (!key || keys.indexOf(key) !== -1)
      return !1;
    keys.push(key);
  }
  return !0;
}
function getKey(obj) {
  return typeof obj == "object" && obj !== null && obj._key;
}
function indexByKey(arr) {
  return arr.reduce(
    (acc, item) => (acc.keys.push(item._key), acc.index[item._key] = item, acc),
    { keys: [], index: {} }
  );
}
function arrayIsEqual(itemA, itemB) {
  return itemA.length === itemB.length && itemA.every((item, i) => itemB[i] === item);
}
function nullifyUndefined(item, path, index, options) {
  if (typeof item < "u")
    return item;
  if (!options.hideWarnings) {
    const serializedPath = pathToString(path.concat(index));
    console.warn(`undefined value in array converted to null (at '${serializedPath}')`);
  }
  return null;
}
function isRevisionLocked(options) {
  return !!options.ifRevisionID;
}
function yes(_) {
  return !0;
}
exports.DiffError = DiffError;
exports.diffItem = diffItem;
exports.diffPatch = diffPatch;
//# sourceMappingURL=index.cjs.map
