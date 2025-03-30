"use strict";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
}
var devAliases_1, hasRequiredDevAliases;
function requireDevAliases() {
  return hasRequiredDevAliases || (hasRequiredDevAliases = 1, devAliases_1 = {
    // NOTE: do not use regex in the module expressions,
    // because they will be escaped by the jest config
    "@sanity/diff": "@sanity/diff/src",
    "@sanity/cli": "@sanity/cli/src",
    "@sanity/mutator": "@sanity/mutator/src",
    "@sanity/schema": "@sanity/schema/src/_exports",
    "@sanity/migrate": "@sanity/migrate/src/_exports",
    "@sanity/types": "@sanity/types/src",
    "@sanity/util": "@sanity/util/src/_exports",
    "@sanity/vision": "@sanity/vision/src",
    sanity: "sanity/src/_exports",
    groq: "groq/src/_exports.mts"
  }), devAliases_1;
}
var devAliasesExports = requireDevAliases(), devAliases = /* @__PURE__ */ getDefaultExportFromCjs(devAliasesExports), devAliases$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: devAliases
});
exports.devAliases = devAliases$1;
//# sourceMappingURL=dev-aliases.js.map
