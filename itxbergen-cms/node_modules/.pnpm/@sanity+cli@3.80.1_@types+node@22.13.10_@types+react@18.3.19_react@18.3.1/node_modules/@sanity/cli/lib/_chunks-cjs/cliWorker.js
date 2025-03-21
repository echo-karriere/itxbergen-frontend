"use strict";
var path = require("node:path"), pkgDir = require("pkg-dir");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var path__default = /* @__PURE__ */ _interopDefaultCompat(path), pkgDir__default = /* @__PURE__ */ _interopDefaultCompat(pkgDir);
async function getCliWorkerPath(workerPath) {
  const cliDir = await pkgDir__default.default(__dirname);
  if (!cliDir)
    throw new Error("Failed to find root @sanity/cli module directory");
  const resolvedPath = path__default.default.resolve(cliDir, "lib", "workers", workerPath);
  try {
    return require.resolve(resolvedPath);
  } catch {
    throw new Error(`Unable to resolve path for worker: ${workerPath}`);
  }
}
exports.getCliWorkerPath = getCliWorkerPath;
//# sourceMappingURL=cliWorker.js.map
