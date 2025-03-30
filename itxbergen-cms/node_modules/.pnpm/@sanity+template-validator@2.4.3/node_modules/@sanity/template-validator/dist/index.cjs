"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var local = require("./_chunks-cjs/local.cjs");
async function validateRemoteTemplate(baseUrl, headers = {}) {
  const fileReader = new local.GitHubFileReader(baseUrl, headers), packages = await local.getMonoRepo(fileReader) || [""];
  return local.validateTemplate(fileReader, packages);
}
exports.ENV_FILE = local.ENV_FILE;
exports.ENV_TEMPLATE_FILES = local.ENV_TEMPLATE_FILES;
exports.GitHubFileReader = local.GitHubFileReader;
exports.LocalFileReader = local.LocalFileReader;
exports.REQUIRED_ENV_VAR = local.REQUIRED_ENV_VAR;
exports.getMonoRepo = local.getMonoRepo;
exports.validateLocalTemplate = local.validateLocalTemplate;
exports.validateTemplate = local.validateTemplate;
exports.validateRemoteTemplate = validateRemoteTemplate;
//# sourceMappingURL=index.cjs.map
