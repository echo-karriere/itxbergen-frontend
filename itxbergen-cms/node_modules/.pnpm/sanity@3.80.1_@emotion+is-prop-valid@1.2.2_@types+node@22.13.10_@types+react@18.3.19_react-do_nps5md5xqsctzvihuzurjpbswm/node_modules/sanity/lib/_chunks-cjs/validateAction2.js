"use strict";
var fs = require("node:fs"), path = require("node:path"), chalk = require("chalk"), logSymbols = require("log-symbols"), _internal = require("./_internal.js"), node_tty = require("node:tty"), node_worker_threads = require("node:worker_threads"), readPkgUp = require("read-pkg-up");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var fs__default = /* @__PURE__ */ _interopDefaultCompat(fs), path__default = /* @__PURE__ */ _interopDefaultCompat(path), chalk__default = /* @__PURE__ */ _interopDefaultCompat(chalk), logSymbols__default = /* @__PURE__ */ _interopDefaultCompat(logSymbols), readPkgUp__default = /* @__PURE__ */ _interopDefaultCompat(readPkgUp);
async function arrayFromAsync(iterable) {
  const results = [];
  for await (const item of iterable) results.push(item);
  return results;
}
const json = async ({
  output,
  worker
}) => {
  const formatted = (await arrayFromAsync(worker.stream.validation())).filter(({
    markers
  }) => markers.length).map(({
    validatedCount,
    ...result
  }) => result);
  await worker.dispose(), output.print(JSON.stringify(formatted));
  let overallLevel = "info";
  for (const {
    level
  } of formatted)
    level === "error" && (overallLevel = "error"), level === "warning" && overallLevel !== "error" && (overallLevel = "warning");
  return overallLevel;
}, ndjson = async ({
  output,
  worker
}) => {
  let overallLevel = "info";
  for await (const {
    validatedCount,
    ...result
  } of worker.stream.validation())
    result.level === "error" && (overallLevel = "error"), result.level === "warning" && overallLevel !== "error" && (overallLevel = "warning"), result.markers.length && output.print(JSON.stringify(result));
  return await worker.dispose(), overallLevel;
}, isTty = node_tty.isatty(1), levelValues = {
  error: 0,
  warning: 1,
  info: 2
}, count = (amount, subject) => `${amount.toLocaleString("en-US")} ${amount === 1 ? subject.slice(0, Math.max(0, subject.length - 1)) : subject}`, percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
}), percent = (value) => percentageFormatter.format(Math.min(value, 1)), secondFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
}), seconds = (startTime) => {
  const endTime = Date.now();
  return `(${secondFormatter.format((endTime - startTime) / 1e3)}s)`;
}, summary = ({
  errors,
  infos,
  valid,
  warnings
}, level = "warning") => {
  const levelValue = levelValues[level];
  return [`${logSymbols__default.default.success} Valid:    ${count(valid.documents, "documents")}`, `${logSymbols__default.default.error} Errors:   ${count(errors.documents, "documents")}, ${count(errors.markers, "errors")}`, levelValue >= levelValues.warning && `${logSymbols__default.default.warning} Warnings: ${count(warnings.documents, "documents")}, ${count(warnings.markers, "warnings")}`, levelValue >= levelValues.info && `${logSymbols__default.default.info} Info:     ${count(infos.documents, "documents")}, ${count(infos.documents, "markers")}`].filter(Boolean).join(`
`);
}, levelHeaders = {
  error: isTty ? chalk__default.default.bold(chalk__default.default.bgRed(chalk__default.default.black(" ERROR "))) : chalk__default.default.red("[ERROR]"),
  warning: isTty ? chalk__default.default.bold(chalk__default.default.bgYellow(chalk__default.default.black(" WARN "))) : chalk__default.default.yellow("[WARN]"),
  info: isTty ? chalk__default.default.bold(chalk__default.default.cyan(chalk__default.default.black(" INFO "))) : chalk__default.default.cyan("[INFO]")
}, link = (text, url) => isTty ? `\x1B]8;;${url}\x07${text}\x1B]8;;\x07` : chalk__default.default.underline(text), compareLevels = (a, b) => levelValues[a.level] - levelValues[b.level], formatRootErrors = (root, hasChildren, paddingLength) => {
  if (!root.nodes) return "";
  const [first, ...rest] = root.nodes.slice().sort(compareLevels);
  if (!first) return "";
  const firstElbow = hasChildren ? "\u2502 " : "\u2514\u2500", firstPadding = ".".repeat(paddingLength - 6), firstLine = `${firstElbow} (root) ${firstPadding} ${logSymbols__default.default[first.level]} ${first.message}`, subsequentPadding = " ".repeat(paddingLength + 2), subsequentElbow = hasChildren ? "\u2502 " : "  ", restOfLines = rest.map((marker) => `${subsequentElbow}${subsequentPadding} ${logSymbols__default.default[marker.level]} ${marker.message}`).join(`
`);
  return [firstLine, restOfLines].filter(Boolean).join(`
`);
};
function formatDocumentValidation({
  documentId,
  documentType,
  level,
  markers,
  intentUrl
}) {
  const tree = _internal.convertToTree(markers), documentTypeHeader = isTty ? chalk__default.default.bgWhite(chalk__default.default.black(` ${documentType} `)) : `[${documentType}]`, header = `${levelHeaders[level]} ${documentTypeHeader} ${intentUrl ? link(documentId, intentUrl) : chalk__default.default.underline(documentId)}`, paddingLength = Math.max(_internal.maxKeyLength(tree.children) + 2, 30), childErrors = _internal.formatTree({
    node: tree.children,
    paddingLength,
    getNodes: ({
      nodes
    }) => (nodes ?? []).slice().sort(compareLevels),
    getMessage: (marker) => [logSymbols__default.default[marker.level], marker.message].join(" ")
  }), rootErrors = formatRootErrors(tree, childErrors.length > 0, paddingLength);
  return [header, rootErrors, childErrors].filter(Boolean).join(`
`);
}
const pretty = async ({
  output,
  worker,
  flags
}) => {
  const workspaceLoadStart = Date.now(), spinner = output.spinner(flags.workspace ? `Loading workspace '${flags.workspace}'\u2026` : "Loading workspace\u2026").start(), workspace = await worker.event.loadedWorkspace();
  if (spinner.succeed(`Loaded workspace '${workspace.name}' using project '${workspace.projectId}' and dataset '${flags.dataset || workspace.dataset}' ${seconds(workspaceLoadStart)}`), !flags.file) {
    spinner.start("Calculating documents to be validated\u2026");
    const {
      documentCount
    } = await worker.event.loadedDocumentCount(), downloadStart = Date.now();
    spinner.text = `Downloading ${count(documentCount, "documents")}\u2026`;
    for await (const {
      downloadedCount
    } of worker.stream.exportProgress()) {
      const percentage = percent(downloadedCount / documentCount);
      spinner.text = `Downloading ${count(documentCount, "documents")}\u2026 ${percentage}`;
    }
    spinner.succeed(`Downloaded ${count(documentCount, "documents")} ${seconds(downloadStart)}`);
  }
  const {
    totalDocumentsToValidate
  } = await worker.event.exportFinished(), referenceIntegrityStart = Date.now();
  spinner.start("Checking reference existence\u2026"), await worker.event.loadedReferenceIntegrity(), spinner.succeed(`Checked all references ${seconds(referenceIntegrityStart)}`);
  const validationStart = Date.now();
  spinner.start(`Validating ${count(totalDocumentsToValidate, "documents")}\u2026`);
  const results = [], totals = {
    valid: {
      documents: 0
    },
    errors: {
      documents: 0,
      markers: 0
    },
    warnings: {
      documents: 0,
      markers: 0
    },
    infos: {
      documents: 0,
      markers: 0
    }
  };
  for await (const {
    validatedCount,
    ...result
  } of worker.stream.validation()) {
    const {
      markers
    } = result;
    markers.length && results.push(result);
    const errors = markers.filter((marker) => marker.level === "error"), warnings = markers.filter((marker) => marker.level === "warning"), infos = markers.filter((marker) => marker.level === "info");
    markers.length || (totals.valid.documents += 1), errors.length && (totals.errors.documents += 1, totals.errors.markers += errors.length), warnings.length && (totals.warnings.documents += 1, totals.warnings.markers += warnings.length), infos.length && (totals.infos.documents += 1, totals.infos.markers += infos.length), spinner.text = `Validating ${count(totalDocumentsToValidate, "documents")}\u2026

Processed ${count(validatedCount, "documents")} (${percent(validatedCount / totalDocumentsToValidate)}):
${summary(totals, flags.level)}`;
  }
  spinner.succeed(`Validated ${count(totalDocumentsToValidate, "documents")} ${seconds(validationStart)}`), output.print(`
Validation results:
${summary(totals, flags.level)}`), results.sort((a, b) => a.level === b.level ? a.documentType.localeCompare(b.documentType) : levelValues[a.level] - levelValues[b.level]);
  let overallLevel = "info";
  for (const result of results)
    result.level === "error" && (overallLevel = "error"), result.level === "warning" && overallLevel !== "error" && (overallLevel = "warning"), output.print(`${formatDocumentValidation(result)}
`);
  return await worker.dispose(), overallLevel;
}, reporters = {
  pretty,
  ndjson,
  json
};
class MessageQueue {
  resolver = null;
  queue = [];
  push(message) {
    this.resolver ? (this.resolver({
      value: message,
      done: !1
    }), this.resolver = null) : this.queue.push(message);
  }
  next() {
    return this.queue.length ? Promise.resolve({
      value: this.queue.shift(),
      done: !1
    }) : new Promise((resolve) => this.resolver = resolve);
  }
  end() {
    this.resolver && this.resolver({
      value: void 0,
      done: !0
    });
  }
}
function isWorkerChannelMessage(message) {
  return typeof message != "object" || !message || !("type" in message) || typeof message.type != "string" ? !1 : ["event", "emission", "end"].includes(message.type);
}
function createReceiver(worker) {
  const _events = /* @__PURE__ */ new Map(), _streams = /* @__PURE__ */ new Map(), errors = new MessageQueue(), eventQueue = (name) => {
    const queue = _events.get(name) ?? new MessageQueue();
    return _events.has(name) || _events.set(name, queue), queue;
  }, streamQueue = (name) => {
    const queue = _streams.get(name) ?? new MessageQueue();
    return _streams.has(name) || _streams.set(name, queue), queue;
  }, handleMessage = (message) => {
    isWorkerChannelMessage(message) && (message.type === "event" && eventQueue(message.name).push(message), message.type === "emission" && streamQueue(message.name).push(message), message.type === "end" && streamQueue(message.name).end());
  }, handleError = (error) => {
    errors.push({
      type: "error",
      error
    });
  };
  return worker.addListener("message", handleMessage), worker.addListener("error", handleError), {
    event: new Proxy({}, {
      get: (target, name) => typeof name != "string" ? target[name] : async () => {
        const {
          value
        } = await Promise.race([eventQueue(name).next(), errors.next()]);
        if (value.type === "error") throw value.error;
        return value.payload;
      }
    }),
    stream: new Proxy({}, {
      get: (target, prop) => {
        if (typeof prop != "string") return target[prop];
        const name = prop;
        async function* streamReceiver() {
          for (; ; ) {
            const {
              value,
              done
            } = await Promise.race([streamQueue(name).next(), errors.next()]);
            if (done) return;
            if (value.type === "error") throw value.error;
            yield value.payload;
          }
        }
        return streamReceiver;
      }
    }),
    dispose: () => (worker.removeListener("message", handleMessage), worker.removeListener("error", handleError), worker.terminate())
  };
}
const defaultReporter = ({
  stream,
  dispose
}) => {
  async function* createValidationGenerator() {
    for await (const {
      documentId,
      documentType,
      markers,
      revision,
      level
    } of stream.validation())
      yield {
        documentId,
        documentType,
        revision,
        level,
        markers
      };
    await dispose();
  }
  return createValidationGenerator();
};
function validateDocuments(options) {
  const {
    workspace,
    clientConfig,
    configPath,
    dataset,
    projectId,
    workDir = process.cwd(),
    reporter = defaultReporter,
    level,
    maxCustomValidationConcurrency,
    maxFetchConcurrency,
    ndjsonFilePath
  } = options, rootPkgPath = readPkgUp__default.default.sync({
    cwd: __dirname
  })?.path;
  if (!rootPkgPath)
    throw new Error("Could not find root directory for `sanity` package");
  const workerPath = path__default.default.join(path__default.default.dirname(rootPkgPath), "lib", "_internal", "cli", "threads", "validateDocuments.js"), worker = new node_worker_threads.Worker(workerPath, {
    workerData: {
      workDir,
      // removes props in the config that make this object fail to serialize
      clientConfig: JSON.parse(JSON.stringify(clientConfig)),
      configPath,
      workspace,
      dataset,
      projectId,
      level,
      ndjsonFilePath,
      maxCustomValidationConcurrency,
      maxFetchConcurrency,
      studioHost: options.studioHost
    },
    // eslint-disable-next-line no-process-env
    env: process.env
  });
  return reporter(createReceiver(worker));
}
async function validateAction(args, {
  apiClient,
  workDir,
  output,
  cliConfig,
  prompt
}) {
  const flags = args.extOptions;
  if (!(flags.yes || flags.y) && (output.print(`${chalk__default.default.yellow(`${logSymbols__default.default.warning} Warning:`)} This command ${flags.file ? "reads all documents from your input file" : "downloads all documents from your dataset"} and processes them through your local schema within a simulated browser environment.
`), output.print(`Potential pitfalls:
`), output.print("- Processes all documents locally (excluding assets). Large datasets may require more resources."), output.print("- Executes all custom validation functions. Some functions may need to be refactored for compatibility."), output.print("- Not all standard browser features are available and may cause issues while loading your Studio."), output.print("- Adheres to document permissions. Ensure this account can see all desired documents."), flags.file && output.print("- Checks for missing document references against the live dataset if not found in your file."), !await prompt.single({
    type: "confirm",
    message: "Are you sure you want to continue?",
    default: !0
  }))) {
    output.print("User aborted"), process.exitCode = 1;
    return;
  }
  if (flags.format && !(flags.format in reporters)) {
    const formatter = new Intl.ListFormat("en-US", {
      style: "long",
      type: "conjunction"
    });
    throw new Error(`Did not recognize format '${flags.format}'. Available formats are ${formatter.format(Object.keys(reporters).map((key) => `'${key}'`))}`);
  }
  const level = flags.level || "warning";
  if (level !== "error" && level !== "warning" && level !== "info")
    throw new Error("Invalid level. Available levels are 'error', 'warning', and 'info'.");
  const maxCustomValidationConcurrency = flags["max-custom-validation-concurrency"];
  if (maxCustomValidationConcurrency && typeof maxCustomValidationConcurrency != "number" && !Number.isInteger(maxCustomValidationConcurrency))
    throw new Error("'--max-custom-validation-concurrency' must be an integer.");
  const maxFetchConcurrency = flags["max-fetch-concurrency"];
  if (maxFetchConcurrency && typeof maxFetchConcurrency != "number" && !Number.isInteger(maxFetchConcurrency))
    throw new Error("'--max-fetch-concurrency' must be an integer.");
  const clientConfig = {
    ...apiClient({
      requireUser: !0,
      requireProject: !1
      // we'll get this from the workspace
    }).config(),
    // we set this explictly to true because the default client configuration
    // from the CLI comes configured with `useProjectHostname: false` when
    // `requireProject` is set to false
    useProjectHostname: !0,
    // we set this explictly to true because we pass in a token via the
    // `clientConfiguration` object and also mock a browser environment in
    // this worker which triggers the browser warning
    ignoreBrowserTokenWarning: !0
  };
  let ndjsonFilePath;
  if (flags.file) {
    if (typeof flags.file != "string")
      throw new Error("'--file' must be a string");
    const filePath = path__default.default.resolve(workDir, flags.file);
    if (!(await fs__default.default.promises.stat(filePath)).isFile())
      throw new Error("'--file' must point to a valid ndjson file or tarball");
    ndjsonFilePath = filePath;
  }
  const overallLevel = await validateDocuments({
    workspace: flags.workspace,
    dataset: flags.dataset,
    clientConfig,
    workDir,
    level,
    maxCustomValidationConcurrency,
    maxFetchConcurrency,
    ndjsonFilePath,
    reporter: (worker) => (flags.format && flags.format in reporters ? reporters[flags.format] : reporters.pretty)({
      output,
      worker,
      flags
    }),
    studioHost: cliConfig?.studioHost
  });
  process.exitCode = overallLevel === "error" ? 1 : 0;
}
exports.default = validateAction;
//# sourceMappingURL=validateAction2.js.map
