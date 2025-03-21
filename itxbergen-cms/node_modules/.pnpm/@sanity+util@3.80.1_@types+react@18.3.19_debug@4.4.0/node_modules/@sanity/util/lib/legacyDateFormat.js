"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var moment = require("moment");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var moment__default = /* @__PURE__ */ _interopDefaultCompat(moment);
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD", DEFAULT_TIME_FORMAT = "HH:mm";
function format(input, format2, useUTC = !1) {
  return useUTC ? moment__default.default.utc(input).format(format2) : moment__default.default(input).format(format2);
}
function parse(dateString, format2) {
  const parsed = moment__default.default(dateString, format2, !0);
  return parsed.isValid() ? { isValid: !0, date: parsed.toDate() } : { isValid: !1, error: `Invalid date. Must be on the format "${format2}"` };
}
exports.DEFAULT_DATE_FORMAT = DEFAULT_DATE_FORMAT;
exports.DEFAULT_TIME_FORMAT = DEFAULT_TIME_FORMAT;
exports.format = format;
exports.parse = parse;
//# sourceMappingURL=legacyDateFormat.js.map
