"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const cdnUrl = "https://cdn.sanity.io", cdnUrlPattern = /^https:\/\/cdn\.sanity\./, customCdnUrlPattern = /^https:\/\/cdn\.[^/]+\/(images|files)\/[^/]+\/.*?[a-zA-Z0-9_]{24,40}.*$/, fileAssetFilenamePattern = /^([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+\.[a-z0-9]+$/, fileAssetIdPattern = /^file-([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-[a-z0-9]+$/, imageAssetFilenamePattern = /^([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})-\d+x\d+\.[a-z0-9]+$/, imageAssetIdPattern = /^image-([a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-\d+x\d+-[a-z0-9]+$/, pathPattern = /^(images|files)\/([a-z0-9]+)\/([a-z0-9][-\w]*)\//, idPattern = /^(?:image-(?:[a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-\d+x\d+-[a-z0-9]+|file-(?:[a-zA-Z0-9_]{24,40}|[a-f0-9]{40})+-[a-z0-9]+)$/, dummyProject = { projectId: "a", dataset: "b" };
class UnresolvableError extends Error {
  constructor(inputSource, message = "Failed to resolve asset ID from source") {
    super(message), this.unresolvable = !0, this.input = inputSource;
  }
}
function isUnresolvableError(err) {
  const error = err;
  return !!(error.unresolvable && "input" in error);
}
function getForgivingResolver(method) {
  return (...args) => {
    try {
      return method(...args);
    } catch (err) {
      if (isUnresolvableError(err))
        return;
      throw err;
    }
  };
}
function isObject(obj) {
  return obj !== null && !Array.isArray(obj) && typeof obj == "object";
}
function isReference(ref) {
  return isObject(ref) && typeof ref._ref == "string";
}
function isAssetIdStub(stub) {
  return isObject(stub) && typeof stub._id == "string";
}
function isAssetPathStub(stub) {
  return isObject(stub) && typeof stub.path == "string";
}
function isAssetUrlStub(stub) {
  return isObject(stub) && typeof stub.url == "string";
}
function isSanityFileAsset(src) {
  return isObject(src) && src._type === "sanity.fileAsset";
}
function isSanityImageAsset(src) {
  return isObject(src) && src._type === "sanity.imageAsset";
}
function isImageAssetId(documentId) {
  return imageAssetIdPattern.test(documentId);
}
function isFileAssetId(documentId) {
  return fileAssetIdPattern.test(documentId);
}
function isAssetId(documentId) {
  return isImageAssetId(documentId) || isFileAssetId(documentId);
}
function isAssetObjectStub(stub) {
  const item = stub;
  return isObject(item) && item.asset && typeof item.asset == "object";
}
function isCdnUrl(url) {
  return cdnUrlPattern.test(url) || customCdnUrlPattern.test(url);
}
const DEFAULT_CROP = Object.freeze({
  left: 0,
  top: 0,
  bottom: 0,
  right: 0
}), DEFAULT_HOTSPOT = Object.freeze({
  x: 0.5,
  y: 0.5,
  height: 1,
  width: 1
}), getDefaultCrop = () => ({ ...DEFAULT_CROP }), getDefaultHotspot = () => ({ ...DEFAULT_HOTSPOT }), isDefaultCrop = (crop) => {
  const { top, bottom, left, right } = crop, {
    top: defaultTop,
    bottom: defaultBottom,
    left: defaultLeft,
    right: defaultRight
  } = DEFAULT_CROP;
  return top === defaultTop && bottom === defaultBottom && left === defaultLeft && right === defaultRight;
}, isDefaultHotspot = (hotspot) => {
  const { x, y, width, height } = hotspot, { x: defaultX, y: defaultY, width: defaultWidth, height: defaultHeight } = DEFAULT_HOTSPOT;
  return x === defaultX && y === defaultY && width === defaultWidth && height === defaultHeight;
};
function buildImagePath(asset, options) {
  const projectId = options?.projectId || asset.projectId, dataset = options?.dataset || asset.dataset;
  if (!projectId || !dataset)
    throw new Error("Project details (projectId and dataset) required to resolve path for image");
  const dimensions = "metadata" in asset ? asset.metadata.dimensions : { width: asset.width, height: asset.height }, originalFilename = "originalFilename" in asset ? asset.originalFilename : void 0, { assetId, extension, vanityFilename } = asset, { width, height } = dimensions, vanity = getVanityStub(originalFilename, vanityFilename, options);
  return `images/${projectId}/${dataset}/${assetId}-${width}x${height}.${extension}${vanity}`;
}
function buildImageUrl(asset, options) {
  return `${options?.baseUrl || cdnUrl}/${buildImagePath(asset, options)}`;
}
function buildFilePath(asset, options) {
  const projectId = options?.projectId || asset.projectId, dataset = options?.dataset || asset.dataset;
  if (!projectId || !dataset)
    throw new Error("Project details (projectId and dataset) required to resolve path for file");
  const originalFilename = "originalFilename" in asset ? asset.originalFilename : void 0, { assetId, extension, vanityFilename } = asset, vanity = getVanityStub(originalFilename, vanityFilename, options);
  return `files/${projectId}/${dataset}/${assetId}.${extension}${vanity}`;
}
function buildFileUrl(asset, options) {
  return `${options?.baseUrl || cdnUrl}/${buildFilePath(asset, options)}`;
}
function hasPath(urlOrPath) {
  return pathPattern.test(tryGetUrlPath(urlOrPath) || "");
}
function tryGetAssetPath(src) {
  if (isAssetObjectStub(src))
    return tryGetAssetPath(src.asset);
  if (!isReference(src)) {
    if (typeof src == "string")
      return hasPath(src) ? getUrlPath(src) : void 0;
    if (isAssetPathStub(src))
      return src.path;
    if (isAssetUrlStub(src))
      return getUrlPath(src.url);
  }
}
function getUrlPath(url) {
  if (pathPattern.test(url))
    return url;
  if (!isCdnUrl(url))
    throw new UnresolvableError(`Failed to resolve path from URL "${url}"`);
  return new URL(url).pathname.replace(/^\/+/, "");
}
const tryGetUrlPath = getForgivingResolver(getUrlPath);
function getUrlFilename(url) {
  const filename = (tryGetUrlPath(url) || url).replace(/^(images|files)\/[a-z0-9]+\/[a-z0-9][-\w]\/*/, "");
  if (!isValidFilename(filename))
    throw new UnresolvableError(`Failed to resolve filename from URL "${url}"`);
  return filename;
}
const tryGetUrlFilename = getForgivingResolver(getUrlFilename);
function isValidFilename(filename) {
  return fileAssetFilenamePattern.test(filename) || imageAssetFilenamePattern.test(filename);
}
function getVanityStub(originalFilename, vanityFilename, options) {
  const vanity = vanityFilename || originalFilename;
  return options?.useVanityName === !1 || !vanity ? "" : `/${vanity}`;
}
const exampleFileId = "file-027401f31c3ac1e6d78c5d539ccd1beff72b9b11-pdf", exampleImageId = "image-027401f31c3ac1e6d78c5d539ccd1beff72b9b11-2000x3000-jpg";
function parseAssetId(documentId) {
  if (imageAssetIdPattern.test(documentId))
    return parseImageAssetId(documentId);
  if (fileAssetIdPattern.test(documentId))
    return parseFileAssetId(documentId);
  throw new Error(`Invalid image/file asset ID: ${documentId}`);
}
function parseFileAssetId(documentId) {
  if (!fileAssetIdPattern.test(documentId))
    throw new Error(
      `Malformed file asset ID '${documentId}'. Expected an id like "${exampleFileId}"`
    );
  const [, assetId, extension] = documentId.split("-");
  return { type: "file", assetId, extension };
}
function parseImageAssetId(documentId) {
  const [, assetId, dimensionString, extension] = documentId.split("-"), [width, height] = (dimensionString || "").split("x").map(Number);
  if (!assetId || !dimensionString || !extension || !(width > 0) || !(height > 0))
    throw new Error(`Malformed asset ID '${documentId}'. Expected an id like "${exampleImageId}".`);
  return { type: "image", assetId, width, height, extension };
}
function parseAssetFilename(filename) {
  const file = tryGetUrlFilename(filename) || "";
  if (!isValidFilename(file))
    throw new Error(`Invalid image/file asset filename: ${filename}`);
  try {
    const type = imageAssetFilenamePattern.test(file) ? "image" : "file", assetId = file.replace(/\.([a-z0-9+]+)$/i, "-$1");
    return parseAssetId(`${type}-${assetId}`);
  } catch {
    throw new Error(`Invalid image/file asset filename: ${filename}`);
  }
}
function parseAssetUrl(url) {
  if (!isCdnUrl(url))
    throw new Error(`URL is not a valid Sanity asset URL: ${url}`);
  const path = new URL(url).pathname.replace(/^\/+/, ""), [projectPath, , projectId, dataset] = path.match(pathPattern) || [];
  if (!projectPath || !projectId || !dataset)
    throw new Error(`URL is not a valid Sanity asset URL: ${url}`);
  const [filename, vanityFilename] = path.slice(projectPath.length).split("/");
  return {
    ...parseAssetFilename(filename),
    projectId,
    dataset,
    vanityFilename
  };
}
function parseImageAssetUrl(url) {
  const parsed = parseAssetUrl(url);
  if (parsed.type !== "image")
    throw new Error(`URL is not a valid Sanity image asset URL: ${url}`);
  return parsed;
}
function parseFileAssetUrl(url) {
  const parsed = parseAssetUrl(url);
  if (parsed.type !== "file")
    throw new Error(`URL is not a valid Sanity file asset URL: ${url}`);
  return parsed;
}
function getAssetUrlType(url) {
  try {
    return parseAssetUrl(url).type;
  } catch {
    return !1;
  }
}
function getImageDimensions(src) {
  const imageId = getAssetDocumentId(src), { width, height } = parseImageAssetId(imageId), aspectRatio = width / height;
  return { width, height, aspectRatio };
}
const tryGetImageDimensions = getForgivingResolver(getImageDimensions);
function getExtension(src) {
  return isFileSource(src) ? getFile(src, dummyProject).asset.extension : getImage(src, dummyProject).asset.extension;
}
const tryGetExtension = getForgivingResolver(getExtension);
function getImage(src, project) {
  const projectDetails = project || tryGetProject(src), asset = getImageAsset(src, projectDetails), img = src;
  return {
    asset,
    crop: img.crop || getDefaultCrop(),
    hotspot: img.hotspot || getDefaultHotspot()
  };
}
const tryGetImage = getForgivingResolver(getImage);
function getImageAsset(src, project) {
  const pathOptions = { ...project || getProject(src), useVanityName: !1 }, _id = getAssetDocumentId(src), metadata = (src.asset || src).metadata || {}, { assetId, width, height, extension } = parseImageAssetId(_id), aspectRatio = width / height, baseAsset = {
    ...isSanityImageAsset(src) ? src : {},
    _id,
    _type: "sanity.imageAsset",
    assetId,
    extension,
    metadata: {
      ...metadata,
      dimensions: { width, height, aspectRatio }
    },
    // Placeholders, overwritten below
    url: "",
    path: ""
  };
  return {
    ...baseAsset,
    path: buildImagePath(baseAsset, pathOptions),
    url: buildImageUrl(baseAsset, pathOptions)
  };
}
const tryGetImageAsset = getForgivingResolver(getImageAsset);
function getFile(src, project) {
  const projectDetails = project || tryGetProject(src);
  return { asset: getFileAsset(src, projectDetails) };
}
const tryGetFile = getForgivingResolver(getFile);
function getFileAsset(src, options) {
  const projectDetails = { ...options || getProject(src), useVanityName: !1 }, _id = getAssetDocumentId(src), source = src.asset || src, { assetId, extension } = parseFileAssetId(_id), baseAsset = {
    ...isSanityFileAsset(src) ? src : {},
    _id,
    _type: "sanity.fileAsset",
    assetId,
    extension,
    metadata: source.metadata || {},
    // Placeholders, overwritten below
    url: "",
    path: ""
  };
  return {
    ...baseAsset,
    path: buildFilePath(baseAsset, projectDetails),
    url: buildFileUrl(baseAsset, projectDetails)
  };
}
const tryGetFileAsset = getForgivingResolver(getFileAsset);
function getAssetDocumentId(src) {
  const source = isAssetObjectStub(src) ? src.asset : src;
  let id = "";
  if (typeof source == "string" ? id = getIdFromString(source) : isReference(source) ? id = source._ref : isAssetIdStub(source) ? id = source._id : isAssetPathStub(source) ? id = idFromUrl(`${cdnUrl}/${source.path}`) : isAssetUrlStub(source) && (id = idFromUrl(source.url)), !(id && idPattern.test(id)))
    throw new UnresolvableError(src);
  return id;
}
const tryGetAssetDocumentId = getForgivingResolver(getAssetDocumentId);
function getIdFromString(str) {
  if (idPattern.test(str))
    return str;
  const path = isCdnUrl(str) ? new URL(str).pathname : str;
  if (path.indexOf("/images") === 0 || path.indexOf("/files") === 0)
    return idFromUrl(str);
  if (pathPattern.test(str))
    return idFromUrl(`${cdnUrl}/${str}`);
  if (isFileAssetFilename(str))
    return idFromUrl(`${cdnUrl}/files/a/b/${str}`);
  if (isImageAssetFilename(str))
    return idFromUrl(`${cdnUrl}/images/a/b/${str}`);
  throw new UnresolvableError(str);
}
const tryGetIdFromString = getForgivingResolver(getIdFromString);
function idFromUrl(url) {
  const path = getUrlPath(url), [type, , , fileName] = path.split("/");
  return `${type.replace(/s$/, "")}-${fileName.replace(/\./g, "-")}`;
}
function getProject(src) {
  const path = tryGetAssetPath(src);
  if (!path)
    throw new UnresolvableError(src, "Failed to resolve project ID and dataset from source");
  const [, , projectId, dataset] = path.match(pathPattern) || [];
  if (!projectId || !dataset)
    throw new UnresolvableError(src, "Failed to resolve project ID and dataset from source");
  return { projectId, dataset };
}
const tryGetProject = getForgivingResolver(getProject);
function isImageAssetFilename(filename) {
  return imageAssetFilenamePattern.test(filename);
}
function isFileAssetFilename(filename) {
  return fileAssetFilenamePattern.test(filename);
}
function isAssetFilename(filename) {
  return isImageAssetFilename(filename) || isFileAssetFilename(filename);
}
function isFileSource(src) {
  const assetId = tryGetAssetDocumentId(src);
  return assetId ? assetId.startsWith("file-") : !1;
}
function isImageSource(src) {
  const assetId = tryGetAssetDocumentId(src);
  return assetId ? assetId.startsWith("image-") : !1;
}
function isSanityAssetUrl(url) {
  return getAssetUrlType(url) !== !1;
}
function isSanityImageUrl(url) {
  return getAssetUrlType(url) === "image";
}
function isSanityFileUrl(url) {
  return getAssetUrlType(url) === "file";
}
exports.DEFAULT_CROP = DEFAULT_CROP;
exports.DEFAULT_HOTSPOT = DEFAULT_HOTSPOT;
exports.UnresolvableError = UnresolvableError;
exports.buildFilePath = buildFilePath;
exports.buildFileUrl = buildFileUrl;
exports.buildImagePath = buildImagePath;
exports.buildImageUrl = buildImageUrl;
exports.getAssetDocumentId = getAssetDocumentId;
exports.getAssetUrlType = getAssetUrlType;
exports.getDefaultCrop = getDefaultCrop;
exports.getDefaultHotspot = getDefaultHotspot;
exports.getExtension = getExtension;
exports.getFile = getFile;
exports.getFileAsset = getFileAsset;
exports.getIdFromString = getIdFromString;
exports.getImage = getImage;
exports.getImageAsset = getImageAsset;
exports.getImageDimensions = getImageDimensions;
exports.getProject = getProject;
exports.getUrlFilename = getUrlFilename;
exports.getUrlPath = getUrlPath;
exports.getVanityStub = getVanityStub;
exports.isAssetFilename = isAssetFilename;
exports.isAssetId = isAssetId;
exports.isAssetIdStub = isAssetIdStub;
exports.isAssetObjectStub = isAssetObjectStub;
exports.isAssetPathStub = isAssetPathStub;
exports.isAssetUrlStub = isAssetUrlStub;
exports.isDefaultCrop = isDefaultCrop;
exports.isDefaultHotspot = isDefaultHotspot;
exports.isFileAssetFilename = isFileAssetFilename;
exports.isFileAssetId = isFileAssetId;
exports.isFileSource = isFileSource;
exports.isImageAssetFilename = isImageAssetFilename;
exports.isImageAssetId = isImageAssetId;
exports.isImageSource = isImageSource;
exports.isReference = isReference;
exports.isSanityAssetUrl = isSanityAssetUrl;
exports.isSanityFileAsset = isSanityFileAsset;
exports.isSanityFileUrl = isSanityFileUrl;
exports.isSanityImageAsset = isSanityImageAsset;
exports.isSanityImageUrl = isSanityImageUrl;
exports.isUnresolvableError = isUnresolvableError;
exports.isValidFilename = isValidFilename;
exports.parseAssetFilename = parseAssetFilename;
exports.parseAssetId = parseAssetId;
exports.parseAssetUrl = parseAssetUrl;
exports.parseFileAssetId = parseFileAssetId;
exports.parseFileAssetUrl = parseFileAssetUrl;
exports.parseImageAssetId = parseImageAssetId;
exports.parseImageAssetUrl = parseImageAssetUrl;
exports.tryGetAssetDocumentId = tryGetAssetDocumentId;
exports.tryGetAssetPath = tryGetAssetPath;
exports.tryGetExtension = tryGetExtension;
exports.tryGetFile = tryGetFile;
exports.tryGetFileAsset = tryGetFileAsset;
exports.tryGetIdFromString = tryGetIdFromString;
exports.tryGetImage = tryGetImage;
exports.tryGetImageAsset = tryGetImageAsset;
exports.tryGetImageDimensions = tryGetImageDimensions;
exports.tryGetProject = tryGetProject;
exports.tryGetUrlFilename = tryGetUrlFilename;
exports.tryGetUrlPath = tryGetUrlPath;
//# sourceMappingURL=index.cjs.map
