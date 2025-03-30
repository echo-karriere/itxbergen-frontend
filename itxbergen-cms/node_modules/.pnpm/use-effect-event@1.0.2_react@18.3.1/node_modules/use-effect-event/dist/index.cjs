"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var react = require("react");
function useEffectEvent(fn) {
  const ref = react.useRef(null);
  return react.useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]), react.useCallback((...args) => {
    const latestFn = ref.current;
    return latestFn(...args);
  }, []);
}
exports.useEffectEvent = useEffectEvent;
//# sourceMappingURL=index.cjs.map
