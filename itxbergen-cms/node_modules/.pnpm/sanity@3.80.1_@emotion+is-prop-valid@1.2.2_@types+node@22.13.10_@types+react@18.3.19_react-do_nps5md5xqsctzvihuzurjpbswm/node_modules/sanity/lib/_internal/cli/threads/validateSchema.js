"use strict";
var node_worker_threads = require("node:worker_threads"), _internal = require("@sanity/schema/_internal"), sanity = require("sanity"), getStudioWorkspaces = require("../../../_chunks-cjs/getStudioWorkspaces.js"), mockBrowserEnvironment = require("../../../_chunks-cjs/mockBrowserEnvironment.js");
const {
  workDir,
  workspace: workspaceName,
  level = "warning"
} = node_worker_threads.workerData;
async function main() {
  if (node_worker_threads.isMainThread || !node_worker_threads.parentPort)
    throw new Error("This module must be run as a worker thread");
  const cleanup = mockBrowserEnvironment.mockBrowserEnvironment(workDir);
  try {
    const workspaces = getStudioWorkspaces.getStudioConfig({
      basePath: workDir
    });
    if (!workspaces.length)
      throw new Error("Configuration did not return any workspaces.");
    let workspace;
    if (workspaceName) {
      if (workspace = workspaces.find((w) => w.name === workspaceName), !workspace)
        throw new Error(`Could not find any workspaces with name \`${workspaceName}\``);
    } else {
      if (workspaces.length !== 1)
        throw new Error("Multiple workspaces found. Please specify which workspace to use with '--workspace'.");
      workspace = workspaces[0];
    }
    const schemaTypes = sanity.resolveSchemaTypes({
      config: workspace,
      context: {
        dataset: workspace.dataset,
        projectId: workspace.projectId
      }
    }), result = {
      validation: _internal.groupProblems(_internal.validateSchema(schemaTypes).getTypes()).map((group) => ({
        ...group,
        problems: group.problems.filter((problem) => level === "error" ? problem.severity === "error" : !0)
      })).filter((group) => group.problems.length)
    };
    node_worker_threads.parentPort?.postMessage(result);
  } finally {
    cleanup();
  }
}
main().then(() => process.exit());
//# sourceMappingURL=validateSchema.js.map
