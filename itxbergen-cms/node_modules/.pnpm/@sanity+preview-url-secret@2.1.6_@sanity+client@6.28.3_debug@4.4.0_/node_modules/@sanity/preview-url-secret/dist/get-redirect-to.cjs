"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var constants = require("./constants.cjs");
function getRedirectTo(url) {
  return url.searchParams.has(constants.urlSearchParamPreviewPathname) ? new URL(url.searchParams.get(constants.urlSearchParamPreviewPathname), url.origin) : url;
}
exports.getRedirectTo = getRedirectTo;
//# sourceMappingURL=get-redirect-to.cjs.map
