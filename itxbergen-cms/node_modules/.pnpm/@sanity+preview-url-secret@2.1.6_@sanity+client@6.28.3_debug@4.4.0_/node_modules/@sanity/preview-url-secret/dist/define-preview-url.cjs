"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var constants = require("./constants.cjs");
function definePreviewUrl(options) {
  const {
    draftMode,
    previewMode,
    origin = typeof location > "u" ? "https://localhost" : location.origin
  } = options, enableUrl = previewMode?.enable || draftMode?.enable;
  let { preview = "/" } = options;
  const productionUrl = new URL(preview, origin), enablePreviewModeUrl = enableUrl ? new URL(enableUrl, origin) : void 0;
  return async (context) => {
    try {
      if (context.previewSearchParam) {
        const restoredUrl = new URL(context.previewSearchParam, productionUrl);
        restoredUrl.origin === productionUrl.origin && (preview = `${restoredUrl.pathname}${restoredUrl.search}`);
      }
    } catch {
    }
    typeof location < "u" && location.origin === productionUrl.origin && context.studioBasePath && (preview.startsWith(`${context.studioBasePath}/`) || preview === context.studioBasePath) && (preview = options.preview || "/");
    const previewUrl = new URL(preview, productionUrl);
    if (enablePreviewModeUrl) {
      const enablePreviewModeRequestUrl = new URL(enablePreviewModeUrl), { searchParams } = enablePreviewModeRequestUrl;
      return searchParams.set(constants.urlSearchParamPreviewSecret, context.previewUrlSecret), searchParams.set(constants.urlSearchParamPreviewPerspective, context.studioPreviewPerspective), previewUrl.pathname !== enablePreviewModeRequestUrl.pathname && searchParams.set(
        constants.urlSearchParamPreviewPathname,
        `${previewUrl.pathname}${previewUrl.search}`
      ), enablePreviewModeRequestUrl.toString();
    }
    return previewUrl.toString();
  };
}
exports.definePreviewUrl = definePreviewUrl;
//# sourceMappingURL=define-preview-url.cjs.map
