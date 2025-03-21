"use strict";
var jsxRuntime = require("react/jsx-runtime"), reactCompilerRuntime = require("react-compiler-runtime"), React = require("react"), sanity = require("sanity");
function PostMessageRefreshMutations(props) {
  const $ = reactCompilerRuntime.c(8), {
    comlink,
    type,
    previewKitConnection,
    loadersConnection
  } = props;
  let t0, t1;
  $[0] !== props.id ? (t1 = sanity.getPublishedId(props.id), $[0] = props.id, $[1] = t1) : t1 = $[1], t0 = t1;
  const id = t0, {
    draft,
    published,
    ready
  } = sanity.useEditState(id, type, "low"), livePreviewEnabled = previewKitConnection === "connected" || loadersConnection === "connected";
  if (ready && draft || published) {
    let t2;
    return $[2] !== comlink || $[3] !== draft || $[4] !== id || $[5] !== livePreviewEnabled || $[6] !== published ? (t2 = /* @__PURE__ */ jsxRuntime.jsx(PostMessageRefreshMutationsInner, { comlink, draft, livePreviewEnabled, published }, id), $[2] = comlink, $[3] = draft, $[4] = id, $[5] = livePreviewEnabled, $[6] = published, $[7] = t2) : t2 = $[7], t2;
  }
  return null;
}
function PostMessageRefreshMutationsInner(props) {
  const $ = reactCompilerRuntime.c(14), {
    comlink,
    draft,
    published,
    livePreviewEnabled
  } = props, [prevDraft, setPrevDraft] = React.useState(draft), [prevPublished, setPrevPublished] = React.useState(published);
  let t0;
  $[0] !== comlink || $[1] !== draft || $[2] !== livePreviewEnabled || $[3] !== prevDraft?._rev || $[4] !== prevPublished?._rev || $[5] !== published ? (t0 = () => {
    prevDraft?._rev !== draft?._rev && (React.startTransition(() => setPrevDraft(draft)), draft && comlink?.post("presentation/refresh", {
      source: "mutation",
      livePreviewEnabled,
      document: parseDocument(draft)
    })), prevPublished?._rev !== published?._rev && (React.startTransition(() => setPrevPublished(published)), published && comlink?.post("presentation/refresh", {
      source: "mutation",
      livePreviewEnabled,
      document: parseDocument(published)
    }));
  }, $[0] = comlink, $[1] = draft, $[2] = livePreviewEnabled, $[3] = prevDraft?._rev, $[4] = prevPublished?._rev, $[5] = published, $[6] = t0) : t0 = $[6];
  const t1 = prevDraft?._rev, t2 = prevPublished?._rev;
  let t3;
  return $[7] !== comlink || $[8] !== draft || $[9] !== livePreviewEnabled || $[10] !== published || $[11] !== t1 || $[12] !== t2 ? (t3 = [comlink, draft, livePreviewEnabled, t1, t2, published], $[7] = comlink, $[8] = draft, $[9] = livePreviewEnabled, $[10] = published, $[11] = t1, $[12] = t2, $[13] = t3) : t3 = $[13], React.useEffect(t0, t3), null;
}
function parseDocument(document) {
  const {
    _id,
    _type,
    _rev,
    slug
  } = document;
  return {
    _id,
    _type,
    _rev,
    slug
  };
}
var PostMessageRefreshMutations$1 = React.memo(PostMessageRefreshMutations);
exports.default = PostMessageRefreshMutations$1;
//# sourceMappingURL=PostMessageRefreshMutations.js.map
