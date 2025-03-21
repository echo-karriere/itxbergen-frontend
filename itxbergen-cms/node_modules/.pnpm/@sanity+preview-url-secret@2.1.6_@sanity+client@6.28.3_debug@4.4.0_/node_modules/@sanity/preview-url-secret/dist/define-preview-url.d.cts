/**
 * @internal
 */
export declare function definePreviewUrl<SanityClientType>(
  options: PreviewUrlResolverOptions,
): PreviewUrlResolver<SanityClientType>

/**
 * @internal
 */
export declare type PreviewUrlResolver<SanityClientType> = (
  context: PreviewUrlResolverContext<SanityClientType>,
) => Promise<string>

/** @internal */
export declare interface PreviewUrlResolverContext<SanityClientType> {
  client: SanityClientType
  /**
   * A generated secret, used by `@sanity/preview-url-secret` to verify
   * that the application can securily preview draft content server side.
   * https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
   */
  previewUrlSecret: string
  /**
   * The initial perspective the Studio was using when starting to load the preview.
   * It can change over time and should also be handled with `postMessage` listeners.
   * The value can be arbitrary and has to be validated to make sure it's a valid perspective.
   */
  studioPreviewPerspective: string
  /**
   * If the user navigated to a preview path already, this will be the path
   */
  previewSearchParam?: string | null
  /**
   * If the Studio is embedded on the same origin it's necessary to know the base path of the Studio router to avoid infinite iframe embed recursion scenarios
   */
  studioBasePath?: string | null
}

/** @public */
export declare interface PreviewUrlResolverOptions {
  /**
   * Leave empty if it's on the same origin as the Studio, or set to `location.origin` explicitly if that's what you want.
   * @defaultValue `location.origin`
   */
  origin?: string
  /**
   * The default preview relative URL (pathname and search), used when the URL to use is not yet known.
   * Otherwise the path that were last used will be restored, or the path used when navigating to the tool when using the `locate` API.
   * @example '/en/preview?q=shoes'
   * @defaultValue '/'
   */
  preview?: string
  /**
   * @deprecated - use `previewMode` instead
   */
  draftMode?: {
    /**
     * @deprecated - use `previewMode.enable` instead
     */
    enable: string
    /**
     * @deprecated - use `previewMode.shareAccess` instead
     */
    shareAccess?: never
    /**
     * @deprecated - use `previewMode.check` instead
     */
    check?: string
    /**
     * @deprecated - use `previewMode.disable` instead
     */
    disable?: string
  }
  /**
   * The API routes for setting the application's "Preview Mode"
   */
  previewMode?: {
    /**
     * The route that enables Preview Mode
     * @example '/api/preview'
     */
    enable: string
    /**
     * Allow sharing access to a preview with others.
     * This is enabled/disabled in the Presentation Tool. It's initially disabled, and can be enabled by someone who has access to creating draft documents in the Studio.
     * Custom roles can limit access to `_id in path("drafts.**") && _type == "sanity.previewUrlSecret"`.
     * This will create a secret that is valid until sharing is disabled. Turning sharing off and on again will create a new secret and can be used to remove access for folks that got the link in an email but should no longer have access.
     * Share URLs to previews will append this secret and give access to anyone who is given the URL, they don't need to be logged into the Studio or to Vercel.
     */
    shareAccess?: boolean
    /**
     * The route that reports if Preview Mode is enabled or not, useful for debugging
     * @example '/api/check-preview'
     * @deprecated - this API is not yet implemented
     */
    check?: string
    /**
     * The route that disables Preview Mode, useful for debugging
     * @example '/api/disable-preview'
     * @deprecated - this API is not yet implemented
     */
    disable?: string
  }
}

export {}
