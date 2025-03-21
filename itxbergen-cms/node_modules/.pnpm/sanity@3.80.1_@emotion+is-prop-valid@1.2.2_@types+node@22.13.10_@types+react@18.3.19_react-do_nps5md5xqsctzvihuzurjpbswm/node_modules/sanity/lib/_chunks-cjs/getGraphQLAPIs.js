"use strict";
var path = require("node:path"), node_worker_threads = require("node:worker_threads"), readPkgUp = require("read-pkg-up"), sanity = require("sanity");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var path__default = /* @__PURE__ */ _interopDefaultCompat(path), readPkgUp__default = /* @__PURE__ */ _interopDefaultCompat(readPkgUp);
async function getGraphQLAPIs(cliContext) {
  if (!isModernCliConfig(cliContext))
    throw new Error("Expected Sanity studio of version 3 or above");
  if (!node_worker_threads.isMainThread)
    throw new Error("getGraphQLAPIs() must be called from the main thread");
  const defaultTypes = sanity.createSchema({
    name: "default",
    types: []
  }).getTypeNames(), isCustomType = (type) => !defaultTypes.includes(type.name);
  return (await getApisWithSchemaTypes(cliContext)).map(({
    schemaTypes,
    ...api
  }) => ({
    schema: sanity.createSchema({
      name: "default",
      types: schemaTypes.filter(isCustomType)
    }),
    ...api
  }));
}
function getApisWithSchemaTypes(cliContext) {
  return new Promise((resolve, reject) => {
    const {
      cliConfig,
      cliConfigPath,
      workDir
    } = cliContext, rootPkgPath = readPkgUp__default.default.sync({
      cwd: __dirname
    })?.path;
    if (!rootPkgPath)
      throw new Error("Could not find root directory for `sanity` package");
    const rootDir = path__default.default.dirname(rootPkgPath), workerPath = path__default.default.join(rootDir, "lib", "_internal", "cli", "threads", "getGraphQLAPIs.js"), worker = new node_worker_threads.Worker(workerPath, {
      workerData: {
        cliConfig: serialize(cliConfig || {}),
        cliConfigPath,
        workDir
      },
      // eslint-disable-next-line no-process-env
      env: process.env
    });
    worker.on("message", resolve), worker.on("error", reject), worker.on("exit", (code) => {
      code !== 0 && reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
function isModernCliConfig(config) {
  return config.sanityMajorVersion >= 3;
}
function serialize(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (cause) {
    throw new Error("Failed to serialize CLI configuration", {
      cause
    });
  }
}
exports.getGraphQLAPIs = getGraphQLAPIs;
//# sourceMappingURL=getGraphQLAPIs.js.map
