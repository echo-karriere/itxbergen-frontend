import { apiVersion, urlSearchParamPreviewSecret, urlSearchParamPreviewPerspective, urlSearchParamPreviewPathname, urlSearchParamVercelProtectionBypass, urlSearchParamVercelSetBypassCookie, fetchSecretQuery, fetchSharedAccessSecretQuery, tag, isDev } from "./constants.js";
function createClientWithConfig(client) {
  if (!client)
    throw new TypeError("`client` is required");
  if (!client.config().token)
    throw new TypeError("`client` must have a `token` specified");
  return client.withConfig({
    perspective: "raw",
    // Userland might be using an API version that's too old to use perspectives
    apiVersion,
    // We can't use the CDN, the secret is typically validated right after it's created
    useCdn: !1,
    // Don't waste time returning a source map, we don't need it
    resultSourceMap: !1,
    // @ts-expect-error - If stega is enabled, make sure it's disabled
    stega: !1
  });
}
function parsePreviewUrl(unsafeUrl) {
  const url = new URL(unsafeUrl, "http://localhost"), secret = url.searchParams.get(urlSearchParamPreviewSecret);
  if (!secret)
    throw new Error("Missing secret");
  const studioPreviewPerspective = url.searchParams.get(urlSearchParamPreviewPerspective);
  let redirectTo;
  const unsafeRedirectTo = url.searchParams.get(urlSearchParamPreviewPathname);
  if (unsafeRedirectTo) {
    const redirectUrl = new URL(unsafeRedirectTo, "http://localhost");
    studioPreviewPerspective && !redirectUrl.searchParams.has(urlSearchParamPreviewPerspective) && redirectUrl.searchParams.set(urlSearchParamPreviewPerspective, studioPreviewPerspective), url.searchParams.has(urlSearchParamVercelProtectionBypass) && (redirectUrl.searchParams.set(
      urlSearchParamVercelProtectionBypass,
      url.searchParams.get(urlSearchParamVercelProtectionBypass)
    ), redirectUrl.searchParams.set(
      urlSearchParamVercelSetBypassCookie,
      "samesitenone"
    ));
    const { pathname, search, hash } = redirectUrl;
    redirectTo = `${pathname}${search}${hash}`;
  }
  return { secret, redirectTo, studioPreviewPerspective };
}
async function validateSecret(client, secret, disableCacheNoStore) {
  if (typeof EdgeRuntime < "u" && await new Promise((resolve) => setTimeout(resolve, 300)), !secret || !secret.trim())
    return { isValid: !1, studioUrl: null };
  const { private: privateSecret, public: publicSecret } = await client.fetch(
    `{
      "private": ${fetchSecretQuery},
      "public": ${fetchSharedAccessSecretQuery}
    }`,
    { secret },
    {
      tag,
      // In CloudFlare Workers we can't pass the cache header
      ...disableCacheNoStore ? void 0 : { cache: "no-store" }
    }
  );
  return privateSecret ? !privateSecret?._id || !privateSecret?._updatedAt || !privateSecret?.secret ? { isValid: !1, studioUrl: null } : { isValid: secret === privateSecret.secret, studioUrl: privateSecret.studioUrl } : publicSecret?.secret ? { isValid: secret === publicSecret.secret, studioUrl: publicSecret.studioUrl } : { isValid: !1, studioUrl: null };
}
async function validatePreviewUrl(_client, previewUrl, disableCacheNoStore = globalThis.navigator?.userAgent === "Cloudflare-Workers") {
  const client = createClientWithConfig(_client);
  let parsedPreviewUrl;
  try {
    parsedPreviewUrl = parsePreviewUrl(previewUrl);
  } catch (error) {
    return isDev && console.error("Failed to parse preview URL", error, {
      previewUrl,
      client
    }), { isValid: !1 };
  }
  const { isValid, studioUrl } = await validateSecret(
    client,
    parsedPreviewUrl.secret,
    disableCacheNoStore
  ), redirectTo = isValid ? parsedPreviewUrl.redirectTo : void 0, studioPreviewPerspective = isValid ? parsedPreviewUrl.studioPreviewPerspective : void 0;
  let studioOrigin;
  if (isValid)
    try {
      studioOrigin = new URL(studioUrl).origin;
    } catch (error) {
      isDev && console.error("Failed to parse studioUrl", error, {
        previewUrl,
        studioUrl
      });
    }
  return { isValid, redirectTo, studioOrigin, studioPreviewPerspective };
}
export {
  urlSearchParamPreviewPathname,
  urlSearchParamPreviewSecret,
  validatePreviewUrl
};
//# sourceMappingURL=index.js.map
