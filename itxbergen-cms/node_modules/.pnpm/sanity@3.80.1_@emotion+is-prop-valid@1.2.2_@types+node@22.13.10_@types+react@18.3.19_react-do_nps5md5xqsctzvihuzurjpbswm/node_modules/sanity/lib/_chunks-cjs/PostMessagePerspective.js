"use strict";
var reactCompilerRuntime = require("react-compiler-runtime"), React = require("react");
const PostMessagePerspective = (props) => {
  const $ = reactCompilerRuntime.c(8), {
    comlink,
    perspective
  } = props;
  let t0, t1;
  $[0] !== comlink || $[1] !== perspective ? (t0 = () => comlink.on("visual-editing/fetch-perspective", () => ({
    perspective
  })), t1 = [comlink, perspective], $[0] = comlink, $[1] = perspective, $[2] = t0, $[3] = t1) : (t0 = $[2], t1 = $[3]), React.useEffect(t0, t1);
  let t2, t3;
  return $[4] !== comlink || $[5] !== perspective ? (t2 = () => {
    comlink.post("presentation/perspective", {
      perspective
    });
  }, t3 = [comlink, perspective], $[4] = comlink, $[5] = perspective, $[6] = t2, $[7] = t3) : (t2 = $[6], t3 = $[7]), React.useEffect(t2, t3), null;
};
var PostMessagePerspective$1 = React.memo(PostMessagePerspective);
exports.default = PostMessagePerspective$1;
//# sourceMappingURL=PostMessagePerspective.js.map
