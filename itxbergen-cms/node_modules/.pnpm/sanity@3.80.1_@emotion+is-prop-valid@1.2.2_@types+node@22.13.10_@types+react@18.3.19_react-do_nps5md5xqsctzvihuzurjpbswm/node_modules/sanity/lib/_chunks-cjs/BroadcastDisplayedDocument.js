"use strict";
var reactCompilerRuntime = require("react-compiler-runtime"), React = require("react"), presentation = require("./presentation.js"), DisplayedDocumentBroadcaster = require("./DisplayedDocumentBroadcaster.js");
function BroadcastDisplayedDocument(props) {
  const $ = reactCompilerRuntime.c(7), setDisplayedDocument = DisplayedDocumentBroadcaster.useDisplayedDocumentBroadcaster(), params = presentation.usePresentationParams(!1);
  let t0;
  $[0] !== props.value || $[1] !== setDisplayedDocument ? (t0 = () => {
    const timeout = setTimeout(() => setDisplayedDocument?.(props.value), 10);
    return () => clearTimeout(timeout);
  }, $[0] = props.value, $[1] = setDisplayedDocument, $[2] = t0) : t0 = $[2];
  const t1 = params?.perspective;
  let t2;
  return $[3] !== props.value || $[4] !== setDisplayedDocument || $[5] !== t1 ? (t2 = [t1, props.value, setDisplayedDocument], $[3] = props.value, $[4] = setDisplayedDocument, $[5] = t1, $[6] = t2) : t2 = $[6], React.useEffect(t0, t2), null;
}
var BroadcastDisplayedDocument$1 = React.memo(BroadcastDisplayedDocument);
exports.default = BroadcastDisplayedDocument$1;
//# sourceMappingURL=BroadcastDisplayedDocument.js.map
