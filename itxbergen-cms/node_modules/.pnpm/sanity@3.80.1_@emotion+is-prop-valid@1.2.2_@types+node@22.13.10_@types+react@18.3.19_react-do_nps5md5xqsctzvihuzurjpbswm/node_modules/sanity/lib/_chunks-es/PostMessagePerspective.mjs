import { c } from "react-compiler-runtime";
import { memo, useEffect } from "react";
const PostMessagePerspective = (props) => {
  const $ = c(8), {
    comlink,
    perspective
  } = props;
  let t0, t1;
  $[0] !== comlink || $[1] !== perspective ? (t0 = () => comlink.on("visual-editing/fetch-perspective", () => ({
    perspective
  })), t1 = [comlink, perspective], $[0] = comlink, $[1] = perspective, $[2] = t0, $[3] = t1) : (t0 = $[2], t1 = $[3]), useEffect(t0, t1);
  let t2, t3;
  return $[4] !== comlink || $[5] !== perspective ? (t2 = () => {
    comlink.post("presentation/perspective", {
      perspective
    });
  }, t3 = [comlink, perspective], $[4] = comlink, $[5] = perspective, $[6] = t2, $[7] = t3) : (t2 = $[6], t3 = $[7]), useEffect(t2, t3), null;
};
var PostMessagePerspective$1 = memo(PostMessagePerspective);
export {
  PostMessagePerspective$1 as default
};
//# sourceMappingURL=PostMessagePerspective.mjs.map
