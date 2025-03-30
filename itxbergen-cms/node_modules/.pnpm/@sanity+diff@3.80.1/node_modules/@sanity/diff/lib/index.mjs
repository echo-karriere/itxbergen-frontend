import { cleanupSemantic, makeDiff, DIFF_INSERT, DIFF_DELETE, DIFF_EQUAL } from "@sanity/diff-match-patch";
function replaceProperty(parent, prop, value) {
  return delete parent[prop], parent[prop] = value, value;
}
function getLongestCommonSubsequence(previous, next) {
  const matrix = getLengthMatrix(previous, next);
  return backtrack(matrix, previous, next);
}
function getLengthMatrix(previous, next) {
  const len1 = previous.length, len2 = next.length;
  let x = 0, y = 0;
  const matrix = new Array(len1 + 1);
  for (x = 0; x < len1 + 1; x++)
    for (matrix[x] = [len2 + 1], y = 0; y < len2 + 1; y++)
      matrix[x][y] = 0;
  for (x = 1; x < len1 + 1; x++)
    for (y = 1; y < len2 + 1; y++)
      previous[x - 1] === next[y - 1] ? matrix[x][y] = matrix[x - 1][y - 1] + 1 : matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);
  return matrix;
}
function backtrack(matrix, previous, next) {
  let prevIndex = previous.length, nextIndex = next.length;
  const subsequence = {
    sequence: [],
    prevIndices: [],
    nextIndices: []
  };
  for (; prevIndex !== 0 && nextIndex !== 0; )
    if (previous[prevIndex - 1] === next[nextIndex - 1])
      subsequence.sequence.unshift(previous[prevIndex - 1]), subsequence.prevIndices.unshift(prevIndex - 1), subsequence.nextIndices.unshift(nextIndex - 1), --prevIndex, --nextIndex;
    else {
      const valueAtMatrixAbove = matrix[prevIndex][nextIndex - 1], valueAtMatrixLeft = matrix[prevIndex - 1][nextIndex];
      valueAtMatrixAbove > valueAtMatrixLeft ? --nextIndex : --prevIndex;
    }
  return subsequence;
}
function diffArray(fromInput, toInput, options) {
  if (fromInput === toInput) {
    const fromValue = fromInput.value, toValue = toInput.value;
    return {
      type: "array",
      action: "unchanged",
      isChanged: !1,
      fromValue,
      toValue,
      get items() {
        const items2 = diffExactByPosition(fromInput, toInput, options);
        if (!items2) throw new Error("invariant broken: equivalent input, but diff detected");
        return replaceProperty(this, "items", items2);
      }
    };
  }
  const keyedA = indexByKey(fromInput), keyedB = indexByKey(toInput);
  if (keyedA && keyedB)
    return diffArrayByKey(fromInput, keyedA, toInput, keyedB);
  const items = diffExactByPosition(fromInput, toInput, options);
  return items ? buildArrayDiff(fromInput, toInput, items, !1) : diffArrayByReinsert(fromInput, toInput);
}
function buildArrayDiff(fromInput, toInput, items, isChanged) {
  const fromValue = fromInput.value, toValue = toInput.value;
  return isChanged ? {
    type: "array",
    action: "changed",
    isChanged: !0,
    fromValue,
    toValue,
    items,
    annotation: toInput.annotation
  } : {
    type: "array",
    action: "unchanged",
    isChanged: !1,
    fromValue,
    toValue,
    items
  };
}
function diffExactByPosition(fromInput, toInput, options) {
  if (fromInput.length !== toInput.length)
    return;
  const items = [];
  for (let idx = 0; idx < fromInput.length; idx++) {
    const diff = diffInput(fromInput.at(idx), toInput.at(idx), options);
    if (diff.isChanged)
      return;
    items.push({
      fromIndex: idx,
      toIndex: idx,
      hasMoved: !1,
      diff,
      annotation: toInput.annotationAt(idx)
    });
  }
  return items;
}
function diffArrayByReinsert(fromInput, toInput, options) {
  const items = [];
  for (let idx = 0; idx < toInput.length; idx++) {
    const input = toInput.at(idx);
    items.push({
      fromIndex: void 0,
      toIndex: idx,
      hasMoved: !1,
      diff: addedInput(input, void 0),
      annotation: input.annotation
    });
  }
  for (let idx = 0; idx < fromInput.length; idx++) {
    const input = fromInput.at(idx);
    items.push({
      fromIndex: idx,
      toIndex: void 0,
      hasMoved: !1,
      diff: removedInput(input, void 0),
      annotation: input.annotation
    });
  }
  return buildArrayDiff(fromInput, toInput, items, !0);
}
function diffArrayByKey(fromArray, fromKeyIndex, toArray, toKeyIndex, options) {
  const items = [];
  let isChanged = !1;
  function diffCommon(key, fromIndex, toIndex, hasMoved) {
    deletePositionInIndex(fromKeyIndex.index, key, fromIndex), deletePositionInIndex(toKeyIndex.index, key, toIndex);
    const fromInput = fromArray.at(fromIndex), toInput = toArray.at(toIndex), diff = diffInput(fromInput, toInput);
    items.push({
      fromIndex,
      toIndex,
      hasMoved,
      diff,
      annotation: toArray.annotationAt(toIndex)
    }), (diff.isChanged || fromIndex !== toIndex) && (isChanged = !0);
  }
  const lcs = getLongestCommonSubsequence(fromKeyIndex.keys, toKeyIndex.keys);
  for (let fromIndex = 0; fromIndex < fromKeyIndex.keys.length; fromIndex++) {
    const key = fromKeyIndex.keys[fromIndex], subsequenceIdx = lcs.prevIndices.indexOf(fromIndex);
    if (subsequenceIdx !== -1) {
      diffCommon(key, fromIndex, lcs.nextIndices[subsequenceIdx], !1);
      continue;
    }
    const toIndexes = toKeyIndex.index.get(key), toIndex = toIndexes && toIndexes.find((idx) => !lcs.nextIndices.includes(idx));
    if (toIndex !== void 0) {
      diffCommon(key, fromIndex, toIndex, !0);
      continue;
    }
    const input = fromArray.at(fromIndex);
    items.push({
      fromIndex,
      toIndex: void 0,
      hasMoved: !1,
      diff: removedInput(input, void 0),
      annotation: fromArray.annotationAt(fromIndex)
    }), isChanged = !0;
  }
  for (const positions of toKeyIndex.index.values()) {
    for (const toIndex of positions) {
      const input = toArray.at(toIndex);
      items.push({
        fromIndex: void 0,
        toIndex,
        hasMoved: !1,
        diff: addedInput(input, void 0),
        annotation: toArray.annotationAt(toIndex)
      });
    }
    isChanged = !0;
  }
  return items.sort(compareItemDiff), buildArrayDiff(fromArray, toArray, items, isChanged);
}
function compareItemDiff(a, b) {
  if (a.toIndex !== void 0 && b.toIndex !== void 0)
    return a.toIndex - b.toIndex;
  if (a.fromIndex !== void 0 && b.fromIndex !== void 0)
    return a.fromIndex - b.fromIndex;
  if (a.fromIndex !== void 0 && b.toIndex !== void 0)
    return -1;
  if (a.toIndex !== void 0 && b.fromIndex !== void 0)
    return 1;
  throw new Error("invalid item diff comparison");
}
function deletePositionInIndex(index, key, pos) {
  const positions = index.get(key);
  deleteArrayValue(positions, pos), positions.length === 0 && index.delete(key);
}
function deleteArrayValue(arr, value) {
  const idx = arr.indexOf(value);
  if (idx === -1) throw new Error("value not found");
  arr.splice(idx, 1);
}
function indexByKey(arr) {
  const index = /* @__PURE__ */ new Map(), keys = [], length = arr.length;
  for (let i = 0; i < length; i++) {
    const item = arr.at(i);
    let key = null;
    switch (item.type) {
      case "string":
        key = `s${item.value}`;
        break;
      case "number":
        key = item.value;
        break;
      case "boolean":
        key = item.value;
        break;
      case "null":
        key = "n";
        break;
      case "object":
        {
          const keyField = item.get("_key");
          if (keyField && keyField.type === "string" && (key = `k${keyField.value}`, index.has(key)))
            return;
        }
        break;
    }
    if (key === null) return;
    keys.push(key);
    let positions = index.get(key);
    positions || (positions = [], index.set(key, positions)), positions.push(i);
  }
  return { keys, index };
}
function removedArray(input, toValue, options) {
  return {
    type: "array",
    action: "removed",
    isChanged: !0,
    fromValue: input.value,
    toValue,
    annotation: input.annotation,
    get items() {
      const items = [];
      for (let i = 0; i < input.length; i++) {
        const item = input.at(i);
        items.push({
          fromIndex: i,
          toIndex: void 0,
          hasMoved: !1,
          diff: removedInput(item, void 0),
          annotation: input.annotationAt(i)
        });
      }
      return replaceProperty(this, "items", items);
    }
  };
}
function addedArray(input, fromValue, options) {
  return {
    type: "array",
    action: "added",
    isChanged: !0,
    fromValue,
    toValue: input.value,
    annotation: input.annotation,
    get items() {
      const items = [];
      for (let i = 0; i < input.length; i++) {
        const item = input.at(i);
        items.push({
          fromIndex: void 0,
          toIndex: i,
          hasMoved: !1,
          diff: addedInput(item, void 0),
          annotation: input.annotationAt(i)
        });
      }
      return replaceProperty(this, "items", items);
    }
  };
}
const ignoredFields = /* @__PURE__ */ new Set(["_id", "_type", "_createdAt", "_updatedAt", "_rev", "_weak"]);
function diffObject(fromInput, toInput, options) {
  const fields = {};
  let isChanged = !1;
  for (const key of fromInput.keys) {
    if (ignoredFields.has(key)) continue;
    const fromField = fromInput.get(key), toField = toInput.get(key);
    if (toField) {
      const fieldDiff = diffInput(fromField, toField, options);
      fields[key] = fieldDiff, fieldDiff.isChanged && (isChanged = !0);
    } else
      fields[key] = removedInput(fromField, void 0), isChanged = !0;
  }
  for (const key of toInput.keys) {
    if (ignoredFields.has(key) || fromInput.get(key)) continue;
    const toField = toInput.get(key);
    fields[key] = addedInput(toField, void 0), isChanged = !0;
  }
  const fromValue = fromInput.value, toValue = toInput.value;
  return isChanged ? {
    type: "object",
    action: "changed",
    isChanged: !0,
    fromValue,
    toValue,
    fields,
    annotation: toInput.annotation
  } : {
    type: "object",
    action: "unchanged",
    isChanged: !1,
    fromValue,
    toValue,
    fields
  };
}
function removedObject(input, toValue, options) {
  return {
    type: "object",
    action: "removed",
    isChanged: !0,
    fromValue: input.value,
    toValue,
    annotation: input.annotation,
    get fields() {
      const fields = {};
      for (const key of input.keys) {
        const value = input.get(key);
        fields[key] = removedInput(value, void 0);
      }
      return replaceProperty(this, "fields", fields);
    }
  };
}
function addedObject(input, fromValue, options) {
  return {
    type: "object",
    action: "added",
    isChanged: !0,
    fromValue,
    toValue: input.value,
    annotation: input.annotation,
    get fields() {
      const fields = {};
      for (const key of input.keys) {
        const value = input.get(key);
        fields[key] = addedInput(value, void 0);
      }
      return replaceProperty(this, "fields", fields);
    }
  };
}
function diffNumber(fromInput, toInput, options) {
  const fromValue = fromInput.value, toValue = toInput.value, type = fromInput.type;
  return fromValue === toValue ? {
    type,
    action: "unchanged",
    fromValue,
    toValue,
    isChanged: !1
  } : {
    type: fromInput.type,
    action: "changed",
    isChanged: !0,
    fromValue,
    toValue,
    annotation: toInput.annotation
  };
}
function diffBoolean(fromInput, toInput, options) {
  const fromValue = fromInput.value, toValue = toInput.value, type = fromInput.type;
  return fromValue === toValue ? {
    type,
    action: "unchanged",
    fromValue,
    toValue,
    isChanged: !1
  } : {
    type: fromInput.type,
    action: "changed",
    isChanged: !0,
    fromValue,
    toValue,
    annotation: toInput.annotation
  };
}
function diffString(fromInput, toInput, options) {
  const fromValue = fromInput.value, toValue = toInput.value;
  return fromValue === toValue ? {
    type: "string",
    action: "unchanged",
    isChanged: !1,
    fromValue,
    toValue,
    segments: [{ type: "stringSegment", action: "unchanged", text: fromValue }]
  } : {
    type: "string",
    action: "changed",
    isChanged: !0,
    fromValue,
    toValue,
    annotation: toInput.annotation,
    // Compute and memoize string segments only when accessed
    get segments() {
      const segments = buildSegments(fromInput, toInput);
      return replaceProperty(this, "segments", segments);
    }
  };
}
function buildSegments(fromInput, toInput) {
  const segments = [], dmpDiffs = cleanupSemantic(makeDiff(fromInput.value, toInput.value));
  let fromIdx = 0, toIdx = 0;
  for (const [op, text] of dmpDiffs)
    switch (op) {
      case DIFF_EQUAL:
        segments.push({ type: "stringSegment", action: "unchanged", text }), fromIdx += text.length, toIdx += text.length;
        break;
      case DIFF_DELETE:
        for (const segment of fromInput.sliceAnnotation(fromIdx, fromIdx + text.length))
          segments.push({
            type: "stringSegment",
            action: "removed",
            text: segment.text,
            annotation: segment.annotation
          });
        fromIdx += text.length;
        break;
      case DIFF_INSERT:
        for (const segment of toInput.sliceAnnotation(toIdx, toIdx + text.length))
          segments.push({
            type: "stringSegment",
            action: "added",
            text: segment.text,
            annotation: segment.annotation
          });
        toIdx += text.length;
        break;
      default:
        throw new Error(`Unhandled diff-match-patch operation "${op}"`);
    }
  return segments;
}
function removedString(input, toValue, options) {
  return {
    type: "string",
    action: "removed",
    isChanged: !0,
    fromValue: input.value,
    toValue,
    annotation: input.annotation,
    get segments() {
      const segments = input.sliceAnnotation(0, input.value.length).map((segment) => ({ type: "stringSegment", action: "removed", ...segment }));
      return replaceProperty(this, "segments", segments);
    }
  };
}
function addedString(input, fromValue, options) {
  return {
    type: "string",
    action: "added",
    isChanged: !0,
    fromValue,
    toValue: input.value,
    annotation: input.annotation,
    get segments() {
      const segments = input.sliceAnnotation(0, input.value.length).map((segment) => ({ type: "stringSegment", action: "added", ...segment }));
      return replaceProperty(this, "segments", segments);
    }
  };
}
function diffTypeChange(fromInput, toInput, options) {
  return {
    type: "typeChange",
    action: "changed",
    isChanged: !0,
    fromType: fromInput.type,
    fromValue: fromInput.value,
    fromDiff: removedInput(fromInput, void 0),
    toType: toInput.type,
    toValue: toInput.value,
    toDiff: addedInput(toInput, void 0),
    annotation: toInput.annotation
  };
}
function diffInput(fromInput, toInput, options = {}) {
  return fromInput.type !== toInput.type ? fromInput.type === "null" ? addedInput(toInput, null) : toInput.type === "null" ? removedInput(fromInput, null) : diffTypeChange(fromInput, toInput) : diffWithType(fromInput.type, fromInput, toInput, options);
}
function diffWithType(type, fromInput, toInput, options) {
  switch (type) {
    case "null":
      return {
        type: "null",
        action: "unchanged",
        isChanged: !1,
        toValue: null,
        fromValue: null
      };
    case "boolean":
      return diffBoolean(fromInput, toInput);
    case "number":
      return diffNumber(fromInput, toInput);
    case "string":
      return diffString(fromInput, toInput);
    case "array":
      return diffArray(fromInput, toInput, options);
    case "object":
      return diffObject(fromInput, toInput, options);
    default:
      throw new Error(`Unhandled diff type "${type}"`);
  }
}
function removedInput(input, toValue, options) {
  switch (input.type) {
    case "null":
      return {
        type: "null",
        action: "removed",
        isChanged: !0,
        fromValue: null,
        toValue,
        annotation: input.annotation
      };
    case "boolean":
      return {
        type: "boolean",
        action: "removed",
        isChanged: !0,
        fromValue: input.value,
        toValue,
        annotation: input.annotation
      };
    case "number":
      return {
        type: "number",
        action: "removed",
        isChanged: !0,
        fromValue: input.value,
        toValue,
        annotation: input.annotation
      };
    case "string":
      return removedString(input, toValue);
    case "array":
      return removedArray(input, toValue);
    case "object":
      return removedObject(input, toValue);
    default:
      throw new Error("Unhandled diff type");
  }
}
function addedInput(input, fromValue, options) {
  switch (input.type) {
    case "null":
      return {
        type: "null",
        action: "added",
        isChanged: !0,
        fromValue,
        toValue: null,
        annotation: input.annotation
      };
    case "boolean":
      return {
        type: "boolean",
        action: "added",
        isChanged: !0,
        fromValue,
        toValue: input.value,
        annotation: input.annotation
      };
    case "number":
      return {
        type: "number",
        action: "added",
        isChanged: !0,
        fromValue,
        toValue: input.value,
        annotation: input.annotation
      };
    case "string":
      return addedString(input, fromValue);
    case "array":
      return addedArray(input, fromValue);
    case "object":
      return addedObject(input, fromValue);
    default:
      throw new Error("Unhandled diff type");
  }
}
class ArrayWrapper {
  type = "array";
  length;
  value;
  annotation;
  elements = [];
  constructor(value, annotation) {
    this.annotation = annotation, this.value = value, this.length = value.length;
  }
  at(idx) {
    if (idx >= this.length) throw new Error("out of bounds");
    return this.elements[idx] || (this.elements[idx] = wrap(this.value[idx], this.annotation));
  }
  annotationAt() {
    return this.annotation;
  }
}
class BasicWrapper {
  type;
  value;
  annotation;
  constructor(type, value, annotation) {
    this.type = type, this.value = value, this.annotation = annotation;
  }
}
class ObjectWrapper {
  type = "object";
  value;
  keys;
  annotation;
  fields = {};
  constructor(value, annotation) {
    this.value = value, this.annotation = annotation, this.keys = Object.keys(value);
  }
  get(key) {
    const input = this.fields[key];
    if (input)
      return input;
    if (!this.value.hasOwnProperty(key))
      return;
    const raw = this.value[key];
    return this.fields[key] = wrap(raw, this.annotation);
  }
}
class StringWrapper {
  type = "string";
  value;
  annotation;
  constructor(value, annotation) {
    this.value = value, this.annotation = annotation;
  }
  sliceAnnotation(start, end) {
    return [{ text: this.value.slice(start, end), annotation: this.annotation }];
  }
}
function wrap(input, annotation) {
  if (Array.isArray(input))
    return new ArrayWrapper(input, annotation);
  if (input === null)
    return new BasicWrapper("null", input, annotation);
  const type = typeof input;
  switch (type) {
    case "number":
      return new BasicWrapper(type, input, annotation);
    case "boolean":
      return new BasicWrapper(type, input, annotation);
    case "object":
      return new ObjectWrapper(input, annotation);
    case "string":
      return new StringWrapper(input, annotation);
    default:
      throw new Error(`cannot wrap value of type: ${type}`);
  }
}
export {
  diffInput,
  wrap
};
//# sourceMappingURL=index.mjs.map
