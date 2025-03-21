"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
function isObject(obj) {
  return typeof obj == "object" && obj !== null && !Array.isArray(obj);
}
function isReference(reference) {
  return isObject(reference) && typeof reference._ref == "string";
}
function isImage(value) {
  return isObject(value) && isReference(value.asset) && value.asset._ref.startsWith("image-");
}
function isCrossDatasetReference(reference) {
  return isObject(reference) && typeof reference._ref == "string" && typeof reference._dataset == "string" && typeof reference._projectId == "string";
}
function isSanityDocument(document) {
  return isObject(document) && typeof document._id == "string" && typeof document._type == "string";
}
function isTypedObject(obj) {
  return isObject(obj) && typeof obj._type == "string";
}
function isKeyedObject(obj) {
  return isObject(obj) && typeof obj._key == "string";
}
function isValidationErrorMarker(marker) {
  return marker.level === "error";
}
function isValidationWarningMarker(marker) {
  return marker.level === "warning";
}
function isValidationInfoMarker(marker) {
  return marker.level === "info";
}
function isCreateMutation(mutation) {
  return "create" in mutation;
}
function isCreateIfNotExistsMutation(mutation) {
  return "createIfNotExists" in mutation;
}
function isCreateOrReplaceMutation(mutation) {
  return "createOrReplace" in mutation;
}
function isDeleteMutation(mutation) {
  return "delete" in mutation;
}
function isPatchMutation(mutation) {
  return "patch" in mutation;
}
const reKeySegment = /_key\s*==\s*['"](.*)['"]/, reIndexTuple = /^\d*:\d*$/;
function isIndexSegment(segment) {
  return typeof segment == "number" || typeof segment == "string" && /^\[\d+\]$/.test(segment);
}
function isKeySegment(segment) {
  return typeof segment == "string" ? reKeySegment.test(segment.trim()) : typeof segment == "object" && "_key" in segment;
}
function isIndexTuple(segment) {
  if (typeof segment == "string" && reIndexTuple.test(segment))
    return !0;
  if (!Array.isArray(segment) || segment.length !== 2)
    return !1;
  const [from, to] = segment;
  return (typeof from == "number" || from === "") && (typeof to == "number" || to === "");
}
function isRecord$1(value) {
  return !!value && (typeof value == "object" || typeof value == "function");
}
function isPortableTextTextBlock(value) {
  return isRecord$1(value) && typeof value._type == "string" && // block types can be named, so expect anything here.
  Array.isArray(value.children) && value.children.every((child) => isRecord$1(child)) && ("markDefs" in value ? Array.isArray(value.markDefs) && value.markDefs.every((def) => isRecord$1(def)) : !0) && ("style" in value ? typeof value.style == "string" : !0);
}
function isPortableTextSpan(value) {
  return isRecord$1(value) && value._type === "span" && typeof value.text == "string" && ("marks" in value ? Array.isArray(value.marks) && value.marks.every((mark) => typeof mark == "string") : !0);
}
function isPortableTextListBlock(value) {
  return isPortableTextTextBlock(value) && "listItem" in value && typeof value.listItem == "string" && "level" in value && Number.isInteger(value.level);
}
function isRecord(value) {
  return !!value && (typeof value == "object" || typeof value == "function");
}
function isDocumentSchemaType(type) {
  if (!isObjectSchemaType(type))
    return !1;
  let current = type;
  for (; current; ) {
    if (current.name === "document")
      return !0;
    current = current.type;
  }
  return !1;
}
function isObjectSchemaType(type) {
  return isRecord(type) ? type.jsonType === "object" : !1;
}
function isArraySchemaType(type) {
  return isRecord(type) ? type.jsonType === "array" : !1;
}
function isArrayOfBlocksSchemaType(type) {
  return isArraySchemaType(type) && type.of.some((memberType) => isBlockSchemaType(memberType));
}
function isArrayOfObjectsSchemaType(type) {
  return isArraySchemaType(type) && type.of.every((memberType) => isObjectSchemaType(memberType));
}
function isArrayOfPrimitivesSchemaType(type) {
  return isArraySchemaType(type) && type.of.every((memberType) => isPrimitiveSchemaType(memberType));
}
function isBooleanSchemaType(type) {
  return isRecord(type) ? type.jsonType === "boolean" : !1;
}
function isStringSchemaType(type) {
  return isRecord(type) ? type.jsonType === "string" : !1;
}
function isNumberSchemaType(type) {
  return isRecord(type) ? type.jsonType === "number" : !1;
}
function isPrimitiveSchemaType(type) {
  return isBooleanSchemaType(type) || isStringSchemaType(type) || isNumberSchemaType(type);
}
function isReferenceSchemaType(type) {
  return isRecord(type) && (type.name === "reference" || isReferenceSchemaType(type.type));
}
function isImageSchemaType(type) {
  return isRecord(type) && (type.name === "image" || isImageSchemaType(type.type));
}
function isFileSchemaType(type) {
  return isRecord(type) && (type.name === "file" || isFileSchemaType(type.type));
}
function isDeprecatedSchemaType(type) {
  return isRecord(type) ? typeof type.deprecated < "u" : !1;
}
function isDeprecationConfiguration(type) {
  return isRecord(type) ? typeof type.deprecated < "u" : !1;
}
function isCrossDatasetReferenceSchemaType(type) {
  return isRecord(type) && (type.name === "crossDatasetReference" || isCrossDatasetReferenceSchemaType(type.type));
}
function isTitledListValue(item) {
  return typeof item == "object" && item !== null && "title" in item && "value" in item;
}
function isSpanSchemaType(type) {
  return isRecord(type) ? Array.isArray(type.annotations) && Array.isArray(type.decorators) : !1;
}
function isBlockSchemaType(type) {
  if (!isRecord(type) || !Array.isArray(type.fields)) return !1;
  const maybeSpanChildren = type.fields.find(isBlockChildrenObjectField), maybeStyle = type.fields.find(isBlockStyleObjectField), maybeList = type.fields.find(isBlockListObjectField);
  return isBlockChildrenObjectField(maybeSpanChildren) && isBlockStyleObjectField(maybeStyle) && isBlockListObjectField(maybeList);
}
function isBlockStyleObjectField(field) {
  return !isRecord(field) || field.name !== "style" ? !1 : isRecord(field.type) && field.type.jsonType === "string";
}
function isBlockListObjectField(field) {
  return !isRecord(field) || field.name !== "listItem" ? !1 : isRecord(field.type) && field.type.jsonType === "string";
}
function isBlockChildrenObjectField(field) {
  return !isRecord(field) || field.name !== "children" || !isArraySchemaType(field.type) ? !1 : field.type.of.some(isSpanSchemaType);
}
function defineType(schemaDefinition, defineOptions) {
  return schemaDefinition;
}
function defineField(schemaField, defineOptions) {
  return schemaField;
}
function defineArrayMember(arrayOfSchema, defineOptions) {
  return arrayOfSchema;
}
function typed(input) {
  return input;
}
const searchStrategies = ["groqLegacy", "textSearch", "groq2024"];
function isSearchStrategy(maybeSearchStrategy) {
  return searchStrategies.includes(maybeSearchStrategy);
}
function isSlug(thing) {
  return isObject(thing) && typeof thing.current == "string";
}
function isCreateSquashedMutation(mutation) {
  return "createSquashed" in mutation;
}
function isValidationError(node) {
  return node.level === "error";
}
function isValidationWarning(node) {
  return node.level === "warning";
}
function isValidationInfo(node) {
  return node.level === "info";
}
exports.defineArrayMember = defineArrayMember;
exports.defineField = defineField;
exports.defineType = defineType;
exports.isArrayOfBlocksSchemaType = isArrayOfBlocksSchemaType;
exports.isArrayOfObjectsSchemaType = isArrayOfObjectsSchemaType;
exports.isArrayOfPrimitivesSchemaType = isArrayOfPrimitivesSchemaType;
exports.isArraySchemaType = isArraySchemaType;
exports.isBlockChildrenObjectField = isBlockChildrenObjectField;
exports.isBlockListObjectField = isBlockListObjectField;
exports.isBlockSchemaType = isBlockSchemaType;
exports.isBlockStyleObjectField = isBlockStyleObjectField;
exports.isBooleanSchemaType = isBooleanSchemaType;
exports.isCreateIfNotExistsMutation = isCreateIfNotExistsMutation;
exports.isCreateMutation = isCreateMutation;
exports.isCreateOrReplaceMutation = isCreateOrReplaceMutation;
exports.isCreateSquashedMutation = isCreateSquashedMutation;
exports.isCrossDatasetReference = isCrossDatasetReference;
exports.isCrossDatasetReferenceSchemaType = isCrossDatasetReferenceSchemaType;
exports.isDeleteMutation = isDeleteMutation;
exports.isDeprecatedSchemaType = isDeprecatedSchemaType;
exports.isDeprecationConfiguration = isDeprecationConfiguration;
exports.isDocumentSchemaType = isDocumentSchemaType;
exports.isFileSchemaType = isFileSchemaType;
exports.isImage = isImage;
exports.isImageSchemaType = isImageSchemaType;
exports.isIndexSegment = isIndexSegment;
exports.isIndexTuple = isIndexTuple;
exports.isKeySegment = isKeySegment;
exports.isKeyedObject = isKeyedObject;
exports.isNumberSchemaType = isNumberSchemaType;
exports.isObjectSchemaType = isObjectSchemaType;
exports.isPatchMutation = isPatchMutation;
exports.isPortableTextListBlock = isPortableTextListBlock;
exports.isPortableTextSpan = isPortableTextSpan;
exports.isPortableTextTextBlock = isPortableTextTextBlock;
exports.isPrimitiveSchemaType = isPrimitiveSchemaType;
exports.isReference = isReference;
exports.isReferenceSchemaType = isReferenceSchemaType;
exports.isSanityDocument = isSanityDocument;
exports.isSearchStrategy = isSearchStrategy;
exports.isSlug = isSlug;
exports.isSpanSchemaType = isSpanSchemaType;
exports.isStringSchemaType = isStringSchemaType;
exports.isTitledListValue = isTitledListValue;
exports.isTypedObject = isTypedObject;
exports.isValidationError = isValidationError;
exports.isValidationErrorMarker = isValidationErrorMarker;
exports.isValidationInfo = isValidationInfo;
exports.isValidationInfoMarker = isValidationInfoMarker;
exports.isValidationWarning = isValidationWarning;
exports.isValidationWarningMarker = isValidationWarningMarker;
exports.searchStrategies = searchStrategies;
exports.typed = typed;
//# sourceMappingURL=index.js.map
