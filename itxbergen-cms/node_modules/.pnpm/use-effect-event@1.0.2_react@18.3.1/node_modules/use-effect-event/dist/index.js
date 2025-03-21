import { useRef, useInsertionEffect, useCallback } from "react";
function useEffectEvent(fn) {
  const ref = useRef(null);
  return useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]), useCallback((...args) => {
    const latestFn = ref.current;
    return latestFn(...args);
  }, []);
}
export {
  useEffectEvent
};
//# sourceMappingURL=index.js.map
