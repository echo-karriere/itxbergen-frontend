"use strict";
var cli = require("@sanity/cli"), ConfigStore = require("configstore");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var ConfigStore__default = /* @__PURE__ */ _interopDefaultCompat(ConfigStore);
const sanityEnv = (process.env.SANITY_INTERNAL_ENV || "").toLowerCase(), defaults = {}, config = new ConfigStore__default.default(sanityEnv && sanityEnv !== "production" ? `sanity-${sanityEnv}` : "sanity", defaults, {
  globalConfigPath: !0
}), token = config.get("authToken");
if (!token)
  throw new Error("--with-user-token specified, but no auth token could be found. Run `sanity login`");
cli.getCliClient.__internal__getToken = () => token;
//# sourceMappingURL=configClient.js.map
