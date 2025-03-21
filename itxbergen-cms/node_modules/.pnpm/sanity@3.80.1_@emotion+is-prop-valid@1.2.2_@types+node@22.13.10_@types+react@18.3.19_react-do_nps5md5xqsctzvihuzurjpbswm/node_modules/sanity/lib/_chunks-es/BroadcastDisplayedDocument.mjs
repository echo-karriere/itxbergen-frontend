import { c } from "react-compiler-runtime";
import { memo, useEffect } from "react";
import { usePresentationParams } from "./presentation.mjs";
import { useDisplayedDocumentBroadcaster } from "./DisplayedDocumentBroadcaster.mjs";
function BroadcastDisplayedDocument(props) {
  const $ = c(7), setDisplayedDocument = useDisplayedDocumentBroadcaster(), params = usePresentationParams(!1);
  let t0;
  $[0] !== props.value || $[1] !== setDisplayedDocument ? (t0 = () => {
    const timeout = setTimeout(() => setDisplayedDocument?.(props.value), 10);
    return () => clearTimeout(timeout);
  }, $[0] = props.value, $[1] = setDisplayedDocument, $[2] = t0) : t0 = $[2];
  const t1 = params?.perspective;
  let t2;
  return $[3] !== props.value || $[4] !== setDisplayedDocument || $[5] !== t1 ? (t2 = [t1, props.value, setDisplayedDocument], $[3] = props.value, $[4] = setDisplayedDocument, $[5] = t1, $[6] = t2) : t2 = $[6], useEffect(t0, t2), null;
}
var BroadcastDisplayedDocument$1 = memo(BroadcastDisplayedDocument);
export {
  BroadcastDisplayedDocument$1 as default
};
//# sourceMappingURL=BroadcastDisplayedDocument.mjs.map
