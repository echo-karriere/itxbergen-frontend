"use strict";
var node_worker_threads = require("node:worker_threads"), journeyConfig = require("../_chunks-cjs/journeyConfig.js");
journeyConfig.getAndWriteJourneySchema(node_worker_threads.workerData).then(() => node_worker_threads.parentPort?.postMessage({ type: "success" })).catch((error) => node_worker_threads.parentPort?.postMessage({ type: "error", error }));
//# sourceMappingURL=getAndWriteJourneySchema.js.map
