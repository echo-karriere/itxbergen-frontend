"use strict";
var node_perf_hooks = require("node:perf_hooks");
function getTimer() {
  const timings = {}, startTimes = {};
  function start(name) {
    if (typeof startTimes[name] < "u")
      throw new Error(`Timer "${name}" already started, cannot overwrite`);
    startTimes[name] = node_perf_hooks.performance.now();
  }
  function end(name) {
    if (typeof startTimes[name] > "u")
      throw new Error(`Timer "${name}" never started, cannot end`);
    return timings[name] = node_perf_hooks.performance.now() - startTimes[name], timings[name];
  }
  return {
    start,
    end,
    getTimings: () => timings
  };
}
exports.getTimer = getTimer;
//# sourceMappingURL=timing.js.map
