"use strict";
var helpers = require("yargs/helpers"), yargs = require("yargs/yargs"), getGraphQLAPIs = require("./getGraphQLAPIs.js");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var yargs__default = /* @__PURE__ */ _interopDefaultCompat(yargs);
function parseCliFlags(args) {
  return yargs__default.default(helpers.hideBin(args.argv || process.argv).slice(2)).option("api", {
    type: "string"
  }).option("project", {
    type: "string"
  }).option("dataset", {
    type: "string"
  }).option("tag", {
    type: "string",
    default: "default"
  }).option("force", {
    type: "boolean"
  }).argv;
}
async function deleteGraphQLApi(args, context) {
  const flags = await parseCliFlags(args), {
    apiClient,
    output,
    prompt
  } = context;
  let projectId = flags.project, dataset = flags.dataset, tag = flags.tag;
  if (flags.api) {
    const apiDef = (await getGraphQLAPIs.getGraphQLAPIs(context)).find((def) => def.id === flags.api);
    if (!apiDef)
      throw new Error(`GraphQL API "${flags.api}" not found`);
    projectId ? output.warn(`Both --api and --project specified, using --project ${projectId}`) : projectId = apiDef.projectId, dataset ? output.warn(`Both --api and --dataset specified, using --dataset ${dataset}`) : dataset = apiDef.dataset, tag && apiDef.tag ? output.warn(`Both --api and --tag specified, using --tag ${tag}`) : tag = apiDef.tag || "default";
  }
  let client;
  !projectId || !dataset ? (client = apiClient({
    requireUser: !0,
    requireProject: !0
  }).config({
    apiVersion: "2023-08-01"
  }), projectId = projectId || client.config().projectId, dataset = dataset || client.config().dataset) : client = apiClient({
    requireProject: !1,
    requireUser: !0
  }).config({
    projectId,
    dataset
  });
  const confirmMessage = tag === "default" ? `Are you absolutely sure you want to delete the current GraphQL API connected to the "${dataset}" dataset in project ${projectId}?` : `Are you absolutely sure you want to delete the GraphQL API connected to the "${dataset}" dataset in project ${projectId}, tagged "${tag}"?`;
  if (flags.force || await prompt.single({
    type: "confirm",
    message: confirmMessage,
    default: !1
  })) {
    projectId !== client.config().projectId && (client = client.clone().config({
      projectId
    }));
    try {
      await client.request({
        url: `/apis/graphql/${dataset}/${tag}`,
        method: "DELETE"
      });
    } catch (err) {
      throw err;
    }
    output.print("GraphQL API deleted");
  }
}
exports.default = deleteGraphQLApi;
//# sourceMappingURL=deleteApiAction.js.map
