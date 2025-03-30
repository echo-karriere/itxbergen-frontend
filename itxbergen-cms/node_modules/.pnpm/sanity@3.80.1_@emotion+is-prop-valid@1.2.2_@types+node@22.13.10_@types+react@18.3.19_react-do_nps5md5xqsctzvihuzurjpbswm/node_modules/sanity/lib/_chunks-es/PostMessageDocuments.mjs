import { c } from "react-compiler-runtime";
import { memo, useEffect } from "react";
import { filter, shareReplay, first, merge } from "rxjs";
import { RELEASES_STUDIO_CLIENT_OPTIONS, isReleasePerspective, useClient } from "sanity";
import { API_VERSION } from "./presentation.mjs";
const PostMessageDocuments = (props) => {
  const $ = c(14), {
    comlink,
    perspective
  } = props;
  let t0;
  $[0] !== perspective ? (t0 = isReleasePerspective(perspective) ? RELEASES_STUDIO_CLIENT_OPTIONS : {
    apiVersion: API_VERSION
  }, $[0] = perspective, $[1] = t0) : t0 = $[1];
  const client = useClient(t0);
  let t1, t2;
  $[2] !== client || $[3] !== comlink ? (t1 = () => {
    const listener = client.listen('*[!(_id in path("_.**"))]', {}, {
      effectFormat: "mendoza",
      events: ["welcome", "mutation", "reconnect"],
      includePreviousRevision: !1,
      includeResult: !1,
      includeAllVersions: !0,
      tag: "presentation-documents",
      visibility: "transaction"
    }).pipe(filter(_temp)), welcome = listener.pipe(filter(_temp2), shareReplay({
      bufferSize: 1,
      refCount: !1
    })), unsubscribe = comlink.on("visual-editing/snapshot-welcome", async () => ({
      event: await new Promise((resolve) => {
        welcome.pipe(first()).subscribe((event_1) => {
          resolve(event_1);
        });
      })
    })), reconnect = listener.pipe(filter(_temp3)), mutations = listener.pipe(filter(_temp4)), events = merge(welcome, mutations, reconnect).subscribe((event_5) => {
      comlink.post("presentation/snapshot-event", {
        event: event_5
      });
    });
    return () => {
      unsubscribe(), events.unsubscribe();
    };
  }, t2 = [client, comlink], $[2] = client, $[3] = comlink, $[4] = t1, $[5] = t2) : (t1 = $[4], t2 = $[5]), useEffect(t1, t2);
  let t3, t4;
  $[6] !== client || $[7] !== comlink ? (t3 = () => comlink.on("visual-editing/fetch-snapshot", async (data) => ({
    snapshot: await client.getDocument(data.documentId, {
      tag: "document.snapshots"
    })
  })), t4 = [client, comlink], $[6] = client, $[7] = comlink, $[8] = t3, $[9] = t4) : (t3 = $[8], t4 = $[9]), useEffect(t3, t4);
  let t5, t6;
  return $[10] !== client || $[11] !== comlink ? (t5 = () => comlink.on("visual-editing/mutate", async (data_0) => client.dataRequest("mutate", data_0, {
    visibility: "async",
    returnDocuments: !0
  })), t6 = [client, comlink], $[10] = client, $[11] = comlink, $[12] = t5, $[13] = t6) : (t5 = $[12], t6 = $[13]), useEffect(t5, t6), null;
};
var PostMessageDocuments$1 = memo(PostMessageDocuments);
function _temp(event) {
  return event.type === "welcome" || event.type === "reconnect" || event.type === "mutation";
}
function _temp2(event_0) {
  return event_0.type === "welcome";
}
function _temp3(event_3) {
  return event_3.type === "reconnect";
}
function _temp4(event_4) {
  return event_4.type === "mutation";
}
export {
  PostMessageDocuments$1 as default
};
//# sourceMappingURL=PostMessageDocuments.mjs.map
