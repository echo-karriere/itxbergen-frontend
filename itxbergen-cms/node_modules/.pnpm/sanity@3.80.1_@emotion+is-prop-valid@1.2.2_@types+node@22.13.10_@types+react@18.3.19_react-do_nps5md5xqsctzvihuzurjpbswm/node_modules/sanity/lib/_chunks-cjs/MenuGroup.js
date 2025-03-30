"use strict";
var jsxRuntime = require("react/jsx-runtime"), reactCompilerRuntime = require("react-compiler-runtime"), ui = require("@sanity/ui"), TooltipDelayGroupProvider = require("./TooltipDelayGroupProvider.js");
const MenuGroup = (props) => {
  const $ = reactCompilerRuntime.c(8), {
    tooltipProps
  } = props;
  let t0;
  $[0] !== tooltipProps ? (t0 = (children) => /* @__PURE__ */ jsxRuntime.jsx(TooltipDelayGroupProvider.Tooltip, { content: tooltipProps?.content, portal: !0, ...tooltipProps, children: /* @__PURE__ */ jsxRuntime.jsx("div", { children }) }), $[0] = tooltipProps, $[1] = t0) : t0 = $[1];
  const renderWrapper = t0, t1 = !!tooltipProps;
  let t2;
  $[2] !== props ? (t2 = /* @__PURE__ */ jsxRuntime.jsx(ui.MenuGroup, { ...props, fontSize: 1, padding: 3 }), $[2] = props, $[3] = t2) : t2 = $[3];
  let t3;
  return $[4] !== renderWrapper || $[5] !== t1 || $[6] !== t2 ? (t3 = /* @__PURE__ */ jsxRuntime.jsx(TooltipDelayGroupProvider.ConditionalWrapper, { condition: t1, wrapper: renderWrapper, children: t2 }), $[4] = renderWrapper, $[5] = t1, $[6] = t2, $[7] = t3) : t3 = $[7], t3;
};
exports.MenuGroup = MenuGroup;
//# sourceMappingURL=MenuGroup.js.map
