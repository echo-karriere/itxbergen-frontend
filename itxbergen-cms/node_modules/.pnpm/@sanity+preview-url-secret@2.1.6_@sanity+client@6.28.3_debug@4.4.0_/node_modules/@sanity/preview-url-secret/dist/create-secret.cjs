"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var uuid = require("@sanity/uuid"), constants = require("./constants.cjs"), generateSecret = require("./_chunks-cjs/generateSecret.cjs");
async function createPreviewSecret(_client, source, studioUrl, userId, id = uuid.uuid()) {
  const client = _client.withConfig({ apiVersion: constants.apiVersion });
  try {
    const expiresAt = new Date(Date.now() + 1e3 * constants.SECRET_TTL), _id = `drafts.${id}`, newSecret = generateSecret.generateUrlSecret(), patch = client.patch(_id).set({ secret: newSecret, source, studioUrl, userId });
    return await client.transaction().createOrReplace({ _id, _type: constants.schemaType }).patch(patch).commit({ tag: constants.tag }), { secret: newSecret, expiresAt };
  } finally {
    try {
      await client.delete({ query: constants.deleteExpiredSecretsQuery });
    } catch (err) {
      console.error("Failed to delete expired secrets", err);
    }
  }
}
exports.createPreviewSecret = createPreviewSecret;
//# sourceMappingURL=create-secret.cjs.map
