"use strict";
var node_child_process = require("node:child_process"), fs = require("node:fs/promises"), path = require("node:path"), readPkgUp = require("read-pkg-up"), helpers = require("yargs/helpers"), yargs = require("yargs/yargs");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var fs__default = /* @__PURE__ */ _interopDefaultCompat(fs), path__default = /* @__PURE__ */ _interopDefaultCompat(path), readPkgUp__default = /* @__PURE__ */ _interopDefaultCompat(readPkgUp), yargs__default = /* @__PURE__ */ _interopDefaultCompat(yargs);
async function parseCliFlags(args) {
  return {
    ...await yargs__default.default(helpers.hideBin(args.argv || process.argv).slice(2)).option("with-user-token", {
      type: "boolean",
      default: !1
    }).option("mock-browser-env", {
      type: "boolean",
      default: !1
    }).argv,
    script: args.argsWithoutOptions[0]
  };
}
const execScript = async function(args, context) {
  const {
    withUserToken,
    mockBrowserEnv,
    script
  } = await parseCliFlags(args), {
    workDir
  } = context, scriptPath = path__default.default.resolve(script || "");
  if (!script)
    throw new Error("SCRIPT must be provided. `sanity exec <script>`");
  if (!await fs__default.default.stat(scriptPath).catch(() => !1))
    throw new Error(`${scriptPath} does not exist`);
  const sanityPkgPath = (await readPkgUp__default.default({
    cwd: __dirname
  }))?.path;
  if (!sanityPkgPath)
    throw new Error("Unable to resolve `sanity` module root");
  const sanityDir = path__default.default.dirname(sanityPkgPath), threadsDir = path__default.default.join(sanityDir, "lib", "_internal", "cli", "threads"), esbuildPath = path__default.default.join(threadsDir, "esbuild.js"), browserEnvPath = path__default.default.join(threadsDir, "registerBrowserEnv.js"), configClientPath = path__default.default.join(threadsDir, "configClient.js");
  if (!await fs__default.default.stat(esbuildPath).catch(() => !1))
    throw new Error("`sanity` module build error: missing threads");
  const baseArgs = mockBrowserEnv ? ["-r", browserEnvPath] : ["-r", esbuildPath], tokenArgs = withUserToken ? ["-r", configClientPath] : [], nodeArgs = [...baseArgs, ...tokenArgs, scriptPath, ...args.extraArguments];
  node_child_process.spawn(process.argv[0], nodeArgs, {
    stdio: "inherit",
    env: {
      // eslint-disable-next-line no-process-env
      ...process.env,
      SANITY_BASE_PATH: workDir
    }
  }).on("close", process.exit);
};
exports.default = execScript;
//# sourceMappingURL=execScript.js.map
