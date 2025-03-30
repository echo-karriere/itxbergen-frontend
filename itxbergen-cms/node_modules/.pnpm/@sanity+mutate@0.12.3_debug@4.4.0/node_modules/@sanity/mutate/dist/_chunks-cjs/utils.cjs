"use strict";
var stringify = require("./stringify.cjs"), isObject = require("./isObject.cjs"), diffMatchPatch$1 = require("@sanity/diff-match-patch");
function keyOf(value) {
  return value !== null && typeof value == "object" && typeof value._key == "string" && value._key || null;
}
function findTargetIndex(array, pathSegment) {
  if (typeof pathSegment == "number")
    return normalizeIndex(array.length, pathSegment);
  if (stringify.isKeyedElement(pathSegment)) {
    const idx = array.findIndex((value) => keyOf(value) === pathSegment._key);
    return idx === -1 ? null : idx;
  }
  throw new Error(
    `Expected path segment to be addressing a single array item either by numeric index or by '_key'. Instead saw ${JSON.stringify(
      pathSegment
    )}`
  );
}
function getTargetIdx(position, index) {
  return position === "before" ? index : index + 1;
}
function normalizeIndex(length, index) {
  if (length === 0 && (index === -1 || index === 0))
    return 0;
  const normalized = index < 0 ? length + index : index;
  return normalized >= length || normalized < 0 ? null : normalized;
}
function splice(arr, start, deleteCount, items) {
  const copy = arr.slice();
  return copy.splice(start, deleteCount, ...items || []), copy;
}
function insert(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "insert()" on non-array value');
  const index = findTargetIndex(currentValue, op.referenceItem);
  if (index === null)
    throw new Error(`Found no matching array element to insert ${op.position}`);
  return currentValue.length === 0 ? op.items : splice(currentValue, getTargetIdx(op.position, index), 0, op.items);
}
function upsert(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "upsert()" on non-array value');
  if (op.items.length === 0)
    return currentValue;
  const replaceItemsMap = [], insertItems = [];
  if (op.items.forEach((itemToBeUpserted, i) => {
    const existingIndex = currentValue.findIndex(
      (existingItem) => existingItem?._key === itemToBeUpserted._key
    );
    existingIndex >= 0 ? replaceItemsMap[existingIndex] = i : insertItems.push(itemToBeUpserted);
  }), replaceItemsMap.length === 0 && insertItems.length == 0)
    return currentValue;
  const next = [...currentValue];
  for (const i of replaceItemsMap)
    next[i] = op.items[replaceItemsMap[i]];
  return insert(
    {
      items: insertItems,
      referenceItem: op.referenceItem,
      position: op.position
    },
    next
  );
}
function replace(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "replace()" on non-array value');
  const index = findTargetIndex(currentValue, op.referenceItem);
  if (index === null)
    throw new Error("Found no matching array element to replace");
  return splice(currentValue, index, op.items.length, op.items);
}
function remove(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "remove()" on non-array value');
  const index = findTargetIndex(currentValue, op.referenceItem);
  if (index === null)
    throw new Error("Found no matching array element to replace");
  return splice(currentValue, index, 1, []);
}
function truncate(op, currentValue) {
  if (!Array.isArray(currentValue))
    throw new TypeError('Cannot apply "truncate()" on non-array value');
  return typeof op.endIndex == "number" ? currentValue.slice(0, op.startIndex).concat(currentValue.slice(op.endIndex)) : currentValue.slice(0, op.startIndex);
}
function set(op, currentValue) {
  return op.value;
}
function setIfMissing(op, currentValue) {
  return currentValue ?? op.value;
}
function unset(op) {
}
function inc(op, currentValue) {
  if (typeof currentValue != "number")
    throw new TypeError('Cannot apply "inc()" on non-numeric value');
  return currentValue + op.amount;
}
function dec(op, currentValue) {
  if (typeof currentValue != "number")
    throw new TypeError('Cannot apply "dec()" on non-numeric value');
  return currentValue - op.amount;
}
const hasOwn = Object.prototype.hasOwnProperty.call.bind(
  Object.prototype.hasOwnProperty
);
function isEmpty(v) {
  for (const key in v)
    if (hasOwn(v, key))
      return !1;
  return !0;
}
function omit(val, props) {
  const copy = { ...val };
  for (const prop of props)
    delete copy[prop];
  return copy;
}
function unassign(op, currentValue) {
  if (!isObject.isObject(currentValue))
    throw new TypeError('Cannot apply "unassign()" on non-object value');
  return op.keys.length === 0 ? currentValue : omit(currentValue, op.keys);
}
function assign(op, currentValue) {
  if (!isObject.isObject(currentValue))
    throw new TypeError('Cannot apply "assign()" on non-object value');
  return isEmpty(op.value) ? currentValue : { ...currentValue, ...op.value };
}
function diffMatchPatch(op, currentValue) {
  if (typeof currentValue != "string")
    throw new TypeError('Cannot apply "diffMatchPatch()" on non-string value');
  return diffMatchPatch$1.applyPatches(diffMatchPatch$1.parsePatch(op.value), currentValue)[0];
}
var operations = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  assign,
  dec,
  diffMatchPatch,
  inc,
  insert,
  remove,
  replace,
  set,
  setIfMissing,
  truncate,
  unassign,
  unset,
  upsert
});
function applyOp(op, currentValue) {
  if (!(op.type in operations))
    throw new Error(`Invalid operation type: "${op.type}"`);
  return operations[op.type](op, currentValue);
}
function applyPatches(patches, document) {
  return patches.reduce(
    (prev, patch) => applyNodePatch(patch, prev),
    document
  );
}
function applyNodePatch(patch, document) {
  return applyAtPath(patch.path, patch.op, document);
}
function applyAtPath(path, op, value) {
  if (!isNonEmptyArray(path))
    return applyOp(op, value);
  const [head, ...tail] = path;
  if (stringify.isArrayElement(head) && Array.isArray(value))
    return applyInArray(head, tail, op, value);
  if (stringify.isPropertyElement(head) && isObject.isObject(value))
    return applyInObject(head, tail, op, value);
  throw new Error(
    `Cannot apply operation of type "${op.type}" to path ${stringify.stringify(
      path
    )} on ${typeof value} value`
  );
}
function applyInObject(head, tail, op, object) {
  const current = object[head];
  if (current === void 0 && tail.length > 0)
    return object;
  const patchedValue = applyAtPath(tail, op, current);
  return patchedValue === current ? object : { ...object, [head]: patchedValue };
}
function applyInArray(head, tail, op, value) {
  const index = findTargetIndex(value, head);
  if (index === null || index === -1)
    return value;
  const current = value[index], patchedItem = applyAtPath(tail, op, current);
  return patchedItem === current ? value : splice(value, index, 1, [patchedItem]);
}
function isNonEmptyArray(a) {
  return a.length > 0;
}
function applyPatchMutation(mutation, document) {
  if (mutation.options?.ifRevision && document._rev !== mutation.options.ifRevision)
    throw new Error("Revision mismatch");
  if (mutation.id !== document._id)
    throw new Error(
      `Document id mismatch. Refusing to apply mutation for document with id="${mutation.id}" on the given document with id="${document._id}"`
    );
  return applyPatches(mutation.patches, document);
}
function hasId(doc) {
  return "_id" in doc;
}
function assignId(doc, generateId) {
  return hasId(doc) ? doc : { ...doc, _id: generateId() };
}
exports.applyNodePatch = applyNodePatch;
exports.applyOp = applyOp;
exports.applyPatchMutation = applyPatchMutation;
exports.applyPatches = applyPatches;
exports.assignId = assignId;
exports.hasId = hasId;
exports.splice = splice;
//# sourceMappingURL=utils.cjs.map
