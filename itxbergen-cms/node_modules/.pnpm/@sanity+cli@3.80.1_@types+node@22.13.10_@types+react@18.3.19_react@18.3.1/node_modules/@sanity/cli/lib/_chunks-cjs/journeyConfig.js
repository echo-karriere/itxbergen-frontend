"use strict";
var fs = require("node:fs/promises"), path = require("node:path"), node_worker_threads = require("node:worker_threads"), prettier = require("prettier"), cliWorker = require("./cliWorker.js");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var fs__default = /* @__PURE__ */ _interopDefaultCompat(fs), path__default = /* @__PURE__ */ _interopDefaultCompat(path);
async function getAndWriteJourneySchema(data) {
  const { schemasPath, useTypeScript, schemaUrl } = data;
  try {
    const documentTypes = await fetchJourneySchema(schemaUrl), fileExtension = useTypeScript ? "ts" : "js";
    for (const documentType of documentTypes) {
      const filePath = path__default.default.join(schemasPath, `${documentType.name}.${fileExtension}`);
      await fs__default.default.writeFile(filePath, await assembleJourneySchemaTypeFileContent(documentType));
    }
    const indexContent = await assembleJourneyIndexContent(documentTypes);
    await fs__default.default.writeFile(path__default.default.join(schemasPath, `index.${fileExtension}`), indexContent);
  } catch (error) {
    throw new Error(`Failed to fetch remote schema: ${error.message}`);
  }
}
async function getAndWriteJourneySchemaWorker(workerData) {
  const workerPath = await cliWorker.getCliWorkerPath("getAndWriteJourneySchema");
  return new Promise((resolve, reject) => {
    const worker = new node_worker_threads.Worker(workerPath, {
      workerData,
      env: {
        // eslint-disable-next-line no-process-env
        ...process.env,
        // Dynamic HTTPS imports are currently behind a Node flag
        NODE_OPTIONS: "--experimental-network-imports",
        NODE_NO_WARNINGS: "1"
      }
    });
    worker.on("message", (message) => {
      message.type === "success" ? resolve() : (message.error.message = `Import schema worker failed: ${message.error.message}`, reject(message.error));
    }), worker.on("error", (error) => {
      error.message = `Import schema worker failed: ${error.message}`, reject(error);
    }), worker.on("exit", (code) => {
      code !== 0 && reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
async function fetchJourneyConfig(apiClient, projectId) {
  if (!projectId)
    throw new Error("ProjectId is required");
  if (!/^[a-zA-Z0-9-]+$/.test(projectId))
    throw new Error("Invalid projectId");
  try {
    const response = await apiClient({
      requireUser: !0,
      requireProject: !0,
      api: { projectId }
    }).config({ apiVersion: "v2024-02-23" }).request({
      method: "GET",
      uri: `/journey/projects/${projectId}`
    });
    return {
      projectId: response.projectId,
      datasetName: response.dataset,
      displayName: response.displayName || "Sanity Project",
      // The endpoint returns a signed URL that can be used to fetch the schema as ESM
      schemaUrl: response.schemaUrl,
      isFirstProject: !0
    };
  } catch {
    throw new Error(`Failed to fetch remote schema config: ${projectId}`);
  }
}
async function fetchJourneySchema(schemaUrl) {
  try {
    return (await import(schemaUrl)).default;
  } catch {
    throw new Error(`Failed to fetch remote schema: ${schemaUrl}`);
  }
}
async function assembleJourneySchemaTypeFileContent(schemaType) {
  const serialised = wrapSchemaTypeInHelpers(schemaType), imports = getImports(serialised), prettifiedSchemaType = await prettier.format(serialised, {
    parser: "typescript",
    printWidth: 40
  });
  return `${imports}

export const ${schemaType.name} = ${prettifiedSchemaType}
`;
}
function assembleJourneyIndexContent(schemas) {
  const sortedSchema = schemas.slice().sort((a, b) => a.name > b.name ? 1 : -1), imports = sortedSchema.map((schema) => `import { ${schema.name} } from './${schema.name}'`), exports2 = sortedSchema.map((schema) => schema.name).join(","), fileContents = `${imports.join(`
`)}

export const schemaTypes = [${exports2}]`;
  return prettier.format(fileContents, { parser: "typescript" });
}
function getImports(schemaType) {
  const defaultImports = ["defineType", "defineField"];
  return schemaType.includes("defineArrayMember") && defaultImports.push("defineArrayMember"), `import { ${defaultImports.join(", ")} } from 'sanity'`;
}
function wrapSchemaTypeInHelpers(schemaType, root = !0) {
  if (root)
    return generateSchemaDefinition(schemaType, "defineType");
  if (schemaType.type === "array")
    return `${generateSchemaDefinition(schemaType, "defineField")},`;
  return `${generateSchemaDefinition(schemaType, "defineField")},`;
  function generateSchemaDefinition(object, definitionType) {
    const { fields, preview, of, ...otherProperties } = object, serializedProps = serialize(otherProperties), fieldsDef = fields && `fields: [${fields.map((f) => wrapSchemaTypeInHelpers(f, !1)).join("")}]`, ofDef = of && `of: [${of.map((f) => `defineArrayMember({${serialize(f)}})`).join(",")}]`, previewDef = preview && `preview: {${serialize(preview)}}`, combinedDefinitions = [serializedProps, fieldsDef, ofDef, previewDef].filter(Boolean).join(",");
    return `${definitionType}({ ${combinedDefinitions} })`;
  }
  function serialize(obj) {
    return Object.entries(obj).map(([key, value]) => key === "prepare" ? `${value.toString()}` : typeof value == "string" ? `${key}: "${value}"` : typeof value == "object" ? `${key}: ${JSON.stringify(value)}` : `${key}: ${value}`).join(",");
  }
}
exports.fetchJourneyConfig = fetchJourneyConfig;
exports.getAndWriteJourneySchema = getAndWriteJourneySchema;
exports.getAndWriteJourneySchemaWorker = getAndWriteJourneySchemaWorker;
//# sourceMappingURL=journeyConfig.js.map
