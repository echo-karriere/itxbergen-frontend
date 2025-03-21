"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
function createSafeJsonParser({ errorLabel }) {
  return function(line) {
    try {
      return JSON.parse(line);
    } catch (err) {
      const errorPosition = line.lastIndexOf('{"error":');
      if (errorPosition === -1)
        throw err.message = `${err.message} (${line})`, err;
      const errorJson = line.slice(errorPosition), errorLine = JSON.parse(errorJson), error = errorLine && errorLine.error;
      throw error && error.description ? new Error(`${errorLabel}: ${error.description}

${errorJson}
`) : err;
    }
  };
}
exports.createSafeJsonParser = createSafeJsonParser;
//# sourceMappingURL=createSafeJsonParser.js.map
