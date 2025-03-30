import { uuid } from "@sanity/uuid";
import { apiVersion, SECRET_TTL, schemaType, tag, deleteExpiredSecretsQuery } from "./constants.js";
import { generateUrlSecret } from "./_chunks-es/generateSecret.js";
async function createPreviewSecret(_client, source, studioUrl, userId, id = uuid()) {
  const client = _client.withConfig({ apiVersion });
  try {
    const expiresAt = new Date(Date.now() + 1e3 * SECRET_TTL), _id = `drafts.${id}`, newSecret = generateUrlSecret(), patch = client.patch(_id).set({ secret: newSecret, source, studioUrl, userId });
    return await client.transaction().createOrReplace({ _id, _type: schemaType }).patch(patch).commit({ tag }), { secret: newSecret, expiresAt };
  } finally {
    try {
      await client.delete({ query: deleteExpiredSecretsQuery });
    } catch (err) {
      console.error("Failed to delete expired secrets", err);
    }
  }
}
export {
  createPreviewSecret
};
//# sourceMappingURL=create-secret.js.map
