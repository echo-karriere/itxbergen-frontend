"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var getAtPath = require("./_chunks-cjs/getAtPath.cjs"), parse = require("./_chunks-cjs/parse.cjs"), stringify = require("./_chunks-cjs/stringify.cjs");
function normalize(path) {
  return typeof path == "string" ? parse.parse(path) : path;
}
exports.getAtPath = getAtPath.getAtPath;
exports.parse = parse.parse;
exports.isArrayElement = stringify.isArrayElement;
exports.isElementEqual = stringify.isElementEqual;
exports.isEqual = stringify.isEqual;
exports.isIndexElement = stringify.isIndexElement;
exports.isKeyElement = stringify.isKeyElement;
exports.isKeyedElement = stringify.isKeyedElement;
exports.isPropertyElement = stringify.isPropertyElement;
exports.startsWith = stringify.startsWith;
exports.stringify = stringify.stringify;
exports.normalize = normalize;
//# sourceMappingURL=_path.cjs.map
