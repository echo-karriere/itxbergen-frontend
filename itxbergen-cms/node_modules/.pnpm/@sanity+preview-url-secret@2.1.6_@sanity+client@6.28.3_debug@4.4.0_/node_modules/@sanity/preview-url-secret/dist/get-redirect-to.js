import { urlSearchParamPreviewPathname } from "./constants.js";
function getRedirectTo(url) {
  return url.searchParams.has(urlSearchParamPreviewPathname) ? new URL(url.searchParams.get(urlSearchParamPreviewPathname), url.origin) : url;
}
export {
  getRedirectTo
};
//# sourceMappingURL=get-redirect-to.js.map
