var __defProp = Object.defineProperty, __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __publicField = (obj, key, value) => __defNormalProp(obj, typeof key != "symbol" ? key + "" : key, value);
class ConcurrencyLimiter {
  constructor(max) {
    this.max = max, __publicField(this, "current", 0), __publicField(this, "resolvers", []), __publicField(this, "ready", () => this.max === 1 / 0 ? Promise.resolve() : this.current < this.max ? (this.current++, Promise.resolve()) : new Promise((resolve) => {
      this.resolvers.push(resolve);
    })), __publicField(this, "release", () => {
      if (this.max === 1 / 0) return;
      const nextResolver = this.resolvers.shift();
      if (nextResolver) {
        nextResolver();
        return;
      }
      this.current = Math.max(0, this.current - 1);
    });
  }
}
export {
  ConcurrencyLimiter
};
//# sourceMappingURL=concurrency-limiter.esm.js.map
