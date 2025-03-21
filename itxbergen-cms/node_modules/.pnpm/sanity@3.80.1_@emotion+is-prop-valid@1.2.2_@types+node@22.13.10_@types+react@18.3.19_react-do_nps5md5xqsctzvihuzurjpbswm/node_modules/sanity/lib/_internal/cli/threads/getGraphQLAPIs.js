"use strict";
var node_worker_threads = require("node:worker_threads"), isPlainObject = require("lodash/isPlainObject.js"), oneline = require("oneline"), getStudioWorkspaces = require("../../../_chunks-cjs/getStudioWorkspaces.js");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var isPlainObject__default = /* @__PURE__ */ _interopDefaultCompat(isPlainObject), oneline__default = /* @__PURE__ */ _interopDefaultCompat(oneline);
async function main() {
  if (node_worker_threads.isMainThread || !node_worker_threads.parentPort)
    throw new Error("This module must be run as a worker thread");
  await getGraphQLAPIsForked(node_worker_threads.parentPort);
}
main().then(() => process.exit());
async function getGraphQLAPIsForked(parent) {
  const {
    cliConfig,
    cliConfigPath,
    workDir
  } = node_worker_threads.workerData, resolved = await resolveGraphQLApis({
    cliConfig,
    cliConfigPath,
    workDir
  });
  parent.postMessage(resolved);
}
async function resolveGraphQLApis({
  cliConfig,
  cliConfigPath,
  workDir
}) {
  const workspaces = await getStudioWorkspaces.getStudioWorkspaces({
    basePath: workDir
  }), numSources = workspaces.reduce((count, workspace) => count + workspace.unstable_sources.length, 0), multiSource = numSources > 1, multiWorkspace = workspaces.length > 1, hasGraphQLConfig = !!cliConfig?.graphql;
  if (workspaces.length === 0)
    throw new Error("No studio configuration found");
  if (numSources === 0)
    throw new Error("No sources (project ID / dataset) configured");
  if ((multiWorkspace || multiSource) && !hasGraphQLConfig)
    throw new Error(oneline__default.default`
      Multiple workspaces/sources configured.
      You must define an array of GraphQL APIs in ${cliConfigPath || "sanity.cli.js"}
      and specify which workspace/source to use.
    `);
  if (!hasGraphQLConfig) {
    const {
      projectId,
      dataset,
      schema
    } = workspaces[0].unstable_sources[0];
    return [{
      schemaTypes: getStrippedSchemaTypes(schema),
      projectId,
      dataset
    }];
  }
  const apiDefs = validateCliConfig(cliConfig?.graphql || []);
  return resolveGraphQLAPIsFromConfig(apiDefs, workspaces);
}
function resolveGraphQLAPIsFromConfig(apiDefs, workspaces) {
  const resolvedApis = [];
  for (const apiDef of apiDefs) {
    const {
      workspace: workspaceName,
      source: sourceName
    } = apiDef;
    if (!workspaceName && workspaces.length > 1)
      throw new Error("Must define `workspace` name in GraphQL API config when multiple workspaces are defined");
    const workspace = !workspaceName && workspaces.length === 1 ? workspaces[0] : workspaces.find((space) => space.name === (workspaceName || "default"));
    if (!workspace)
      throw new Error(`Workspace "${workspaceName || "default"}" not found`);
    const source = !sourceName && workspace.unstable_sources.length === 1 ? workspace.unstable_sources[0] : workspace.unstable_sources.find((src) => src.name === (sourceName || "default"));
    if (!source)
      throw new Error(`Source "${sourceName || "default"}" not found in workspace "${workspaceName || "default"}"`);
    resolvedApis.push({
      ...apiDef,
      dataset: source.dataset,
      projectId: source.projectId,
      schemaTypes: getStrippedSchemaTypes(source.schema)
    });
  }
  return resolvedApis;
}
function validateCliConfig(config, configPath = "sanity.cli.js") {
  if (!Array.isArray(config))
    throw new Error(`"graphql" key in "${configPath}" must be an array if defined`);
  if (config.length === 0)
    throw new Error(`No GraphQL APIs defined in "${configPath}"`);
  return config;
}
function getStrippedSchemaTypes(schema) {
  return (schema._original || {
    types: []
  }).types.map((type) => stripType(type));
}
function stripType(input) {
  return strip(input);
}
function strip(input) {
  return Array.isArray(input) ? input.map((item) => strip(item)).filter((item) => typeof item < "u") : isPlainishObject(input) ? Object.keys(input).reduce((stripped, key) => (stripped[key] = strip(input[key]), stripped), {}) : isBasicType(input) ? input : void 0;
}
function isPlainishObject(input) {
  return isPlainObject__default.default(input);
}
function isBasicType(input) {
  const type = typeof input;
  return type === "boolean" || type === "number" || type === "string" ? !0 : type !== "object" ? !1 : Array.isArray(input) || input === null || isPlainishObject(input);
}
//# sourceMappingURL=getGraphQLAPIs.js.map
