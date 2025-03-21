import { from, switchMap, finalize } from "rxjs";
import { ConcurrencyLimiter } from "./concurrency-limiter.mjs";
function createClientConcurrencyLimiter(maxConcurrency) {
  const limiter = new ConcurrencyLimiter(maxConcurrency);
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
            return (...args) => from(limiter.ready()).pipe(
              switchMap(() => target.fetch(...args)),
              finalize(() => limiter.release())
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
export {
  createClientConcurrencyLimiter
};
//# sourceMappingURL=client.mjs.map
