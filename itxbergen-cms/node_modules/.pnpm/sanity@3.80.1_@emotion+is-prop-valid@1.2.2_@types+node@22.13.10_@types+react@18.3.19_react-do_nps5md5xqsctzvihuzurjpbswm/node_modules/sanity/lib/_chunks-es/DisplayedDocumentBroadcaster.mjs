import { jsx } from "react/jsx-runtime";
import { c } from "react-compiler-runtime";
import isEqual from "fast-deep-equal";
import { useContext, useEffect } from "react";
import { PresentationDisplayedDocumentContext } from "sanity/_singletons";
function DisplayedDocumentBroadcasterProvider(props) {
  const $ = c(9), {
    children,
    setDisplayedDocument,
    documentId
  } = props;
  let t0;
  $[0] !== setDisplayedDocument ? (t0 = (next) => setDisplayedDocument((prev) => isEqual(prev, next) ? prev : next), $[0] = setDisplayedDocument, $[1] = t0) : t0 = $[1];
  const context = t0;
  let t1, t2;
  $[2] !== documentId || $[3] !== setDisplayedDocument ? (t1 = () => {
    if (documentId)
      return;
    const timeout = setTimeout(() => setDisplayedDocument(null));
    return () => clearTimeout(timeout);
  }, t2 = [documentId, setDisplayedDocument], $[2] = documentId, $[3] = setDisplayedDocument, $[4] = t1, $[5] = t2) : (t1 = $[4], t2 = $[5]), useEffect(t1, t2);
  let t3;
  return $[6] !== children || $[7] !== context ? (t3 = /* @__PURE__ */ jsx(PresentationDisplayedDocumentContext.Provider, { value: context, children }), $[6] = children, $[7] = context, $[8] = t3) : t3 = $[8], t3;
}
function useDisplayedDocumentBroadcaster() {
  return useContext(PresentationDisplayedDocumentContext);
}
export {
  DisplayedDocumentBroadcasterProvider,
  useDisplayedDocumentBroadcaster
};
//# sourceMappingURL=DisplayedDocumentBroadcaster.mjs.map
