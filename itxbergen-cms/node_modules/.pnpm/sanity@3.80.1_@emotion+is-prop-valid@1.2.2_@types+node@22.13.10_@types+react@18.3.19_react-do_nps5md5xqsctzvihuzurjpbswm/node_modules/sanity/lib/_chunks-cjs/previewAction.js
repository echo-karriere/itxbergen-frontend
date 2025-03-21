"use strict";
var path = require("node:path"), previewServer = require("./previewServer.js");
require("./runtime.js");
var servers = require("./servers.js");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var path__default = /* @__PURE__ */ _interopDefaultCompat(path);
async function startSanityPreviewServer(args, context) {
  const flags = args.extOptions, {
    workDir,
    cliConfig
  } = context, defaultRootDir = path__default.default.resolve(path__default.default.join(workDir, "dist")), rootDir = path__default.default.resolve(args.argsWithoutOptions[0] || defaultRootDir), config = getPreviewServerConfig({
    flags,
    workDir,
    cliConfig,
    rootDir
  });
  try {
    await previewServer.startPreviewServer(config);
  } catch (err) {
    servers.gracefulServerDeath("preview", config.httpHost, config.httpPort, err);
  }
}
function getPreviewServerConfig({
  flags,
  workDir,
  cliConfig,
  rootDir
}) {
  return {
    ...servers.getSharedServerConfig({
      flags,
      workDir,
      cliConfig
    }),
    root: rootDir
  };
}
exports.default = startSanityPreviewServer;
//# sourceMappingURL=previewAction.js.map
