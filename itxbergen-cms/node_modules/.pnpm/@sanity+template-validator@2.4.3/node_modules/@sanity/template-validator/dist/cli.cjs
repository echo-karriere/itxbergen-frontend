#!/usr/bin/env node
"use strict";
var local = require("./_chunks-cjs/local.cjs");
async function validateWithCli() {
  const directory = process.argv[2] || process.cwd();
  try {
    const result = await local.validateLocalTemplate(directory);
    if (result.isValid)
      console.log("Template validated successfully");
    else {
      console.error("Validation failed:");
      for (const error of result.errors)
        console.error(`- ${error}`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Validation failed:", error), process.exit(1);
  }
}
validateWithCli();
//# sourceMappingURL=cli.cjs.map
