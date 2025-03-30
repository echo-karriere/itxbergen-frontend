"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var fs = require("node:fs/promises"), os = require("node:os"), path = require("node:path");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var fs__default = /* @__PURE__ */ _interopDefaultCompat(fs), os__default = /* @__PURE__ */ _interopDefaultCompat(os), path__default = /* @__PURE__ */ _interopDefaultCompat(path);
async function pathIsEmpty(dir) {
  try {
    return (await fs__default.default.readdir(absolutify(dir))).length === 0;
  } catch (err) {
    if (err.code === "ENOENT")
      return !0;
    throw err;
  }
}
function expandHome(filePath) {
  if (filePath.charCodeAt(0) === 126) {
    if (filePath.charCodeAt(1) === 43)
      return path__default.default.join(process.cwd(), filePath.slice(2));
    const home = os__default.default.homedir();
    return home ? path__default.default.join(home, filePath.slice(1)) : filePath;
  }
  return filePath;
}
function absolutify(dir) {
  const pathName = expandHome(dir);
  return path__default.default.isAbsolute(pathName) ? pathName : path__default.default.resolve(process.cwd(), pathName);
}
exports.absolutify = absolutify;
exports.expandHome = expandHome;
exports.pathIsEmpty = pathIsEmpty;
//# sourceMappingURL=fs.js.map
