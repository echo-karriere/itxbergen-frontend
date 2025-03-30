"use strict";
function safeGetElementAt(array, index) {
  if (index < 0 || index >= array.length)
    throw new Error("Index out of bounds");
  return array[index];
}
function startsWith(parentPath, path) {
  return parentPath.length <= path.length && parentPath.every(
    (segment, i) => isElementEqual(segment, safeGetElementAt(path, i))
  );
}
function isEqual(path, otherPath) {
  return path.length === otherPath.length && path.every(
    (segment, i) => isElementEqual(segment, safeGetElementAt(path, i))
  );
}
function isElementEqual(segmentA, segmentB) {
  return isKeyElement(segmentA) && isKeyElement(segmentB) ? segmentA._key === segmentB._key : isIndexElement(segmentA) ? Number(segmentA) === Number(segmentB) : segmentA === segmentB;
}
function isKeyElement(segment) {
  return typeof segment?._key == "string";
}
function isIndexElement(segment) {
  return typeof segment == "number";
}
function isKeyedElement(element) {
  return typeof element == "object" && "_key" in element && typeof element._key == "string";
}
function isArrayElement(element) {
  return typeof element == "number" || isKeyedElement(element);
}
function isPropertyElement(element) {
  return typeof element == "string";
}
const IS_DOTTABLE = /^[a-z_$]+/;
function stringifySegment(segment, hasLeading) {
  return Array.isArray(segment) ? `[${segment[0]}:${segment[1] || ""}]` : typeof segment == "number" ? `[${segment}]` : isKeyedElement(segment) ? `[_key==${JSON.stringify(segment._key)}]` : typeof segment == "string" && IS_DOTTABLE.test(segment) ? hasLeading ? segment : `.${segment}` : `['${segment}']`;
}
function stringify(pathArray) {
  return pathArray.map((segment, i) => stringifySegment(segment, i === 0)).join("");
}
exports.isArrayElement = isArrayElement;
exports.isElementEqual = isElementEqual;
exports.isEqual = isEqual;
exports.isIndexElement = isIndexElement;
exports.isKeyElement = isKeyElement;
exports.isKeyedElement = isKeyedElement;
exports.isPropertyElement = isPropertyElement;
exports.startsWith = startsWith;
exports.stringify = stringify;
//# sourceMappingURL=stringify.cjs.map
