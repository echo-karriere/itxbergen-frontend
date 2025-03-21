/** @alpha */
export declare function hasSecretSearchParams(url: URL): boolean

/** @alpha */
export declare function setSecretSearchParams(
  url: URL,
  secret: string | null,
  redirectTo: string,
  perspective: string,
): URL

/** @alpha */
export declare function withoutSecretSearchParams(url: URL): URL

export {}
