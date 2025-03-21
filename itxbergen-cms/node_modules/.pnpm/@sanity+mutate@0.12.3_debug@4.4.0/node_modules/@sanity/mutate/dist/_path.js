import { getAtPath } from "./_chunks-es/getAtPath.js";
import { parse } from "./_chunks-es/parse.js";
import { isArrayElement, isElementEqual, isEqual, isIndexElement, isKeyElement, isKeyedElement, isPropertyElement, startsWith, stringify } from "./_chunks-es/stringify.js";
function normalize(path) {
  return typeof path == "string" ? parse(path) : path;
}
export {
  getAtPath,
  isArrayElement,
  isElementEqual,
  isEqual,
  isIndexElement,
  isKeyElement,
  isKeyedElement,
  isPropertyElement,
  normalize,
  parse,
  startsWith,
  stringify
};
//# sourceMappingURL=_path.js.map
