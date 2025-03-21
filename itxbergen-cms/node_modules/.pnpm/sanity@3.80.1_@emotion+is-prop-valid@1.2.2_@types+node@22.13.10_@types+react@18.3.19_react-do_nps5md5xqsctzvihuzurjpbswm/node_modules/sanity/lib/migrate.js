"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var migrate = require("@sanity/migrate");
Object.keys(migrate).forEach(function(k) {
  k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k) && Object.defineProperty(exports, k, {
    enumerable: !0,
    get: function() {
      return migrate[k];
    }
  });
});
//# sourceMappingURL=migrate.js.map
