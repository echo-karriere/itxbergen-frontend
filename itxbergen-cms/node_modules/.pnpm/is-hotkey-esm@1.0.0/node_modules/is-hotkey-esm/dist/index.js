const IS_MAC = typeof window < "u" && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform), MODIFIERS = {
  alt: "altKey",
  control: "ctrlKey",
  meta: "metaKey",
  shift: "shiftKey"
}, ALIASES = {
  add: "+",
  break: "pause",
  cmd: "meta",
  command: "meta",
  ctl: "control",
  ctrl: "control",
  del: "delete",
  down: "arrowdown",
  esc: "escape",
  ins: "insert",
  left: "arrowleft",
  mod: IS_MAC ? "meta" : "control",
  opt: "alt",
  option: "alt",
  return: "enter",
  right: "arrowright",
  space: " ",
  spacebar: " ",
  up: "arrowup",
  win: "meta",
  windows: "meta"
}, CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  " ": 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ";": 186,
  "=": 187,
  ",": 188,
  "-": 189,
  ".": 190,
  "/": 191,
  "`": 192,
  "[": 219,
  "\\": 220,
  "]": 221,
  "'": 222
};
for (var f = 1; f < 20; f++)
  CODES["f" + f] = 111 + f;
function isHotkey(hotkey, options, event) {
  options && !("byKey" in options) && (event = options, options = null), Array.isArray(hotkey) || (hotkey = [hotkey]);
  const array = hotkey.map((string) => parseHotkey(string, options)), check = (e) => array.some((object) => compareHotkey(object, e));
  return event == null ? check : check(event);
}
function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}
function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: !0 }, event);
}
function parseHotkey(hotkey, options) {
  const byKey = options && options.byKey, ret = {};
  hotkey = hotkey.replace("++", "+add");
  const values = hotkey.split("+"), { length } = values;
  for (const k in MODIFIERS)
    ret[MODIFIERS[k]] = !1;
  for (let value of values) {
    const optional = value.endsWith("?") && value.length > 1;
    optional && (value = value.slice(0, -1));
    const name = toKeyName(value), modifier = MODIFIERS[name];
    if (value.length > 1 && !modifier && !ALIASES[value] && !CODES[name])
      throw new TypeError(`Unknown modifier: "${value}"`);
    (length === 1 || !modifier) && (byKey ? ret.key = name : ret.which = toKeyCode(value)), modifier && (ret[modifier] = optional ? null : !0);
  }
  return ret;
}
function compareHotkey(object, event) {
  for (const key in object) {
    const expected = object[key];
    let actual;
    if (expected != null && (key === "key" && event.key != null ? actual = event.key.toLowerCase() : key === "which" ? actual = expected === 91 && event.which === 93 ? 91 : event.which : actual = event[key], !(actual == null && expected === !1) && actual !== expected))
      return !1;
  }
  return !0;
}
function toKeyCode(name) {
  return name = toKeyName(name), CODES[name] || name.toUpperCase().charCodeAt(0);
}
function toKeyName(name) {
  return name = name.toLowerCase(), name = ALIASES[name] || name, name;
}
export {
  compareHotkey,
  isCodeHotkey,
  isHotkey,
  isKeyHotkey,
  parseHotkey,
  toKeyCode,
  toKeyName
};
//# sourceMappingURL=index.js.map
