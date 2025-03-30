/**
 * @public
 */
export declare interface AbsoluteRectangle {
  top: number
  left: number
  right: number
  bottom: number
}

/**
 * Builds the base file path from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the file belongs to, along with other options
 * @returns The path to the file
 * @public
 */
export declare function buildFilePath(
  asset: FileUrlBuilderOptions | SanityFileUrlParts,
  options?: PathBuilderOptions,
): string

/**
 * Builds the base file URL from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID and extension
 * @param options - Project ID and dataset the file belongs to, along with other options
 * @returns The URL to the file, as a string
 * @public
 */
export declare function buildFileUrl(
  asset: FileUrlBuilderOptions,
  options?: PathBuilderOptions,
): string

/**
 * Builds the base image path from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the image belongs to, along with other options
 * @returns The path to the image
 * @public
 */
export declare function buildImagePath(
  asset: ImageUrlBuilderOptions | SanityImageUrlParts,
  options?: PathBuilderOptions,
): string

/**
 * Builds the base image URL from the minimal set of parts required to assemble it
 *
 * @param asset - An asset-like shape defining ID, dimensions and extension
 * @param options - Project ID and dataset the image belongs to
 * @returns The URL to the image, as a string
 * @public
 */
export declare function buildImageUrl(
  asset: ImageUrlBuilderOptions | SanityImageUrlParts,
  options?: PathBuilderOptions,
): string

/**
 * Default crop (equals to "whole image")
 *
 * @public
 */
export declare const DEFAULT_CROP: Readonly<SanityImageCrop>

/**
 * Default hotspot (equals to horizontal/vertical center, full size of image)
 *
 * @public
 */
export declare const DEFAULT_HOTSPOT: Readonly<SanityImageHotspot>

/**
 * @public
 */
export declare interface FileUrlBuilderOptions extends Partial<SanityProjectDetails> {
  assetId: string
  extension: string
  /**
   * Alias of `vanityFilename` - prefers `vanityFilename` if both are set
   */
  originalFilename?: string
  /**
   * Alias of `originalFilename` - prefers `vanityFilename` if both are set
   */
  vanityFilename?: string
}

/**
 * Tries to resolve the asset document ID from any inferrable structure
 *
 * @param src - Input source (image/file object, asset, reference, id, url, path)
 * @returns The asset document ID
 *
 * @throws {@link UnresolvableError}
 * Throws if passed asset source could not be resolved to an asset document ID
 * @public
 */
export declare function getAssetDocumentId(src: unknown): string

/**
 * Validates that a given URL is a Sanity asset URL, and returns the asset type if valid.
 *
 * @param url - URL to extract asset type from
 * @returns Asset type if valid URL, false otherwise
 * @public
 */
export declare function getAssetUrlType(url: string): 'image' | 'file' | false

/**
 * Returns cloned version of the default crop (prevents accidental mutations)
 *
 * @returns Default image crop object
 * @public
 */
export declare const getDefaultCrop: () => SanityImageCrop

/**
 * Returns cloned version of the default hotspot (prevents accidental mutations)
 *
 * @returns Default image hotspot object
 * @public
 */
export declare const getDefaultHotspot: () => SanityImageHotspot

/**
 * Returns the file extension for a given asset
 *
 * @param src - Input source (file/image object, asset, reference, id, url, path)
 * @returns The file extension, if resolvable (no `.` included)
 *
 * @throws {@link UnresolvableError}
 * Throws if passed asset source could not be resolved to an asset ID
 * @public
 */
export declare function getExtension(src: SanityAssetSource): string

/**
 * Tries to resolve an file object with as much information as possible,
 * from any inferrable structure (id, url, path, file object etc)
 *
 * @param src - Input source (file object, asset, reference, id, url, path)
 * @param project - Project ID and dataset the file belongs to
 * @returns File object
 *
 * @throws {@link UnresolvableError}
 * Throws if passed file source could not be resolved to an asset ID
 * @public
 */
export declare function getFile(
  src: SanityFileSource,
  project?: SanityProjectDetails,
): ResolvedSanityFile

/**
 * Tries to resolve a (partial) file asset document with as much information as possible,
 * from any inferrable structure (id, url, path, file object etc)
 *
 * @param src - Input source (file object, asset, reference, id, url, path)
 * @param options - Project ID and dataset the file belongs to, along with other options
 * @returns File asset document
 *
 * @throws {@link UnresolvableError}
 * Throws if passed file source could not be resolved to an asset ID
 * @public
 */
export declare function getFileAsset(
  src: SanityFileSource,
  options?: PathBuilderOptions,
): SanityFileAsset

/**
 * Tries to cooerce a string (ID, URL or path) to an image asset ID
 *
 * @param str - Input string (ID, URL or path)
 * @returns string
 *
 *
 * @throws {@link UnresolvableError}
 * Throws if passed image source could not be resolved to an asset ID
 * @public
 */
export declare function getIdFromString(str: string): string

/**
 * Tries to resolve an image object with as much information as possible,
 * from any inferrable structure (id, url, path, image object etc)
 *
 * @param src - Input source (image object, asset, reference, id, url, path)
 * @param project - Project ID and dataset the image belongs to
 * @returns Image object
 *
 * @throws {@link UnresolvableError}
 * Throws if passed image source could not be resolved to an asset ID
 * @public
 */
export declare function getImage(
  src: SanityImageSource,
  project?: SanityProjectDetails,
): ResolvedSanityImage

/**
 * Tries to resolve a (partial) image asset document with as much information as possible,
 * from any inferrable structure (id, url, path, image object etc)
 *
 * @param src - Input source (image object, asset, reference, id, url, path)
 * @param project - Project ID and dataset the image belongs to
 * @returns Image asset document
 *
 * @throws {@link UnresolvableError}
 * Throws if passed image source could not be resolved to an asset ID
 * @public
 */
export declare function getImageAsset(
  src: SanityImageSource,
  project?: SanityProjectDetails,
): SanityImageAsset

/**
 * Returns the width, height and aspect ratio of a passed image asset, from any
 * inferrable structure (id, url, path, asset document, image object etc)
 *
 * @param src - Input source (image object, asset, reference, id, url, path)
 * @returns Object with width, height and aspect ratio properties
 *
 * @throws {@link UnresolvableError}
 * Throws if passed image source could not be resolved to an asset ID
 * @public
 */
export declare function getImageDimensions(src: SanityImageSource): SanityImageDimensions

/**
 * Resolves project ID and dataset the image belongs to, based on full URL or path
 * @param src - Image URL or path
 * @returns object | undefined
 *
 * @throws {@link UnresolvableError}
 * Throws if passed image source could not be resolved to an asset ID
 * @public
 */
export declare function getProject(src: SanityImageSource): SanityProjectDetails

/**
 * Strips the CDN URL, path and query params from a URL, eg:
 * `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` →
 * `filename-200x200.jpg`
 *
 * @param url - URL to get filename from
 * @returns The filename of an URL, if URL matches the CDN URL
 * @public
 * @throws If URL is not a valid Sanity asset URL
 */
export declare function getUrlFilename(url: string): string

/**
 * Strips the CDN URL and query params from a URL, eg:
 * `https://cdn.sanity.io/images/project/dataset/filename-200x200.jpg?foo=bar` →
 * `images/project/dataset/filename-200x200.jpg`
 *
 * @param url - URL to get path name from
 * @returns The path of a CDN URL
 * @public
 * @throws If URL is not a valid Sanity asset URL
 */
export declare function getUrlPath(url: string): string

/**
 * Get the "path stub" at the end of the path, if the user hasn't explicitly opted out of this behavior
 *
 * @param originalFilename - The original filename of the asset
 * @param vanityFilename - The vanity filename of the asset
 * @param options - Options to control the behavior of the path builder
 * @returns The vanity stub, if any
 * @public
 */
export declare function getVanityStub(
  originalFilename: string | undefined,
  vanityFilename: string | undefined,
  options?: PathBuilderOptions,
): string

/**
 * @public
 */
export declare interface ImageUrlBuilderOptions extends Partial<SanityProjectDetails> {
  assetId: string
  extension: string
  metadata: {
    dimensions: {
      width: number
      height: number
    }
  }
  /**
   * Alias of `vanityFilename` - prefers `vanityFilename` if both are set
   */
  originalFilename?: string
  /**
   * Alias of `originalFilename` - prefers `vanityFilename` if both are set
   */
  vanityFilename?: string
}

/**
 * Returns whether or not the passed filename is a valid file or image asset filename
 *
 * @param filename - Filename to validate
 * @returns Whether or not the filename is an asset filename
 * @public
 */
export declare function isAssetFilename(filename: string): boolean

/**
 * Checks whether or not the given document ID is a valid Sanity asset document ID (file or image)
 *
 * @param documentId - Document ID to check
 * @returns Whether or not the given document ID is a Sanity asset document ID (file or image)
 * @public
 */
export declare function isAssetId(documentId: string): boolean

/**
 * Checks whether or not the given source is an asset ID stub
 * (an object containing an `_id` property)
 *
 * @param stub - Possible asset id stub
 * @returns Whether or not the passed object is an object id stub
 * @public
 */
export declare function isAssetIdStub(stub: unknown): stub is SanityAssetIdStub

/**
 * Checks whether or not the given source is an asset object stub
 *
 * @param stub - Possible asset object stub
 * @returns Whether or not the passed object is an object stub
 * @public
 */
export declare function isAssetObjectStub(stub: unknown): stub is SanityAssetObjectStub

/**
 * Checks whether or not the given source is an asset path stub
 * (an object containing a `path` property)
 *
 * @param stub - Possible asset path stub
 * @returns Whether or not the passed object is an object path stub
 * @public
 */
export declare function isAssetPathStub(stub: unknown): stub is SanityAssetPathStub

/**
 * Checks whether or not the given source is an asset URL stub
 * (an object containing a `url` property)
 *
 * @param stub - Possible asset url stub
 * @returns Whether or not the passed object is an object url stub
 * @public
 */
export declare function isAssetUrlStub(stub: unknown): stub is SanityAssetUrlStub

/**
 * Returns whether or not the passed crop has the default values for a crop region
 *
 * @param crop - The crop to return whether or not is the default crop
 * @returns True if passed crop matches default, false otherwise
 * @public
 */
export declare const isDefaultCrop: (crop: SanityImageCrop) => boolean

/**
 * Returns whether or not the passed hotspot has the default values for a hotspot region
 *
 * @param hotspot - The hotspot to return whether or not is the default hotspot
 * @returns True if passed hotspot matches default, false otherwise
 * @public
 */
export declare const isDefaultHotspot: (hotspot: SanityImageHotspot) => boolean

/**
 * Returns whether or not the passed filename is a valid file asset filename
 *
 * @param filename - Filename to validate
 * @returns Whether or not the filename is a file asset filename
 * @public
 */
export declare function isFileAssetFilename(filename: string): boolean

/**
 * Checks whether or not the given document ID is a valid Sanity file asset document ID
 *
 * @param documentId - Document ID to check
 * @returns Whether or not the given document ID is a Sanity file asset document ID
 * @public
 */
export declare function isFileAssetId(documentId: string): boolean

/**
 * Return whether or not the passed source is a file source
 *
 * @param src - Source to check
 * @returns Whether or not the given source is a file source
 * @public
 */
export declare function isFileSource(src: unknown): src is SanityFileSource

/**
 * Returns whether or not the passed filename is a valid image asset filename
 *
 * @param filename - Filename to validate
 * @returns Whether or not the filename is an image asset filename
 * @public
 */
export declare function isImageAssetFilename(filename: string): boolean

/**
 * Checks whether or not the given document ID is a valid Sanity image asset document ID
 *
 * @param documentId - Document ID to check
 * @returns Whether or not the given document ID is a Sanity image asset document ID
 * @public
 */
export declare function isImageAssetId(documentId: string): boolean

/**
 * Return whether or not the passed source is an image source
 *
 * @param src - Source to check
 * @returns Whether or not the given source is an image source
 * @public
 */
export declare function isImageSource(src: unknown): src is SanityImageSource

/**
 * Checks whether or not the given source is a Sanity reference
 * (an object containing _ref string key)
 *
 * @param ref - Possible reference
 * @returns Whether or not the passed object is a reference
 * @public
 */
export declare function isReference(ref: unknown): ref is SanityReference

/**
 * Checks whether or not a given URL is a valid Sanity asset URL
 *
 * @param url - URL to test
 * @returns True if url is a valid Sanity asset URL, false otherwise
 * @public
 */
export declare function isSanityAssetUrl(url: string): boolean

/**
 * Checks whether or not the given source is a (partial) sanity file asset document.
 * Only checks the `_type` property, all other properties _may_ be missing
 *
 * @param src - Source to check
 * @returns Whether or not the given source is a file asset
 * @public
 */
export declare function isSanityFileAsset(src: unknown): src is SanityFileAsset

/**
 * Checks whether or not a given URL is a valid Sanity file asset URL
 *
 * @param url - URL to test
 * @returns True if url is a valid Sanity file asset URL, false otherwise
 * @public
 */
export declare function isSanityFileUrl(url: string): boolean

/**
 * Checks whether or not the given source is a (partial) sanity image asset document.
 * Only checks the `_type` property, all other properties _may_ be missing
 *
 * @param src - Source to check
 * @returns Whether or not the given source is a file asset
 * @public
 */
export declare function isSanityImageAsset(src: unknown): src is SanityImageAsset

/**
 * Checks whether or not a given URL is a valid Sanity image asset URL
 *
 * @param url - URL to test
 * @returns True if url is a valid Sanity image asset URL, false otherwise
 * @public
 */
export declare function isSanityImageUrl(url: string): boolean

/**
 * Checks whether or not an error instance is of type UnresolvableError
 *
 * @param err - Error to check for unresolvable error type
 * @returns True if the passed error instance appears to be an unresolvable error
 * @public
 */
export declare function isUnresolvableError(err: unknown): err is UnresolvableError

/**
 * Checks whether or not a given filename matches the expected Sanity asset filename pattern
 *
 * @param filename - Filename to check for validity
 * @returns Whether or not the specified filename is valid
 * @public
 */
export declare function isValidFilename(filename: string): boolean

/**
 * Parses a Sanity asset filename into individual parts (type, id, extension, width, height)
 *
 * @param filename - Filename to parse into named parts
 * @returns Object of named properties
 * @public
 * @throws If image/filename is invalid
 */
export declare function parseAssetFilename(filename: string): SanityAssetIdParts

/**
 * Parses a Sanity asset document ID into individual parts (type, id, extension, width/height etc)
 *
 * @param documentId - Document ID to parse into named parts
 * @returns Object of named properties
 * @public
 * @throws If document ID is invalid
 */
export declare function parseAssetId(documentId: string): SanityAssetIdParts

/**
 * Parses a full Sanity asset URL into individual parts
 * (type, project ID, dataset, id, extension, width, height)
 *
 * @param url - Full URL to parse into named parts
 * @returns Object of named properties
 * @public
 * @throws If URL is invalid or not a Sanity asset URL
 */
export declare function parseAssetUrl(url: string): SanityAssetUrlParts

/**
 * Parses a Sanity file asset document ID into individual parts (type, id, extension)
 *
 * @param documentId - File asset document ID to parse into named parts
 * @returns Object of named properties
 * @public
 * @throws If document ID invalid
 */
export declare function parseFileAssetId(documentId: string): SanityFileAssetIdParts

/**
 * Parses a full Sanity file asset URL into individual parts
 * (type, project ID, dataset, id, extension, width, height)
 *
 * @param url - Full URL to parse into named parts
 * @returns Object of named properties
 * @public
 * @throws If URL is invalid or not a Sanity file asset URL
 */
export declare function parseFileAssetUrl(url: string): SanityFileUrlParts

/**
 * Parses a Sanity image asset document ID into individual parts (type, id, extension, width, height)
 *
 * @param documentId - Image asset document ID to parse into named parts
 * @returns Object of named properties
 * @public
 * @throws If document ID invalid
 */
export declare function parseImageAssetId(documentId: string): SanityImageAssetIdParts

/**
 * Parses a full Sanity image asset URL into individual parts
 * (type, project ID, dataset, id, extension, width, height)
 *
 * @param url - Full URL to parse into named parts
 * @returns Object of named properties
 * @public
 * @throws If URL is invalid or not a Sanity image asset URL
 */
export declare function parseImageAssetUrl(url: string): SanityImageUrlParts

/**
 * @public
 */
export declare interface PathBuilderOptions extends Partial<SanityProjectDetails> {
  useVanityName?: boolean
}

/**
 * @public
 */
export declare interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

/**
 * @public
 */
export declare interface ResolvedSanityFile {
  _type?: string
  asset: SanityFileAsset
  [key: string]: unknown
}

/**
 * @public
 */
export declare interface ResolvedSanityImage {
  _type?: string
  asset: SanityImageAsset
  crop: SanityImageCrop
  hotspot: SanityImageHotspot
  [key: string]: unknown
}

/**
 * A "safe function" is a wrapped function that would normally throw an UnresolvableError,
 * but will instead return `undefined`. Other errors are still thrown.
 *
 * @public
 */
export declare type SafeFunction<Args extends unknown[], Return> = (
  ...args: Args
) => Return | undefined

/**
 * @public
 */
export declare interface SanityAsset {
  _id: string
  _type: string
  url: string
  path: string
  assetId: string
  extension: string
  originalFilename?: string
}

/**
 * @public
 */
export declare type SanityAssetIdParts = SanityFileAssetIdParts | SanityImageAssetIdParts

/**
 * @public
 */
export declare interface SanityAssetIdStub {
  _id: string
}

/**
 * @public
 */
export declare type SanityAssetObjectStub = SanityFileObjectStub | SanityImageObjectStub

/**
 * @public
 */
export declare interface SanityAssetPathStub {
  path: string
}

/**
 * @public
 */
export declare type SanityAssetSource = SanityFileSource | SanityImageSource

/**
 * @public
 */
export declare type SanityAssetUrlParts = SanityFileUrlParts | SanityImageUrlParts

/**
 * @public
 */
export declare interface SanityAssetUrlStub {
  url: string
}

/**
 * @public
 */
export declare type SanityFileAsset = SanityAsset & {
  _type: 'sanity.fileAsset'
  metadata: {
    [key: string]: unknown
  }
}

/**
 * @public
 */
export declare interface SanityFileAssetIdParts {
  type: 'file'
  assetId: string
  extension: string
}

/**
 * @public
 */
export declare interface SanityFileObjectStub {
  _type?: string
  asset:
    | SanityReference
    | SanityFileAsset
    | SanityAssetIdStub
    | SanityAssetPathStub
    | SanityAssetUrlStub
  [key: string]: unknown
}

/**
 * @public
 */
export declare type SanityFileSource =
  | string
  | SanityReference
  | SanityFileAsset
  | SanityAssetIdStub
  | SanityAssetUrlStub
  | SanityAssetPathStub
  | SanityFileObjectStub

/**
 * @public
 */
export declare interface SanityFileUrlParts extends SanityProjectDetails, SanityFileAssetIdParts {
  vanityFilename?: string
}

/**
 * @public
 */
export declare type SanityImageAsset = SanityAsset & {
  _type: 'sanity.imageAsset'
  metadata: SanityImageMetadata
}

/**
 * @public
 */
export declare interface SanityImageAssetIdParts {
  type: 'image'
  assetId: string
  extension: string
  width: number
  height: number
}

/**
 * @public
 */
export declare interface SanityImageCrop {
  _type?: string
  left: number
  bottom: number
  right: number
  top: number
}

/**
 * @public
 */
export declare type SanityImageDimensions = SanityImageSize & {
  aspectRatio: number
}

/**
 * @public
 */
export declare interface SanityImageFitResult {
  width?: number
  height?: number
  rect: Rectangle
}

/**
 * @public
 */
export declare interface SanityImageHotspot {
  _type?: string
  width: number
  height: number
  x: number
  y: number
}

/**
 * @public
 */
export declare interface SanityImageMetadata {
  dimensions: SanityImageDimensions
  lqip?: string
  blurHash?: string
  palette?: SanityImagePalette
  [key: string]: unknown
}

/**
 * @public
 */
export declare interface SanityImageObjectStub {
  _type?: string
  asset:
    | SanityReference
    | SanityImageAsset
    | SanityAssetIdStub
    | SanityAssetPathStub
    | SanityAssetUrlStub
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  [key: string]: unknown
}

/**
 * @public
 */
export declare interface SanityImagePalette {
  _type?: string
  darkMuted?: SanityImageSwatch
  darkVibrant?: SanityImageSwatch
  dominant?: SanityImageSwatch
  lightMuted?: SanityImageSwatch
  lightVibrant?: SanityImageSwatch
  muted?: SanityImageSwatch
  vibrant?: SanityImageSwatch
  [key: string]: unknown
}

/**
 * @public
 */
export declare interface SanityImageSize {
  height: number
  width: number
}

/**
 * @public
 */
export declare type SanityImageSource =
  | string
  | SanityReference
  | SanityImageAsset
  | SanityAssetIdStub
  | SanityAssetUrlStub
  | SanityAssetPathStub
  | SanityImageObjectStub

/**
 * @public
 */
export declare interface SanityImageSwatch {
  background: string
  foreground: string
  population: number
  title?: string
}

/**
 * @public
 */
export declare interface SanityImageUrlParts extends SanityProjectDetails, SanityImageAssetIdParts {
  vanityFilename?: string
}

/**
 * @public
 */
export declare interface SanityProjectDetails {
  projectId: string
  dataset: string
  baseUrl?: string
}

/**
 * @public
 */
export declare interface SanityReference {
  _ref: string
  _weak?: boolean
}

/**
 * @public
 */
export declare type SanitySwatchName =
  | 'darkMuted'
  | 'darkVibrant'
  | 'dominant'
  | 'lightMuted'
  | 'lightVibrant'
  | 'muted'
  | 'vibrant'

/**
 * {@inheritDoc getAssetDocumentId}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetAssetDocumentId: SafeFunction<[src: unknown], string>

/**
 * Tries to get the asset path from a given asset source
 *
 * @param src - The source image to infer an asset path from
 * @returns A path if resolvable, undefined otherwise
 * @public
 */
export declare function tryGetAssetPath(src: SanityAssetSource): string | undefined

/**
 * {@inheritDoc getExtension}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetExtension: SafeFunction<[src: SanityAssetSource], string>

/**
 * {@inheritDoc getFile}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetFile: SafeFunction<
  [src: SanityFileSource, project?: SanityProjectDetails | undefined],
  ResolvedSanityFile
>

/**
 * {@inheritDoc getFileAsset}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetFileAsset: SafeFunction<
  [src: SanityFileSource, options?: PathBuilderOptions | undefined],
  SanityFileAsset
>

/**
 * {@inheritDoc getIdFromString}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetIdFromString: SafeFunction<[str: string], string>

/**
 * {@inheritDoc getImage}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetImage: SafeFunction<
  [src: SanityImageSource, project?: SanityProjectDetails | undefined],
  ResolvedSanityImage
>

/**
 * {@inheritDoc getImageAsset}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetImageAsset: SafeFunction<
  [src: SanityImageSource, project?: SanityProjectDetails | undefined],
  SanityImageAsset
>

/**
 * {@inheritDoc getImageDimensions}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetImageDimensions: SafeFunction<
  [src: SanityImageSource],
  SanityImageDimensions
>

/**
 * {@inheritDoc getProject}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetProject: SafeFunction<[src: SanityImageSource], SanityProjectDetails>

/**
 * {@inheritDoc getUrlFilename}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetUrlFilename: SafeFunction<[url: string], string>

/**
 * {@inheritDoc getUrlPath}
 * @returns Returns `undefined` instead of throwing if a value cannot be resolved
 * @public
 */
export declare const tryGetUrlPath: SafeFunction<[url: string], string>

/**
 * Error type thrown when the library fails to resolve a value, such as an asset ID,
 * filename or project ID/dataset information.
 *
 * The `input` property holds the value passed as the input, which failed to be
 * resolved to something meaningful.
 *
 * @public
 */
export declare class UnresolvableError extends Error {
  unresolvable: boolean
  input?: unknown
  constructor(inputSource: unknown, message?: string)
}

export {}
