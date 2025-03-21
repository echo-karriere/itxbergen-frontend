function createPubSub() {
  const subscribers = /* @__PURE__ */ Object.create(null);
  let nextId = 0;
  function subscribe(subscriber) {
    const id = nextId++;
    return subscribers[id] = subscriber, function() {
      delete subscribers[id];
    };
  }
  function publish(event) {
    for (const id in subscribers)
      subscribers[id](event);
  }
  return {
    publish,
    subscribe
  };
}
export {
  createPubSub as default
};
//# sourceMappingURL=index.js.map
