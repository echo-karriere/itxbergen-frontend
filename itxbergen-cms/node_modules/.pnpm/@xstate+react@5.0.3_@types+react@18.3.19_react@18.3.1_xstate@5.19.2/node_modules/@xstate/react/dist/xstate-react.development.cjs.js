'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useIsomorphicLayoutEffect = require('use-isomorphic-layout-effect');
var xstate = require('xstate');
var withSelector = require('use-sync-external-store/shim/with-selector');
var shim = require('use-sync-external-store/shim');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var useIsomorphicLayoutEffect__default = /*#__PURE__*/_interopDefault(useIsomorphicLayoutEffect);

const forEachActor = (actorRef, callback) => {
  callback(actorRef);
  const children = actorRef.getSnapshot().children;
  if (children) {
    Object.values(children).forEach(child => {
      forEachActor(child, callback);
    });
  }
};
function stopRootWithRehydration(actorRef) {
  // persist snapshot here in a custom way allows us to persist inline actors and to preserve actor references
  // we do it to avoid setState in useEffect when the effect gets "reconnected"
  // this currently only happens in Strict Effects but it simulates the Offscreen aka Activity API
  // it also just allows us to end up with a somewhat more predictable behavior for the users
  const persistedSnapshots = [];
  forEachActor(actorRef, ref => {
    persistedSnapshots.push([ref, ref.getSnapshot()]);
    // muting observers allow us to avoid `useSelector` from being notified about the stopped snapshot
    // React reconnects its subscribers (from the useSyncExternalStore) on its own
    // and userland subscibers should basically always do the same anyway
    // as each subscription should have its own cleanup logic and that should be called each such reconnect
    ref.observers = new Set();
  });
  const systemSnapshot = actorRef.system.getSnapshot?.();
  actorRef.stop();
  actorRef.system._snapshot = systemSnapshot;
  persistedSnapshots.forEach(([ref, snapshot]) => {
    ref._processingStatus = 0;
    ref._snapshot = snapshot;
  });
}

function useIdleActorRef(logic, ...[options]) {
  let [[currentConfig, actorRef], setCurrent] = React.useState(() => {
    const actorRef = xstate.createActor(logic, options);
    return [logic.config, actorRef];
  });
  if (logic.config !== currentConfig) {
    const newActorRef = xstate.createActor(logic, {
      ...options,
      snapshot: actorRef.getPersistedSnapshot({
        __unsafeAllowInlineActors: true
      })
    });
    setCurrent([logic.config, newActorRef]);
    actorRef = newActorRef;
  }

  // TODO: consider using `useAsapEffect` that would do this in `useInsertionEffect` is that's available
  useIsomorphicLayoutEffect__default["default"](() => {
    actorRef.logic.implementations = logic.implementations;
  });
  return actorRef;
}
function useActorRef(machine, ...[options, observerOrListener]) {
  const actorRef = useIdleActorRef(machine, options);
  React.useEffect(() => {
    if (!observerOrListener) {
      return;
    }
    const sub = actorRef.subscribe(xstate.toObserver(observerOrListener));
    return () => {
      sub.unsubscribe();
    };
  }, [observerOrListener]);
  React.useEffect(() => {
    actorRef.start();
    return () => {
      stopRootWithRehydration(actorRef);
    };
  }, [actorRef]);
  return actorRef;
}

function defaultCompare(a, b) {
  return a === b;
}
function useSelector(actor, selector, compare = defaultCompare) {
  const subscribe = React.useCallback(handleStoreChange => {
    if (!actor) {
      return () => {};
    }
    const {
      unsubscribe
    } = actor.subscribe(handleStoreChange);
    return unsubscribe;
  }, [actor]);
  const boundGetSnapshot = React.useCallback(() => actor?.getSnapshot(), [actor]);
  const selectedSnapshot = withSelector.useSyncExternalStoreWithSelector(subscribe, boundGetSnapshot, boundGetSnapshot, selector, compare);
  return selectedSnapshot;
}

function createActorContext(actorLogic, actorOptions) {
  const ReactContext = /*#__PURE__*/React__namespace.createContext(null);
  const OriginalProvider = ReactContext.Provider;
  function Provider({
    children,
    logic: providedLogic = actorLogic,
    machine,
    options: providedOptions
  }) {
    if (machine) {
      throw new Error(`The "machine" prop has been deprecated. Please use "logic" instead.`);
    }
    const actor = useActorRef(providedLogic, {
      ...actorOptions,
      ...providedOptions
    });
    return /*#__PURE__*/React__namespace.createElement(OriginalProvider, {
      value: actor,
      children
    });
  }

  // TODO: add properties to actor ref to make more descriptive
  Provider.displayName = `ActorProvider`;
  function useContext() {
    const actor = React__namespace.useContext(ReactContext);
    if (!actor) {
      throw new Error(`You used a hook from "${Provider.displayName}" but it's not inside a <${Provider.displayName}> component.`);
    }
    return actor;
  }
  function useSelector$1(selector, compare) {
    const actor = useContext();
    return useSelector(actor, selector, compare);
  }
  return {
    Provider: Provider,
    useActorRef: useContext,
    useSelector: useSelector$1
  };
}

// From https://github.com/reduxjs/react-redux/blob/720f0ba79236cdc3e1115f4ef9a7760a21784b48/src/utils/shallowEqual.ts
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

function useActor(logic, ...[options]) {
  if (!!logic && 'send' in logic && typeof logic.send === 'function') {
    throw new Error(`useActor() expects actor logic (e.g. a machine), but received an ActorRef. Use the useSelector(actorRef, ...) hook instead to read the ActorRef's snapshot.`);
  }
  const actorRef = useIdleActorRef(logic, options);
  const getSnapshot = React.useCallback(() => {
    return actorRef.getSnapshot();
  }, [actorRef]);
  const subscribe = React.useCallback(handleStoreChange => {
    const {
      unsubscribe
    } = actorRef.subscribe(handleStoreChange);
    return unsubscribe;
  }, [actorRef]);
  const actorSnapshot = shim.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  React.useEffect(() => {
    actorRef.start();
    return () => {
      stopRootWithRehydration(actorRef);
    };
  }, [actorRef]);
  return [actorSnapshot, actorRef.send, actorRef];
}

/** @alias useActor */
function useMachine(machine, ...[options]) {
  return useActor(machine, options);
}

exports.createActorContext = createActorContext;
exports.shallowEqual = shallowEqual;
exports.useActor = useActor;
exports.useActorRef = useActorRef;
exports.useMachine = useMachine;
exports.useSelector = useSelector;
