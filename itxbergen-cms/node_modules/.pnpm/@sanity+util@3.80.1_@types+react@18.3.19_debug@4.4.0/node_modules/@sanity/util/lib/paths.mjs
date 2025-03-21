import { isIndexSegment, isKeySegment, isIndexTuple } from "@sanity/types";
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reKeySegment = /_key\s*==\s*['"](.*)['"]/, EMPTY_PATH = [], FOCUS_TERMINATOR = "$", GROQ_DATA_TYPE_VALUES = ["true", "false", "null"];
function get(obj, path, defaultVal) {
  const select = typeof path == "string" ? fromString(path) : path;
  if (!Array.isArray(select))
    throw new Error("Path must be an array or a string");
  let acc = obj;
  for (let i = 0; i < select.length; i++) {
    const segment = select[i];
    if (isIndexSegment(segment)) {
      if (!Array.isArray(acc))
        return defaultVal;
      acc = acc[segment];
    }
    if (isKeySegment(segment)) {
      if (!Array.isArray(acc))
        return defaultVal;
      acc = acc.find((item) => item._key === segment._key);
    }
    if (typeof segment == "string" && (acc = typeof acc == "object" && acc !== null ? acc[segment] : void 0), typeof acc > "u")
      return defaultVal;
  }
  return acc;
}
const pathsMemo = /* @__PURE__ */ new Map();
function pathFor(path) {
  if (path.length === 0)
    return EMPTY_PATH;
  const asString = toString(path);
  return pathsMemo.has(asString) ? pathsMemo.get(asString) : (pathsMemo.set(asString, path), Object.freeze(path), path);
}
function isEqual(path, otherPath) {
  return path.length === otherPath.length && path.every((segment, i) => isSegmentEqual(segment, otherPath[i]));
}
function numEqualSegments(path, otherPath) {
  const length = Math.min(path.length, otherPath.length);
  for (let i = 0; i < length; i++)
    if (!isSegmentEqual(path[i], otherPath[i]))
      return i;
  return length;
}
function isSegmentEqual(segmentA, segmentB) {
  return isKeySegment(segmentA) && isKeySegment(segmentB) ? segmentA._key === segmentB._key : isIndexSegment(segmentA) ? Number(segmentA) === Number(segmentB) : isIndexTuple(segmentA) && isIndexTuple(segmentB) ? segmentA[0] === segmentB[0] && segmentA[1] === segmentB[1] : segmentA === segmentB;
}
function hasFocus(focusPath, path) {
  const withoutTerminator = focusPath[focusPath.length - 1] === FOCUS_TERMINATOR ? focusPath.slice(0, -1) : focusPath;
  return isEqual(withoutTerminator, path);
}
function hasItemFocus(focusPath, item) {
  return focusPath.length === 1 && isSegmentEqual(focusPath[0], item);
}
function isExpanded(segment, focusPath) {
  const [head, ...tail] = focusPath;
  return tail.length > 0 && isSegmentEqual(segment, head);
}
function startsWith(prefix, path) {
  return prefix.every((segment, i) => isSegmentEqual(segment, path[i]));
}
function trimLeft(prefix, path) {
  if (prefix.length === 0 || path.length === 0)
    return path;
  const [prefixHead, ...prefixTail] = prefix, [pathHead, ...pathTail] = path;
  return isSegmentEqual(prefixHead, pathHead) ? pathFor(trimLeft(prefixTail, pathTail)) : path;
}
function trimRight(suffix, path) {
  const sufLen = suffix.length, pathLen = path.length;
  if (sufLen === 0 || pathLen === 0)
    return path;
  let i = 0;
  for (; i < sufLen && i < pathLen && isSegmentEqual(path[pathLen - i - 1], suffix[sufLen - i - 1]); )
    i++;
  return pathFor(path.slice(0, pathLen - i));
}
function trimChildPath(path, childPath) {
  return startsWith(path, childPath) ? trimLeft(path, childPath) : EMPTY_PATH;
}
function toString(path) {
  if (!Array.isArray(path))
    throw new Error("Path is not an array");
  return path.reduce((target, segment, i) => {
    const isHead = i === 0;
    if (typeof segment == "number")
      return `${target}[${segment}]`;
    if (typeof segment == "string")
      return isHead ? segment : GROQ_DATA_TYPE_VALUES.includes(segment) ? `${target}["${segment}"]` : `${target}.${segment}`;
    if (isKeySegment(segment) && segment._key)
      return `${target}[_key=="${segment._key}"]`;
    if (Array.isArray(segment)) {
      const [from, to] = segment;
      return `${target}[${from}:${to}]`;
    }
    throw new Error(`Unsupported path segment \`${JSON.stringify(segment)}\``);
  }, "");
}
function _resolveKeyedPath(value, path) {
  if (path.length === 0)
    return path;
  const [next, ...rest] = path;
  if (typeof next == "number") {
    if (!Array.isArray(value) || !(next in value))
      return [];
    const item = value[next];
    return [typeof item?._key == "string" ? { _key: item._key } : next, ..._resolveKeyedPath(item, rest)];
  }
  const nextVal = get(value, [next]);
  return [next, ..._resolveKeyedPath(nextVal, rest)];
}
function resolveKeyedPath(value, path) {
  if (!Array.isArray(path))
    throw new Error("Path is not an array");
  return pathFor(_resolveKeyedPath(value, path));
}
function fromString(path) {
  if (typeof path != "string")
    throw new Error("Path is not a string");
  const segments = path.match(rePropName);
  if (!segments)
    throw new Error("Invalid path string");
  return segments.map(normalizePathSegment);
}
function normalizePathSegment(segment) {
  return isIndexSegment(segment) ? normalizeIndexSegment(segment) : isKeySegment(segment) ? normalizeKeySegment(segment) : isIndexTuple(segment) ? normalizeIndexTupleSegment(segment) : segment;
}
function normalizeIndexSegment(segment) {
  return Number(segment.replace(/[^\d]/g, ""));
}
function normalizeKeySegment(segment) {
  return { _key: segment.match(reKeySegment)[1] };
}
function normalizeIndexTupleSegment(segment) {
  const [from, to] = segment.split(":").map((seg) => seg === "" ? seg : Number(seg));
  return [from, to];
}
export {
  FOCUS_TERMINATOR,
  _resolveKeyedPath,
  fromString,
  get,
  hasFocus,
  hasItemFocus,
  isEqual,
  isExpanded,
  isSegmentEqual,
  numEqualSegments,
  pathFor,
  resolveKeyedPath,
  startsWith,
  toString,
  trimChildPath,
  trimLeft,
  trimRight
};
//# sourceMappingURL=paths.mjs.map
