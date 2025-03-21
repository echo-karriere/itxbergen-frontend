"use strict";
var fs = require("node:fs/promises"), path = require("node:path"), node_worker_threads = require("node:worker_threads"), readPkgUp = require("read-pkg-up"), telemetry = require("@sanity/telemetry");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var readPkgUp__default = /* @__PURE__ */ _interopDefaultCompat(readPkgUp);
const SchemaExtractedTrace = telemetry.defineTrace({
  name: "Schema Extracted",
  version: 0,
  description: "Trace emitted when extracting schema"
});
async function extractAction(args, {
  workDir,
  output,
  telemetry: telemetry2
}) {
  const flags = args.extOptions, formatFlag = flags.format || "groq-type-nodes", enforceRequiredFields = flags["enforce-required-fields"] || !1, rootPkgPath = readPkgUp__default.default.sync({
    cwd: __dirname
  })?.path;
  if (!rootPkgPath)
    throw new Error("Could not find root directory for `sanity` package");
  const workerPath = path.join(path.dirname(rootPkgPath), "lib", "_internal", "cli", "threads", "extractSchema.js"), spinner = output.spinner({}).start(enforceRequiredFields ? "Extracting schema, with enforced required fields" : "Extracting schema"), trace = telemetry2.trace(SchemaExtractedTrace);
  trace.start();
  const worker = new node_worker_threads.Worker(workerPath, {
    workerData: {
      workDir,
      workspaceName: flags.workspace,
      enforceRequiredFields,
      format: formatFlag
    },
    // eslint-disable-next-line no-process-env
    env: process.env
  });
  try {
    const {
      schema
    } = await new Promise((resolve, reject) => {
      worker.addListener("message", resolve), worker.addListener("error", reject);
    });
    trace.log({
      schemaAllTypesCount: schema.length,
      schemaDocumentTypesCount: schema.filter((type) => type.type === "document").length,
      schemaTypesCount: schema.filter((type) => type.type === "type").length,
      enforceRequiredFields,
      schemaFormat: formatFlag
    });
    const path$1 = flags.path || path.join(process.cwd(), "schema.json");
    spinner.text = `Writing schema to ${path$1}`, await fs.writeFile(path$1, `${JSON.stringify(schema, null, 2)}
`), trace.complete(), spinner.succeed(enforceRequiredFields ? `Extracted schema to ${path$1} with enforced required fields` : `Extracted schema to ${path$1}`);
  } catch (err) {
    throw trace.error(err), spinner.fail(enforceRequiredFields ? "Failed to extract schema, with enforced required fields" : "Failed to extract schema"), err;
  }
}
exports.default = extractAction;
//# sourceMappingURL=extractAction.js.map
