"use strict";
var node_worker_threads = require("node:worker_threads"), getCliConfig = require("../_chunks-cjs/getCliConfig.js");
getCliConfig.getCliConfig(node_worker_threads.workerData, { forked: !1 }).then((config) => node_worker_threads.parentPort?.postMessage({ type: "config", config })).catch(
  (error) => node_worker_threads.parentPort?.postMessage({
    type: "error",
    error: error instanceof Error ? error.stack : error,
    errorType: error && (error.type || error.name)
  })
);
//# sourceMappingURL=getCliConfig.js.map
