import { urlSearchParamPreviewPathname, urlSearchParamPreviewSecret, urlSearchParamPreviewPerspective, urlSearchParamVercelProtectionBypass, urlSearchParamVercelSetBypassCookie } from "./constants.js";
function withoutSecretSearchParams(url) {
  const newUrl = new URL(url), { searchParams } = newUrl;
  return searchParams.delete(urlSearchParamPreviewPathname), searchParams.delete(urlSearchParamPreviewSecret), searchParams.delete(urlSearchParamPreviewPerspective), searchParams.delete(urlSearchParamVercelProtectionBypass), searchParams.delete(urlSearchParamVercelSetBypassCookie), newUrl;
}
function hasSecretSearchParams(url) {
  return url.searchParams.has(urlSearchParamPreviewSecret);
}
function setSecretSearchParams(url, secret, redirectTo, perspective) {
  const newUrl = new URL(url), { searchParams } = newUrl;
  return secret && (searchParams.set(urlSearchParamPreviewSecret, secret), searchParams.set(urlSearchParamPreviewPathname, redirectTo)), searchParams.set(urlSearchParamPreviewPerspective, perspective), newUrl;
}
export {
  hasSecretSearchParams,
  setSecretSearchParams,
  withoutSecretSearchParams
};
//# sourceMappingURL=without-secret-search-params.js.map
