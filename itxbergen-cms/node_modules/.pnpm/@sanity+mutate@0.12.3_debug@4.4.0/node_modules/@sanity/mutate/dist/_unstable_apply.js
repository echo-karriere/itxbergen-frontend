import { arrify } from "./_chunks-es/arrify.js";
import { splice, applyPatchMutation, assignId, hasId } from "./_chunks-es/utils.js";
import { applyNodePatch, applyOp, applyPatches } from "./_chunks-es/utils.js";
import { nanoid } from "nanoid";
function applyInCollection(collection, mutations) {
  return arrify(mutations).reduce((prev, mutation) => {
    if (mutation.type === "create")
      return createIn$1(prev, mutation);
    if (mutation.type === "createIfNotExists")
      return createIfNotExistsIn$1(prev, mutation);
    if (mutation.type === "delete")
      return deleteIn$1(prev, mutation);
    if (mutation.type === "createOrReplace")
      return createOrReplaceIn$1(prev, mutation);
    if (mutation.type === "patch")
      return patchIn$1(prev, mutation);
    throw new Error(`Invalid mutation type: ${mutation.type}`);
  }, collection);
}
function createIn$1(collection, mutation) {
  if (collection.findIndex(
    (doc) => doc._id === mutation.document._id
  ) !== -1)
    throw new Error("Document already exist");
  return collection.concat(mutation.document);
}
function createIfNotExistsIn$1(collection, mutation) {
  return collection.findIndex(
    (doc) => doc._id === mutation.document._id
  ) === -1 ? collection.concat(mutation.document) : collection;
}
function createOrReplaceIn$1(collection, mutation) {
  const currentIdx = collection.findIndex(
    (doc) => doc._id === mutation.document._id
  );
  return currentIdx === -1 ? collection.concat(mutation.document) : splice(collection, currentIdx, 1, [mutation.document]);
}
function deleteIn$1(collection, mutation) {
  const currentIdx = collection.findIndex((doc) => doc._id === mutation.id);
  return currentIdx === -1 ? collection : splice(collection, currentIdx, 1);
}
function patchIn$1(collection, mutation) {
  const currentIdx = collection.findIndex((doc) => doc._id === mutation.id);
  if (currentIdx === -1)
    throw new Error("Cannot apply patch on nonexistent document");
  const current = collection[currentIdx], next = applyPatchMutation(mutation, current);
  return next === current ? collection : splice(collection, currentIdx, 1, [next]);
}
function update(doc, revision) {
  return {
    ...doc,
    _rev: revision,
    _createdAt: doc._createdAt || (/* @__PURE__ */ new Date()).toISOString(),
    _updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
const empty = {}, createStore = (initialEntries) => {
  let version = 0, index = initialEntries && initialEntries?.length > 0 ? Object.fromEntries(
    initialEntries.map((entry) => {
      const doc = update(assignId(entry, nanoid), nanoid());
      return [doc._id, doc];
    })
  ) : empty;
  return {
    get version() {
      return version;
    },
    // todo: support listening for changes
    entries: () => Object.entries(index),
    get: (id) => index[id],
    apply: (mutations) => {
      const nextIndex = applyInIndex(index, arrify(mutations));
      nextIndex !== index && (index = nextIndex, version++);
    }
  };
};
function applyInIndex(index, mutations) {
  return mutations.reduce((prev, mutation) => {
    if (mutation.type === "create")
      return createIn(prev, mutation);
    if (mutation.type === "createIfNotExists")
      return createIfNotExistsIn(prev, mutation);
    if (mutation.type === "delete")
      return deleteIn(prev, mutation);
    if (mutation.type === "createOrReplace")
      return createOrReplaceIn(prev, mutation);
    if (mutation.type === "patch")
      return patchIn(prev, mutation);
    throw new Error(`Invalid mutation type: ${mutation.type}`);
  }, index);
}
function createIn(index, mutation) {
  const document = assignId(mutation.document, nanoid);
  if (document._id in index)
    throw new Error("Document already exist");
  return { ...index, [document._id]: mutation.document };
}
function createIfNotExistsIn(index, mutation) {
  if (!hasId(mutation.document))
    throw new Error("Cannot createIfNotExists on document without _id");
  return mutation.document._id in index ? index : { ...index, [mutation.document._id]: mutation.document };
}
function createOrReplaceIn(index, mutation) {
  if (!hasId(mutation.document))
    throw new Error("Cannot createIfNotExists on document without _id");
  return { ...index, [mutation.document._id]: mutation.document };
}
function deleteIn(index, mutation) {
  if (mutation.id in index) {
    const copy = { ...index };
    return delete copy[mutation.id], copy;
  } else
    return index;
}
function patchIn(index, mutation) {
  if (!(mutation.id in index))
    throw new Error("Cannot apply patch on nonexistent document");
  const current = index[mutation.id], next = applyPatchMutation(mutation, current);
  return next === current ? index : { ...index, [mutation.id]: next };
}
export {
  applyInCollection,
  applyInIndex,
  applyNodePatch,
  applyOp,
  applyPatchMutation,
  applyPatches,
  assignId,
  createStore,
  hasId
};
//# sourceMappingURL=_unstable_apply.js.map
