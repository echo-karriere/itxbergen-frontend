"use strict";
var path = require("node:path"), cli = require("./_chunks-cjs/cli.js");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var path__default = /* @__PURE__ */ _interopDefaultCompat(path);
cli.getCliVersion().then((cliVersion) => {
  cli.runCli(path__default.default.join(__dirname, ".."), { cliVersion });
});
//# sourceMappingURL=run.js.map
