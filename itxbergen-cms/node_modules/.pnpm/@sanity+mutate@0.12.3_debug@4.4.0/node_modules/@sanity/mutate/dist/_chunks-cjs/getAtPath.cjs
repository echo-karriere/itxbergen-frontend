"use strict";
var stringify = require("./stringify.cjs");
function getAtPath(path, value) {
  if (path.length === 0)
    return value;
  let current = value;
  for (const head of path) {
    if (stringify.isArrayElement(head)) {
      if (!Array.isArray(current))
        return;
      if (stringify.isKeyedElement(head)) {
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
exports.getAtPath = getAtPath;
//# sourceMappingURL=getAtPath.cjs.map
