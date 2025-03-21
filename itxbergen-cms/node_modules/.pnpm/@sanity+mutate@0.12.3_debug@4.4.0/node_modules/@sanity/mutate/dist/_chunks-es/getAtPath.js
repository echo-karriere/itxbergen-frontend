import { isArrayElement, isKeyedElement } from "./stringify.js";
function getAtPath(path, value) {
  if (path.length === 0)
    return value;
  let current = value;
  for (const head of path) {
    if (isArrayElement(head)) {
      if (!Array.isArray(current))
        return;
      if (isKeyedElement(head)) {
        current = current.find((item) => item._key === head._key);
        continue;
      }
      current = current[head];
      continue;
    }
    current = current[head];
  }
  return current;
}
export {
  getAtPath
};
//# sourceMappingURL=getAtPath.js.map
