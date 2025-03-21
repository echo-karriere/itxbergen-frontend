"use strict";
var path = require("node:path"), node_worker_threads = require("node:worker_threads"), logSymbols = require("log-symbols"), readPkgUp = require("read-pkg-up"), node_tty = require("node:tty"), chalk = require("chalk");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var path__default = /* @__PURE__ */ _interopDefaultCompat(path), logSymbols__default = /* @__PURE__ */ _interopDefaultCompat(logSymbols), readPkgUp__default = /* @__PURE__ */ _interopDefaultCompat(readPkgUp), chalk__default = /* @__PURE__ */ _interopDefaultCompat(chalk);
const isTty = node_tty.isatty(1), headers = {
  error: isTty ? chalk__default.default.bold(chalk__default.default.bgRed(chalk__default.default.black(" ERROR "))) : chalk__default.default.red("[ERROR]"),
  warning: isTty ? chalk__default.default.bold(chalk__default.default.bgYellow(chalk__default.default.black(" WARN "))) : chalk__default.default.yellow("[WARN]")
}, severityValues = {
  error: 0,
  warning: 1
};
function formatPath(pathSegments) {
  const format = ([curr, ...next], mode = "object") => {
    if (!curr) return "";
    if (curr.kind === "property") return format(next, curr.name === "of" ? "array" : "object");
    const name = curr.name ? curr.name : `<anonymous_${curr.type}>`;
    return `${mode === "array" ? `[${name}]` : `.${name}`}${format(next)}`;
  };
  return format(pathSegments.slice(1)).slice(1);
}
function getAggregatedSeverity(groupOrGroups) {
  return (Array.isArray(groupOrGroups) ? groupOrGroups : [groupOrGroups]).flatMap((group) => group.problems.map((problem) => problem.severity)).find((severity) => severity === "error") ? "error" : "warning";
}
function formatSchemaValidation(validation) {
  let unnamedTopLevelTypeCount = 0;
  return Object.entries(validation.reduce((acc, next) => {
    const [firstSegment] = next.path;
    if (!firstSegment || firstSegment.kind !== "type") return acc;
    const topLevelType = firstSegment.name || `<unnamed_${firstSegment.type}_type_${unnamedTopLevelTypeCount++}>`, problems = acc[topLevelType] ?? [];
    return problems.push(next), acc[topLevelType] = problems, acc;
  }, {})).sort((a, b) => {
    const [aType, aGroups] = a, [bType, bGroups] = b, aValue = severityValues[getAggregatedSeverity(aGroups)], bValue = severityValues[getAggregatedSeverity(bGroups)];
    return aValue === bValue ? aType.localeCompare(bType, "en-US") : aValue - bValue;
  }).map(([topLevelType, groups]) => {
    const formattedTopLevelType = isTty ? chalk__default.default.bgWhite(chalk__default.default.black(` ${topLevelType} `)) : `[${topLevelType}]`, header = `${headers[getAggregatedSeverity(groups)]} ${formattedTopLevelType}`, body = groups.sort((a, b) => severityValues[getAggregatedSeverity(a)] - severityValues[getAggregatedSeverity(b)]).map((group) => {
      const formattedPath = `  ${chalk__default.default.bold(formatPath(group.path) || "(root)")}`, formattedMessages = group.problems.sort((a, b) => severityValues[a.severity] - severityValues[b.severity]).map(({
        severity,
        message
      }) => `    ${logSymbols__default.default[severity]} ${message}`).join(`
`);
      return `${formattedPath}
${formattedMessages}`;
    }).join(`
`);
    return `${header}
${body}`;
  }).join(`

`);
}
async function validateAction(args, {
  workDir,
  output
}) {
  const flags = args.extOptions, rootPkgPath = readPkgUp__default.default.sync({
    cwd: __dirname
  })?.path;
  if (!rootPkgPath)
    throw new Error("Could not find root directory for `sanity` package");
  const workerPath = path__default.default.join(path__default.default.dirname(rootPkgPath), "lib", "_internal", "cli", "threads", "validateSchema.js"), level = flags.level || "warning";
  if (level !== "error" && level !== "warning")
    throw new Error("Invalid level. Available levels are 'error' and 'warning'.");
  const format = flags.format || "pretty";
  if (!["pretty", "ndjson", "json"].includes(format))
    throw new Error(`Did not recognize format '${flags.format}'. Available formats are 'pretty', 'ndjson', and 'json'.`);
  let spinner;
  format === "pretty" && (spinner = output.spinner(flags.workspace ? `Validating schema from workspace '${flags.workspace}'\u2026` : "Validating schema\u2026").start());
  const worker = new node_worker_threads.Worker(workerPath, {
    workerData: {
      workDir,
      level,
      workspace: flags.workspace
    },
    // eslint-disable-next-line no-process-env
    env: process.env
  }), {
    validation
  } = await new Promise((resolve, reject) => {
    worker.addListener("message", resolve), worker.addListener("error", reject);
  }), problems = validation.flatMap((group) => group.problems), errorCount = problems.filter((problem) => problem.severity === "error").length, warningCount = problems.filter((problem) => problem.severity === "warning").length, overallSeverity = getAggregatedSeverity(validation);
  switch (format) {
    case "ndjson": {
      for (const group of validation)
        output.print(JSON.stringify(group));
      break;
    }
    case "json": {
      output.print(JSON.stringify(validation));
      break;
    }
    default:
      spinner?.succeed("Validated schema"), output.print(`
Validation results:`), output.print(`${logSymbols__default.default.error} Errors:   ${errorCount.toLocaleString("en-US")} error${errorCount === 1 ? "" : "s"}`), level !== "error" && output.print(`${logSymbols__default.default.warning} Warnings: ${warningCount.toLocaleString("en-US")} warning${warningCount === 1 ? "" : "s"}`), output.print(), output.print(formatSchemaValidation(validation));
  }
  process.exitCode = overallSeverity === "error" ? 1 : 0;
}
exports.default = validateAction;
//# sourceMappingURL=validateAction.js.map
