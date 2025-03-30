"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var rxjs = require("rxjs"), concurrencyLimiter = require("./concurrency-limiter.js");
function createClientConcurrencyLimiter(maxConcurrency) {
  const limiter = new concurrencyLimiter.ConcurrencyLimiter(maxConcurrency);
  function wrapClient(client) {
    return new Proxy(client, {
      get: (target, property) => {
        switch (property) {
          case "fetch":
            return async (...args) => {
              await limiter.ready();
              try {
                return await target.fetch(...args);
              } finally {
                limiter.release();
              }
            };
          case "clone":
            return (...args) => wrapClient(target.clone(...args));
          case "config":
            return (...args) => {
              const result = target.config(...args);
              return args[0] ? wrapClient(result) : result;
            };
          case "withConfig":
            return (...args) => wrapClient(target.withConfig(...args));
          case "observable":
            return wrapObservableClient(target.observable);
          default:
            return target[property];
        }
      }
    });
  }
  function wrapObservableClient(observableSanityClient) {
    return new Proxy(observableSanityClient, {
      get: (target, property) => {
        switch (property) {
          case "fetch":
            return (...args) => rxjs.from(limiter.ready()).pipe(
              rxjs.switchMap(() => target.fetch(...args)),
              rxjs.finalize(() => limiter.release())
            );
          case "clone":
            return (...args) => wrapObservableClient(target.clone(...args));
          case "config":
            return (...args) => {
              const result = target.config(...args);
              return args[0] ? wrapObservableClient(result) : result;
            };
          case "withConfig":
            return (...args) => wrapObservableClient(target.withConfig(...args));
          default:
            return target[property];
        }
      }
    });
  }
  return wrapClient;
}
exports.createClientConcurrencyLimiter = createClientConcurrencyLimiter;
//# sourceMappingURL=client.js.map
