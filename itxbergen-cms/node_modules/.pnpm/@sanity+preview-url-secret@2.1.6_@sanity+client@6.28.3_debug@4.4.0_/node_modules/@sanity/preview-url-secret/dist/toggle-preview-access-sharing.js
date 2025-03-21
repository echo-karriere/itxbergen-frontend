import { apiVersion, schemaIdSingleton, schemaTypeSingleton, tag } from "./constants.js";
import { generateUrlSecret } from "./_chunks-es/generateSecret.js";
async function enablePreviewAccessSharing(_client, source, studioUrl, userId) {
  const client = _client.withConfig({ apiVersion }), newSecret = generateUrlSecret(), patch = client.patch(schemaIdSingleton).set({ secret: newSecret, studioUrl, userId });
  return await client.transaction().createIfNotExists({ _id: schemaIdSingleton, _type: schemaTypeSingleton, source, studioUrl, userId }).patch(patch).commit({ tag }), { secret: newSecret };
}
async function disablePreviewAccessSharing(_client, source, studioUrl, userId) {
  const client = _client.withConfig({ apiVersion }), patch = client.patch(schemaIdSingleton).set({ secret: null, studioUrl, userId });
  await client.transaction().createIfNotExists({ _id: schemaIdSingleton, _type: schemaTypeSingleton, source, studioUrl, userId }).patch(patch).commit({ tag });
}
export {
  disablePreviewAccessSharing,
  enablePreviewAccessSharing
};
//# sourceMappingURL=toggle-preview-access-sharing.js.map
