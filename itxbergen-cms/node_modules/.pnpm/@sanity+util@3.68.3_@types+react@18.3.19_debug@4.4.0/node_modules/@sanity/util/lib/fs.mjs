import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
async function pathIsEmpty(dir) {
  try {
    return (await fs.readdir(absolutify(dir))).length === 0;
  } catch (err) {
    if (err.code === "ENOENT")
      return !0;
    throw err;
  }
}
function expandHome(filePath) {
  if (filePath.charCodeAt(0) === 126) {
    if (filePath.charCodeAt(1) === 43)
      return path.join(process.cwd(), filePath.slice(2));
    const home = os.homedir();
    return home ? path.join(home, filePath.slice(1)) : filePath;
  }
  return filePath;
}
function absolutify(dir) {
  const pathName = expandHome(dir);
  return path.isAbsolute(pathName) ? pathName : path.resolve(process.cwd(), pathName);
}
export {
  absolutify,
  expandHome,
  pathIsEmpty
};
//# sourceMappingURL=fs.mjs.map
