import getRandomValues from "get-random-values-esm";
var hasOwn = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
function isDeepEmptyObject(value) {
  for (const key in value)
    if (!(key === "_type" || key === "_key") && hasOwn(value, key) && !isDeepEmpty(value[key]))
      return !1;
  return !0;
}
function isDeepEmptyArray(value) {
  for (let i = 0; i < value.length; i++)
    if (!isDeepEmpty(value[i]))
      return !1;
  return !0;
}
function isDeepEmpty(value) {
  if (value == null)
    return !0;
  const type = typeof value;
  return Array.isArray(value) ? isDeepEmptyArray(value) : type === "object" ? isDeepEmptyObject(value) : !1;
}
const isEmptyArray = isDeepEmptyArray, isEmpty = isDeepEmpty, isEmptyObject = isDeepEmptyObject;
function isShallowEmptyObject(value) {
  for (const key in value)
    if (!(key === "_type" || key === "_key") && hasOwn(value, key) && value[key] !== void 0)
      return !1;
  return !0;
}
const getByteHexTable = /* @__PURE__ */ (() => {
  let table;
  return () => {
    if (table)
      return table;
    table = [];
    for (let i = 0; i < 256; ++i)
      table[i] = (i + 256).toString(16).slice(1);
    return table;
  };
})();
function whatwgRNG(length = 16) {
  const rnds8 = new Uint8Array(length);
  return getRandomValues(rnds8), rnds8;
}
function randomKey(length) {
  const table = getByteHexTable();
  return whatwgRNG(length).reduce((str, n) => str + table[n], "").slice(0, length);
}
const toString = Object.prototype.toString;
function resolveJSType(val) {
  switch (toString.call(val)) {
    case "[object Function]":
      return "function";
    case "[object Date]":
      return "date";
    case "[object RegExp]":
      return "regexp";
    case "[object Arguments]":
      return "arguments";
    case "[object Array]":
      return "array";
    case "[object String]":
      return "string";
  }
  if (typeof val == "object" && val && typeof val.length == "number")
    try {
      if (typeof val.callee == "function")
        return "arguments";
    } catch (ex) {
      if (ex instanceof TypeError)
        return "arguments";
    }
  return val === null ? "null" : val === void 0 ? "undefined" : val && val.nodeType === 1 ? "element" : val === Object(val) ? "object" : typeof val;
}
function resolveTypeName(value) {
  const jsType = resolveJSType(value);
  if (jsType !== "object")
    return jsType;
  const obj = value;
  return "_type" in obj && obj._type || jsType;
}
export {
  isDeepEmpty,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isShallowEmptyObject,
  randomKey,
  resolveTypeName
};
//# sourceMappingURL=content.mjs.map
