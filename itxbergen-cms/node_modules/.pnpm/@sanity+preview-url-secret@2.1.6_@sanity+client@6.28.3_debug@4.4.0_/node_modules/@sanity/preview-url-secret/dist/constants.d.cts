/** @internal */
export declare const apiVersion = '2025-02-19'

/** @internal */
export declare const deleteExpiredSecretsQuery: `*[_type == "sanity.previewUrlSecret" && dateTime(_updatedAt) <= dateTime(now()) - ${number}]`

/** @internal */
export declare const fetchSecretQuery: `*[_type == "sanity.previewUrlSecret" && secret == $secret && dateTime(_updatedAt) > dateTime(now()) - ${number}][0]{
_id,
_updatedAt,
secret,
studioUrl,
}`

/** @internal */
export declare const fetchSharedAccessQuery: '*[_id == "sanity-preview-url-secret.share-access" && _type == "sanity.previewUrlShareAccess"][0].secret'

/** @internal */
export declare const fetchSharedAccessSecretQuery: '*[_id == "sanity-preview-url-secret.share-access" && _type == "sanity.previewUrlShareAccess" && secret == $secret][0]{\n  secret,\n  studioUrl,\n}'

/** @internal */
export declare const fetchVercelProtectionBypassSecret: '*[_id == "sanity-preview-url-secret.vercel-protection-bypass" && _type == "sanity.vercelProtectionBypass"][0].secret'

/** @internal */
export declare const isDev: boolean

/** @internal */
export declare const perspectiveCookieName = 'sanity-preview-perspective'

/** @internal */
export declare const schemaIdPrefix = 'sanity-preview-url-secret'

/** @internal */
export declare const schemaIdSingleton: 'sanity-preview-url-secret.share-access'

/** @internal */
export declare const schemaType = 'sanity.previewUrlSecret'

/** @internal */
export declare const schemaTypeSingleton = 'sanity.previewUrlShareAccess'

/**
 * updated within the hour, if it's older it'll create a new secret or return null
 * @internal
 */
export declare const SECRET_TTL: number

/**
 * Used for tagging `client.fetch` queries
 * @internal
 */
export declare const tag: 'sanity.preview-url-secret'

/** @internal */
export declare const urlSearchParamPreviewPathname = 'sanity-preview-pathname'

/** @internal */
export declare const urlSearchParamPreviewPerspective = 'sanity-preview-perspective'

/** @internal */
export declare const urlSearchParamPreviewSecret = 'sanity-preview-secret'

/** @internal */
export declare const urlSearchParamVercelProtectionBypass = 'x-vercel-protection-bypass'

/** @internal */
export declare const urlSearchParamVercelSetBypassCookie = 'x-vercel-set-bypass-cookie'

/** @internal */
export declare const vercelProtectionBypassSchemaId: 'sanity-preview-url-secret.vercel-protection-bypass'

/** @internal */
export declare const vercelProtectionBypassSchemaType = 'sanity.vercelProtectionBypass'

/**
 * @see https://vercel.com/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#advanced-configuration
 * @internal
 */
export declare type VercelSetBypassCookieValue = 'samesitenone' | 'true'

export {}
