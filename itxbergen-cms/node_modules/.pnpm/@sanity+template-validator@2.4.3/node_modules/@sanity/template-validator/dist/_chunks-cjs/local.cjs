"use strict";
var fs = require("node:fs/promises"), path = require("node:path"), yaml = require("yaml");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var fs__default = /* @__PURE__ */ _interopDefaultCompat(fs), path__default = /* @__PURE__ */ _interopDefaultCompat(path);
class GitHubFileReader {
  constructor(baseUrl, headers = {}) {
    this.baseUrl = baseUrl, this.headers = headers;
  }
  async readFile(filePath) {
    const response = await fetch(`${this.baseUrl}/${filePath}`, { headers: this.headers });
    return {
      exists: response.status === 200,
      content: await response.text()
    };
  }
  async readDir(dirPath) {
    try {
      const url = new URL(this.baseUrl), [, owner, repo, branch, ...rest] = url.pathname.split("/"), dirSlug = path__default.default.join(`repos/${owner}/${repo}/contents`, ...rest, dirPath), apiUrl = new URL(dirSlug, "https://api.github.com");
      apiUrl.searchParams.set("ref", branch);
      const response = await fetch(apiUrl, { headers: this.headers });
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? data.filter((item) => item.type === "dir").map((item) => item.name) : [];
    } catch {
      return [];
    }
  }
}
class LocalFileReader {
  constructor(basePath) {
    this.basePath = basePath;
  }
  async readFile(filePath) {
    try {
      const fullPath = path__default.default.join(this.basePath, filePath);
      return {
        exists: !0,
        content: await fs__default.default.readFile(fullPath, "utf-8")
      };
    } catch {
      return {
        exists: !1,
        content: ""
      };
    }
  }
  async readDir(dirPath) {
    try {
      const fullPath = path__default.default.join(this.basePath, dirPath);
      return (await fs__default.default.readdir(fullPath, { withFileTypes: !0 })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    } catch {
      return [];
    }
  }
}
const REQUIRED_ENV_VAR = {
  PROJECT_ID: /SANITY(?:_STUDIO)?_PROJECT_ID/,
  DATASET: /SANITY(?:_STUDIO)?_DATASET/
}, ENV_FILE = {
  TEMPLATE: ".env.template",
  EXAMPLE: ".env.example",
  LOCAL_EXAMPLE: ".env.local.example",
  LOCAL_TEMPLATE: ".env.local.template"
}, ENV_TEMPLATE_FILES = [
  ENV_FILE.TEMPLATE,
  ENV_FILE.EXAMPLE,
  ENV_FILE.LOCAL_EXAMPLE,
  ENV_FILE.LOCAL_TEMPLATE
], ROOT_PACKAGE_NAME = "root package";
async function getMonoRepo(fileReader) {
  const expandWildcards = async (patterns) => Promise.all(
    patterns.map(async (pattern) => {
      if (!pattern.includes("*")) return pattern.replace(/\/$/, "");
      const baseDir = pattern.split("/*")[0].replace(/\/$/, "");
      return (await fileReader.readDir(baseDir).catch(() => [])).map((dir) => path.join(baseDir, dir));
    })
  ).then((results) => results.flat()), handlers = {
    "package.json": {
      check: async (content) => {
        try {
          const pkg = JSON.parse(content);
          if (!pkg.workspaces) return;
          const patterns = Array.isArray(pkg.workspaces) ? pkg.workspaces : pkg.workspaces.packages;
          return patterns ? await expandWildcards(patterns) : void 0;
        } catch {
          return;
        }
      }
    },
    "pnpm-workspace.yaml": {
      check: async (content) => {
        try {
          const config = yaml.parse(content);
          return config.packages ? await expandWildcards(config.packages) : void 0;
        } catch {
          return;
        }
      }
    },
    "lerna.json": {
      check: async (content) => {
        try {
          const config = JSON.parse(content);
          return config.packages ? await expandWildcards(config.packages) : void 0;
        } catch {
          return;
        }
      }
    },
    "rush.json": {
      check: async (content) => {
        try {
          return JSON.parse(content).projects?.map((p) => p.packageName);
        } catch {
          return;
        }
      }
    }
  }, fileChecks = await Promise.all(
    Object.keys(handlers).map(async (file) => {
      const result = await fileReader.readFile(file);
      return { file, ...result };
    })
  );
  for (const check of fileChecks) {
    if (!check.exists) continue;
    const result = await handlers[check.file].check(check.content);
    if (result) return result;
  }
}
async function validatePackage(fileReader, packagePath) {
  const packageName = packagePath || ROOT_PACKAGE_NAME, errors = [], requiredFiles = [
    "package.json",
    "sanity.config.ts",
    "sanity.config.js",
    "sanity.config.tsx",
    "sanity.cli.ts",
    "sanity.cli.js",
    ...ENV_TEMPLATE_FILES
  ], fileChecks = await Promise.all(
    requiredFiles.map(async (file) => {
      const filePath = packagePath ? path.join(packagePath, file) : file, result = await fileReader.readFile(filePath);
      return { file, ...result };
    })
  ), packageJson = fileChecks.find((f) => f.file === "package.json");
  packageJson?.exists || errors.push(`Package at ${packageName} must include a package.json file`);
  let hasSanityDep = !1;
  if (packageJson?.exists)
    try {
      const pkg = JSON.parse(packageJson.content);
      hasSanityDep = !!(pkg.dependencies?.sanity || pkg.dependencies?.["next-sanity"] || pkg.dependencies?.["@sanity/client"]);
    } catch {
      errors.push(`Invalid package.json file in ${packageName}`);
    }
  const hasSanityConfig = fileChecks.some(
    ({ exists, file }) => exists && (file === "sanity.config.ts" || file === "sanity.config.js" || file === "sanity.config.tsx")
  ), hasSanityCli = fileChecks.some(
    ({ exists, file }) => exists && (file === "sanity.cli.ts" || file === "sanity.cli.js")
  ), envFile = fileChecks.find(
    ({ exists, file }) => exists && ENV_TEMPLATE_FILES.includes(file)
  );
  if (envFile) {
    const envContent = envFile.content;
    /\w+\s+=/.test(envContent) && errors.push(
      `Environment template in ${packageName} contains invalid environment variable syntax. Please see https://dotenvx.com/docs/env-file for proper formatting.`
    );
    for (const [name, pattern] of Object.entries(REQUIRED_ENV_VAR))
      envContent.match(pattern) || errors.push(`Environment template in ${packageName} is missing required variable: ${name}`);
  }
  return {
    hasSanityConfig,
    hasSanityCli,
    hasEnvFile: !!envFile,
    hasSanityDep,
    errors
  };
}
async function validateTemplate(fileReader, packages = [""]) {
  const errors = [], validations = await Promise.all(packages.map((pkg) => validatePackage(fileReader, pkg)));
  for (const v of validations)
    errors.push(...v.errors);
  validations.some((v) => v.hasSanityDep) || errors.push('At least one package must include "sanity" as a dependency in package.json'), validations.some((v) => v.hasSanityConfig) || errors.push("At least one package must include a sanity.config.[js|ts|tsx] file"), validations.some((v) => v.hasSanityCli) || errors.push("At least one package must include a sanity.cli.[js|ts] file");
  const missingEnvTemplates = packages.filter((_, i) => validations[i].hasSanityDep && !validations[i].hasEnvFile).map((p) => p || ROOT_PACKAGE_NAME), envExamples = ENV_TEMPLATE_FILES.join(", "), missingTemplatesStr = missingEnvTemplates.join(", ");
  return missingEnvTemplates.length ? errors.push(`Missing env template in packages: ${missingTemplatesStr}. [${envExamples}]`) : validations.some((v) => v.hasEnvFile) || errors.push(`At least one package must include an env template file [${envExamples}]`), {
    isValid: errors.length === 0,
    errors
  };
}
async function validateLocalTemplate(directory) {
  const fileReader = new LocalFileReader(directory), packages = await getMonoRepo(fileReader) || [""];
  return validateTemplate(fileReader, packages);
}
exports.ENV_FILE = ENV_FILE;
exports.ENV_TEMPLATE_FILES = ENV_TEMPLATE_FILES;
exports.GitHubFileReader = GitHubFileReader;
exports.LocalFileReader = LocalFileReader;
exports.REQUIRED_ENV_VAR = REQUIRED_ENV_VAR;
exports.getMonoRepo = getMonoRepo;
exports.validateLocalTemplate = validateLocalTemplate;
exports.validateTemplate = validateTemplate;
//# sourceMappingURL=local.cjs.map
