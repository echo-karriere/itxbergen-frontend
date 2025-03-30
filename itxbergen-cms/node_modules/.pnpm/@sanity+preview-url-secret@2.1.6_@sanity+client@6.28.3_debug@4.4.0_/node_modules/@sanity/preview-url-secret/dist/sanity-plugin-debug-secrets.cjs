"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var sanity = require("sanity"), constants = require("./constants.cjs"), icons = require("@sanity/icons");
const debugUrlSecretsType = sanity.defineType({
  type: "document",
  icon: icons.LockIcon,
  name: constants.schemaType,
  title: "@sanity/preview-url-secret",
  readOnly: !0,
  fields: [
    {
      type: "string",
      name: "secret",
      title: "Secret"
    },
    {
      type: "string",
      name: "source",
      title: "Source Tool"
    },
    {
      type: "string",
      name: "studioUrl",
      title: "Studio URL"
    },
    {
      type: "string",
      name: "userId",
      title: "Sanity User ID"
    }
  ],
  preview: {
    select: {
      source: "source",
      studioUrl: "studioUrl",
      updatedAt: "_updatedAt"
    },
    prepare(data) {
      const url = data.studioUrl ? new URL(data.studioUrl, location.origin) : void 0, updatedAt = new Date(data.updatedAt).getTime(), expiresAt = new Date(updatedAt + 1e3 * constants.SECRET_TTL), expired = expiresAt < /* @__PURE__ */ new Date(), icon = expired ? icons.CloseCircleIcon : icons.CheckmarkCircleIcon;
      return {
        title: url ? `${url.host}${url.pathname}` : data.source,
        subtitle: expired ? "Expired" : `Expires in ${Math.round((expiresAt.getTime() - Date.now()) / (1e3 * 60))} minutes`,
        media: icon
      };
    }
  }
}), debugSecrets = sanity.definePlugin(() => ({
  name: "sanity-plugin-debug-secrets",
  schema: {
    types: [debugUrlSecretsType]
  },
  document: {
    actions: (prev, context) => context.schemaType !== constants.schemaType ? prev : prev.filter(({ action }) => action === "delete"),
    inspectors: (prev, context) => context.documentType !== constants.schemaType ? prev : [],
    unstable_fieldActions: (prev, context) => context.schemaType.name !== constants.schemaType ? prev : []
  }
}));
exports.debugSecrets = debugSecrets;
//# sourceMappingURL=sanity-plugin-debug-secrets.cjs.map
