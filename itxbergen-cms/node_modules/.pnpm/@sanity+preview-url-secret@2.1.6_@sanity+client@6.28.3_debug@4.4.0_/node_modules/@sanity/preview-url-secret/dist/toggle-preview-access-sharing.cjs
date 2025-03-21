"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var constants = require("./constants.cjs"), generateSecret = require("./_chunks-cjs/generateSecret.cjs");
async function enablePreviewAccessSharing(_client, source, studioUrl, userId) {
  const client = _client.withConfig({ apiVersion: constants.apiVersion }), newSecret = generateSecret.generateUrlSecret(), patch = client.patch(constants.schemaIdSingleton).set({ secret: newSecret, studioUrl, userId });
  return await client.transaction().createIfNotExists({ _id: constants.schemaIdSingleton, _type: constants.schemaTypeSingleton, source, studioUrl, userId }).patch(patch).commit({ tag: constants.tag }), { secret: newSecret };
}
async function disablePreviewAccessSharing(_client, source, studioUrl, userId) {
  const client = _client.withConfig({ apiVersion: constants.apiVersion }), patch = client.patch(constants.schemaIdSingleton).set({ secret: null, studioUrl, userId });
  await client.transaction().createIfNotExists({ _id: constants.schemaIdSingleton, _type: constants.schemaTypeSingleton, source, studioUrl, userId }).patch(patch).commit({ tag: constants.tag });
}
exports.disablePreviewAccessSharing = disablePreviewAccessSharing;
exports.enablePreviewAccessSharing = enablePreviewAccessSharing;
//# sourceMappingURL=toggle-preview-access-sharing.cjs.map
