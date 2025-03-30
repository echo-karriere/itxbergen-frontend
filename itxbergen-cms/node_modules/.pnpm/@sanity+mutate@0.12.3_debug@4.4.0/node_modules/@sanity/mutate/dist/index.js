import { parse } from "./_chunks-es/parse.js";
import { stringify } from "./_chunks-es/stringify.js";
import { arrify } from "./_chunks-es/arrify.js";
import { decode as decode$1, decodeAll, encode as encode$1, encodeAll, encodeMutation as encodeMutation$2, encodeTransaction } from "./_chunks-es/encode.js";
import { isObject } from "./_chunks-es/isObject.js";
function decode(mutations) {
  return mutations.map(decodeMutation);
}
function decodeMutation(mutation) {
  const [type] = mutation;
  if (type === "delete") {
    const [, id] = mutation;
    return { id, type };
  } else if (type === "create") {
    const [, document] = mutation;
    return { type, document };
  } else if (type === "createIfNotExists") {
    const [, document] = mutation;
    return { type, document };
  } else if (type === "createOrReplace") {
    const [, document] = mutation;
    return { type, document };
  } else if (type === "patch")
    return decodePatchMutation(mutation);
  throw new Error(`Unrecognized mutation: ${JSON.stringify(mutation)}`);
}
function decodePatchMutation(mutation) {
  const [, type, id, serializedPath, , revisionId] = mutation, path = parse(serializedPath);
  if (type === "dec" || type === "inc") {
    const [, , , , [amount]] = mutation;
    return {
      type: "patch",
      id,
      patches: [{ path, op: { type: "inc", amount } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "unset")
    return {
      type: "patch",
      id,
      patches: [{ path, op: { type: "unset" } }],
      ...createOpts(revisionId)
    };
  if (type === "insert") {
    const [, , , , [position, ref, items]] = mutation;
    return {
      type: "patch",
      id,
      patches: [
        {
          path,
          op: {
            type: "insert",
            position,
            items,
            referenceItem: typeof ref == "string" ? { _key: ref } : ref
          }
        }
      ],
      ...createOpts(revisionId)
    };
  }
  if (type === "set") {
    const [, , , , [value]] = mutation;
    return {
      type: "patch",
      id,
      patches: [{ path, op: { type: "set", value } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "setIfMissing") {
    const [, , , , [value]] = mutation;
    return {
      type: "patch",
      id,
      patches: [{ path, op: { type: "setIfMissing", value } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "diffMatchPatch") {
    const [, , , , [value]] = mutation;
    return {
      type: "patch",
      id,
      patches: [{ path, op: { type: "diffMatchPatch", value } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "truncate") {
    const [, , , , [startIndex, endIndex]] = mutation;
    return {
      type: "patch",
      id,
      patches: [{ path, op: { type: "truncate", startIndex, endIndex } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "assign") {
    const [, , , , [value]] = mutation;
    return {
      type: "patch",
      id,
      patches: [{ path, op: { type: "assign", value } }],
      ...createOpts(revisionId)
    };
  }
  if (type === "replace") {
    const [, , , , [ref, items]] = mutation;
    return {
      type: "patch",
      id,
      patches: [
        { path, op: { type: "replace", items, referenceItem: decodeItemRef(ref) } }
      ],
      ...createOpts(revisionId)
    };
  }
  if (type === "upsert") {
    const [, , , , [position, referenceItem, items]] = mutation;
    return {
      type: "patch",
      id,
      patches: [
        {
          path,
          op: {
            type: "upsert",
            items,
            referenceItem: decodeItemRef(referenceItem),
            position
          }
        }
      ],
      ...createOpts(revisionId)
    };
  }
  throw new Error(`Invalid mutation type: ${type}`);
}
function decodeItemRef(ref) {
  return typeof ref == "string" ? { _key: ref } : ref;
}
function createOpts(revisionId) {
  return revisionId ? { options: { ifRevision: revisionId } } : null;
}
function encode(mutations) {
  return mutations.flatMap((m) => encodeMutation$1(m));
}
function encodeItemRef$1(ref) {
  return typeof ref == "number" ? ref : ref._key;
}
function encodeMutation$1(mutation) {
  if (mutation.type === "create" || mutation.type === "createIfNotExists" || mutation.type === "createOrReplace")
    return [[mutation.type, mutation.document]];
  if (mutation.type === "delete")
    return [["delete", mutation.id]];
  if (mutation.type === "patch")
    return mutation.patches.map(
      (patch2) => maybeAddRevision(
        mutation.options?.ifRevision,
        encodePatchMutation(mutation.id, patch2)
      )
    );
  throw new Error(`Invalid mutation type: ${mutation.type}`);
}
function encodePatchMutation(id, patch2) {
  const { op } = patch2, path = stringify(patch2.path);
  if (op.type === "unset")
    return ["patch", "unset", id, path, []];
  if (op.type === "diffMatchPatch")
    return ["patch", "diffMatchPatch", id, path, [op.value]];
  if (op.type === "inc" || op.type === "dec")
    return ["patch", op.type, id, path, [op.amount]];
  if (op.type === "set")
    return ["patch", op.type, id, path, [op.value]];
  if (op.type === "setIfMissing")
    return ["patch", op.type, id, path, [op.value]];
  if (op.type === "insert")
    return [
      "patch",
      "insert",
      id,
      path,
      [op.position, encodeItemRef$1(op.referenceItem), op.items]
    ];
  if (op.type === "upsert")
    return [
      "patch",
      "upsert",
      id,
      path,
      [op.position, encodeItemRef$1(op.referenceItem), op.items]
    ];
  if (op.type === "assign")
    return ["patch", "assign", id, path, [op.value]];
  if (op.type === "unassign")
    return ["patch", "assign", id, path, [op.keys]];
  if (op.type === "replace")
    return [
      "patch",
      "replace",
      id,
      path,
      [encodeItemRef$1(op.referenceItem), op.items]
    ];
  if (op.type === "truncate")
    return ["patch", "truncate", id, path, [op.startIndex, op.endIndex]];
  if (op.type === "remove")
    return ["patch", "remove", id, path, [encodeItemRef$1(op.referenceItem)]];
  throw new Error(`Invalid operation type: ${op.type}`);
}
function maybeAddRevision(revision, mut) {
  const [mutType, patchType, id, path, args] = mut;
  return revision ? [mutType, patchType, id, path, args, revision] : mut;
}
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  decode,
  encode
});
function create(document) {
  return { type: "create", document };
}
function patch(id, patches, options) {
  return {
    type: "patch",
    id,
    patches: arrify(patches),
    ...options ? { options } : {}
  };
}
function at(path, operation) {
  return {
    path: typeof path == "string" ? parse(path) : path,
    op: operation
  };
}
function createIfNotExists(document) {
  return { type: "createIfNotExists", document };
}
function createOrReplace(document) {
  return { type: "createOrReplace", document };
}
function delete_(id) {
  return { type: "delete", id };
}
const del = delete_, destroy = delete_, set = (value) => ({ type: "set", value }), assign = (value) => ({
  type: "assign",
  value
}), unassign = (keys) => ({
  type: "unassign",
  keys
}), setIfMissing = (value) => ({
  type: "setIfMissing",
  value
}), unset = () => ({ type: "unset" }), inc = (amount = 1) => ({
  type: "inc",
  amount
}), dec = (amount = 1) => ({
  type: "dec",
  amount
}), diffMatchPatch = (value) => ({
  type: "diffMatchPatch",
  value
});
function insert(items, position, indexOrReferenceItem) {
  return {
    type: "insert",
    referenceItem: indexOrReferenceItem,
    position,
    items: arrify(items)
  };
}
function append(items) {
  return insert(items, "after", -1);
}
function prepend(items) {
  return insert(items, "before", 0);
}
function insertBefore(items, indexOrReferenceItem) {
  return insert(items, "before", indexOrReferenceItem);
}
const insertAfter = (items, indexOrReferenceItem) => insert(items, "after", indexOrReferenceItem);
function truncate(startIndex, endIndex) {
  return {
    type: "truncate",
    startIndex,
    endIndex
  };
}
function replace(items, referenceItem) {
  return {
    type: "replace",
    referenceItem,
    items: arrify(items)
  };
}
function remove(referenceItem) {
  return {
    type: "remove",
    referenceItem
  };
}
function upsert(items, position, referenceItem) {
  return {
    type: "upsert",
    items: arrify(items),
    referenceItem,
    position
  };
}
function assertCompatible(formPatchPath) {
  if (formPatchPath.length === 0)
    return formPatchPath;
  for (const element of formPatchPath)
    if (Array.isArray(element))
      throw new Error("Form patch paths cannot include arrays");
  return formPatchPath;
}
function encodePatches(patches) {
  return patches.map((formPatch) => {
    const path = assertCompatible(formPatch.path);
    if (formPatch.type === "unset")
      return at(path, unset());
    if (formPatch.type === "set")
      return at(path, set(formPatch.value));
    if (formPatch.type === "setIfMissing")
      return at(path, setIfMissing(formPatch.value));
    if (formPatch.type === "insert") {
      const arrayPath = path.slice(0, -1), itemRef = formPatch.path[formPatch.path.length - 1];
      return at(
        arrayPath,
        insert(
          formPatch.items,
          formPatch.position,
          itemRef
        )
      );
    }
    if (formPatch.type === "diffMatchPatch")
      return at(path, diffMatchPatch(formPatch.value));
    throw new Error(`Unknown patch type ${formPatch.type}`);
  });
}
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  encodePatches
}), index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  decode: decode$1,
  decodeAll,
  encode: encode$1,
  encodeAll,
  encodeMutation: encodeMutation$2,
  encodeTransaction
});
function format(mutations) {
  return mutations.flatMap((m) => encodeMutation(m)).join(`
`);
}
function encodeItemRef(ref) {
  return typeof ref == "number" ? ref : ref._key;
}
function encodeMutation(mutation) {
  if (mutation.type === "create" || mutation.type === "createIfNotExists" || mutation.type === "createOrReplace")
    return [mutation.type, ": ", JSON.stringify(mutation.document)].join("");
  if (mutation.type === "delete")
    return ["delete ", mutation.id].join(": ");
  if (mutation.type === "patch") {
    const ifRevision = mutation.options?.ifRevision;
    return [
      "patch",
      " ",
      `id=${mutation.id}`,
      ifRevision ? ` (if revision==${ifRevision})` : "",
      `:
`,
      mutation.patches.map((nodePatch) => `  ${formatPatchMutation(nodePatch)}`).join(`
`)
    ].join("");
  }
  throw new Error(`Invalid mutation type: ${mutation.type}`);
}
function formatPatchMutation(patch2) {
  const { op } = patch2, path = stringify(patch2.path);
  if (op.type === "unset")
    return [path, "unset()"].join(": ");
  if (op.type === "diffMatchPatch")
    return [path, `diffMatchPatch(${op.value})`].join(": ");
  if (op.type === "inc" || op.type === "dec")
    return [path, `${op.type}(${op.amount})`].join(": ");
  if (op.type === "set" || op.type === "setIfMissing")
    return [path, `${op.type}(${JSON.stringify(op.value)})`].join(": ");
  if (op.type === "assign")
    return [path, `${op.type}(${JSON.stringify(op.value)})`].join(": ");
  if (op.type === "unassign")
    return [path, `${op.type}(${JSON.stringify(op.keys)})`].join(": ");
  if (op.type === "insert" || op.type === "upsert")
    return [
      path,
      `${op.type}(${op.position}, ${encodeItemRef(
        op.referenceItem
      )}, ${JSON.stringify(op.items)})`
    ].join(": ");
  if (op.type === "replace")
    return [
      path,
      `replace(${encodeItemRef(op.referenceItem)}, ${JSON.stringify(
        op.items
      )})`
    ].join(": ");
  if (op.type === "truncate")
    return [path, `truncate(${op.startIndex}, ${op.endIndex}`].join(": ");
  if (op.type === "remove")
    return [path, `remove(${encodeItemRef(op.referenceItem)})`].join(": ");
  throw new Error(`Invalid operation type: ${op.type}`);
}
var compact = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  format
});
function autoKeys(generateKey) {
  const ensureKeys = createEnsureKeys(generateKey), insert$1 = (position, referenceItem, items) => insert(ensureKeys(items), position, referenceItem), upsert$1 = (items, position, referenceItem) => upsert(ensureKeys(items), position, referenceItem), replace$1 = (items, position, referenceItem) => replace(ensureKeys(items), referenceItem), insertBefore2 = (ref, items) => insert$1("before", ref, items);
  return { insert: insert$1, upsert: upsert$1, replace: replace$1, insertBefore: insertBefore2, prepend: (items) => insertBefore2(0, items), insertAfter: (ref, items) => insert$1("after", ref, items), append: (items) => insert$1("after", -1, items) };
}
function hasKey(item) {
  return "_key" in item;
}
function createEnsureKeys(generateKey) {
  return (array) => {
    let didModify = !1;
    const withKeys = array.map((item) => needsKey(item) ? (didModify = !0, { ...item, _key: generateKey(item) }) : item);
    return didModify ? withKeys : array;
  };
}
function needsKey(arrayItem) {
  return isObject(arrayItem) && !hasKey(arrayItem);
}
export {
  index$2 as CompactEncoder,
  compact as CompactFormatter,
  index$1 as FormCompatEncoder,
  index as SanityEncoder,
  append,
  assign,
  at,
  autoKeys,
  create,
  createIfNotExists,
  createOrReplace,
  dec,
  del,
  delete_,
  destroy,
  diffMatchPatch,
  inc,
  insert,
  insertAfter,
  insertBefore,
  patch,
  prepend,
  remove,
  replace,
  set,
  setIfMissing,
  truncate,
  unassign,
  unset,
  upsert
};
//# sourceMappingURL=index.js.map
