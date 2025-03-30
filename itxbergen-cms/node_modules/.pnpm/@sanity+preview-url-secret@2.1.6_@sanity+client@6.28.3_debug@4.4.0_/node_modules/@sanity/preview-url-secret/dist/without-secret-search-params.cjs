"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var constants = require("./constants.cjs");
function withoutSecretSearchParams(url) {
  const newUrl = new URL(url), { searchParams } = newUrl;
  return searchParams.delete(constants.urlSearchParamPreviewPathname), searchParams.delete(constants.urlSearchParamPreviewSecret), searchParams.delete(constants.urlSearchParamPreviewPerspective), searchParams.delete(constants.urlSearchParamVercelProtectionBypass), searchParams.delete(constants.urlSearchParamVercelSetBypassCookie), newUrl;
}
function hasSecretSearchParams(url) {
  return url.searchParams.has(constants.urlSearchParamPreviewSecret);
}
function setSecretSearchParams(url, secret, redirectTo, perspective) {
  const newUrl = new URL(url), { searchParams } = newUrl;
  return secret && (searchParams.set(constants.urlSearchParamPreviewSecret, secret), searchParams.set(constants.urlSearchParamPreviewPathname, redirectTo)), searchParams.set(constants.urlSearchParamPreviewPerspective, perspective), newUrl;
}
exports.hasSecretSearchParams = hasSecretSearchParams;
exports.setSecretSearchParams = setSecretSearchParams;
exports.withoutSecretSearchParams = withoutSecretSearchParams;
//# sourceMappingURL=without-secret-search-params.cjs.map
