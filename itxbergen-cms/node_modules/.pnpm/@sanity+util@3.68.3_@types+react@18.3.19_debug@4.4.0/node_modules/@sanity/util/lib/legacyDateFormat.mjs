import moment from "moment";
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD", DEFAULT_TIME_FORMAT = "HH:mm";
function format(input, format2, useUTC = !1) {
  return useUTC ? moment.utc(input).format(format2) : moment(input).format(format2);
}
function parse(dateString, format2) {
  const parsed = moment(dateString, format2, !0);
  return parsed.isValid() ? { isValid: !0, date: parsed.toDate() } : { isValid: !1, error: `Invalid date. Must be on the format "${format2}"` };
}
export {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  format,
  parse
};
//# sourceMappingURL=legacyDateFormat.mjs.map
