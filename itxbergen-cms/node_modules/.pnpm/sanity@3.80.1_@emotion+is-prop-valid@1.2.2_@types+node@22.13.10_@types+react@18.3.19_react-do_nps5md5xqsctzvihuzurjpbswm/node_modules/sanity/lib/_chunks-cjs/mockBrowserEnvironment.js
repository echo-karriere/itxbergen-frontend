"use strict";
var resizeObserver = require("@juggle/resize-observer"), node = require("esbuild-register/dist/node"), jsdomGlobal = require("jsdom-global"), pirates = require("pirates"), resolveFrom = require("resolve-from"), cli = require("@sanity/cli");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var jsdomGlobal__default = /* @__PURE__ */ _interopDefaultCompat(jsdomGlobal), resolveFrom__default = /* @__PURE__ */ _interopDefaultCompat(resolveFrom);
const envPrefix = "SANITY_STUDIO_";
function getStudioEnvironmentVariables(options = {}) {
  const {
    prefix = "",
    envFile = !1,
    jsonEncode = !1
  } = options, fullEnv = envFile ? {
    ...process.env,
    ...cli.loadEnv(envFile.mode, envFile.envDir || process.cwd(), [envPrefix])
  } : process.env, studioEnv = {};
  for (const key in fullEnv)
    key.startsWith(envPrefix) && (studioEnv[`${prefix}${key}`] = jsonEncode ? JSON.stringify(fullEnv[key] || "") : fullEnv[key] || "");
  return studioEnv;
}
const jsdomDefaultHtml = `<!doctype html>
<html>
  <head><meta charset="utf-8"></head>
  <body></body>
</html>`;
function mockBrowserEnvironment(basePath) {
  if (global && global.window && "__mockedBySanity" in global.window)
    return () => {
    };
  const domCleanup = jsdomGlobal__default.default(jsdomDefaultHtml, {
    url: "http://localhost:3333/"
  }), windowCleanup = () => global.window.close(), globalCleanup = provideFakeGlobals(basePath), cleanupFileLoader = pirates.addHook((code, filename) => `module.exports = ${JSON.stringify(filename)}`, {
    ignoreNodeModules: !1,
    exts: getFileExtensions()
  }), {
    unregister: unregisterESBuild
  } = node.register({
    target: "node18",
    supported: {
      "dynamic-import": !0
    },
    format: "cjs",
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
    jsx: "automatic",
    define: {
      // define the `process.env` global
      ...getStudioEnvironmentVariables({
        prefix: "process.env.",
        jsonEncode: !0
      }),
      // define the `import.meta.env` global
      ...getStudioEnvironmentVariables({
        prefix: "import.meta.env.",
        jsonEncode: !0
      })
    }
  });
  return function() {
    unregisterESBuild(), cleanupFileLoader(), globalCleanup(), windowCleanup(), domCleanup();
  };
}
const getFakeGlobals = (basePath) => ({
  __mockedBySanity: !0,
  requestAnimationFrame: setImmediate,
  cancelAnimationFrame: clearImmediate,
  requestIdleCallback: setImmediate,
  cancelIdleCallback: clearImmediate,
  ace: tryGetAceGlobal(basePath),
  InputEvent: global.window?.InputEvent,
  customElements: global.window?.customElements,
  ResizeObserver: global.window?.ResizeObserver || resizeObserver.ResizeObserver,
  matchMedia: global.window?.matchMedia || (() => ({
    matches: !1,
    media: "",
    onchange: null
  }))
}), getFakeDocumentProps = () => ({
  execCommand: function(_commandName, _showDefaultUI, _valueArgument) {
    return !1;
  }
});
function provideFakeGlobals(basePath) {
  const globalEnv = global, globalWindow = global.window, globalDocument = global.document || document || {}, fakeGlobals = getFakeGlobals(basePath), fakeDocumentProps = getFakeDocumentProps(), stubbedGlobalKeys = [], stubbedWindowKeys = [], stubbedDocumentKeys = [];
  for (const [rawKey, value] of Object.entries(fakeGlobals)) {
    if (typeof value > "u")
      continue;
    const key = rawKey;
    key in globalEnv || (globalEnv[key] = fakeGlobals[key], stubbedGlobalKeys.push(key)), key in global.window || (globalWindow[key] = fakeGlobals[key], stubbedWindowKeys.push(key));
  }
  for (const [rawKey, value] of Object.entries(fakeDocumentProps)) {
    if (typeof value > "u")
      continue;
    const key = rawKey;
    key in globalDocument || (globalDocument[key] = fakeDocumentProps[key], stubbedDocumentKeys.push(key));
  }
  return () => {
    stubbedGlobalKeys.forEach((key) => {
      delete globalEnv[key];
    }), stubbedWindowKeys.forEach((key) => {
      delete globalWindow[key];
    }), stubbedDocumentKeys.forEach((key) => {
      delete globalDocument[key];
    });
  };
}
function tryGetAceGlobal(basePath) {
  const acePath = resolveFrom__default.default.silent(basePath, "ace-builds");
  if (acePath)
    try {
      return require(acePath);
    } catch {
      return;
    }
}
function getFileExtensions() {
  return [".css", ".eot", ".gif", ".jpeg", ".jpg", ".otf", ".png", ".sass", ".scss", ".svg", ".ttf", ".webp", ".woff", ".woff2"];
}
exports.mockBrowserEnvironment = mockBrowserEnvironment;
//# sourceMappingURL=mockBrowserEnvironment.js.map
