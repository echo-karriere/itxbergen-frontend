"use strict";
var jsxRuntime = require("react/jsx-runtime"), reactCompilerRuntime = require("react-compiler-runtime"), isEqual = require("fast-deep-equal"), React = require("react"), _singletons = require("sanity/_singletons");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var isEqual__default = /* @__PURE__ */ _interopDefaultCompat(isEqual);
function DisplayedDocumentBroadcasterProvider(props) {
  const $ = reactCompilerRuntime.c(9), {
    children,
    setDisplayedDocument,
    documentId
  } = props;
  let t0;
  $[0] !== setDisplayedDocument ? (t0 = (next) => setDisplayedDocument((prev) => isEqual__default.default(prev, next) ? prev : next), $[0] = setDisplayedDocument, $[1] = t0) : t0 = $[1];
  const context = t0;
  let t1, t2;
  $[2] !== documentId || $[3] !== setDisplayedDocument ? (t1 = () => {
    if (documentId)
      return;
    const timeout = setTimeout(() => setDisplayedDocument(null));
    return () => clearTimeout(timeout);
  }, t2 = [documentId, setDisplayedDocument], $[2] = documentId, $[3] = setDisplayedDocument, $[4] = t1, $[5] = t2) : (t1 = $[4], t2 = $[5]), React.useEffect(t1, t2);
  let t3;
  return $[6] !== children || $[7] !== context ? (t3 = /* @__PURE__ */ jsxRuntime.jsx(_singletons.PresentationDisplayedDocumentContext.Provider, { value: context, children }), $[6] = children, $[7] = context, $[8] = t3) : t3 = $[8], t3;
}
function useDisplayedDocumentBroadcaster() {
  return React.useContext(_singletons.PresentationDisplayedDocumentContext);
}
exports.DisplayedDocumentBroadcasterProvider = DisplayedDocumentBroadcasterProvider;
exports.useDisplayedDocumentBroadcaster = useDisplayedDocumentBroadcaster;
//# sourceMappingURL=DisplayedDocumentBroadcaster.js.map
