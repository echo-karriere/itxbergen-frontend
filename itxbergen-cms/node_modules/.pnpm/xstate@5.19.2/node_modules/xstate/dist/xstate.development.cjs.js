'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var actors_dist_xstateActors = require('../actors/dist/xstate-actors.development.cjs.js');
var guards_dist_xstateGuards = require('./raise-4acdb210.development.cjs.js');
var log = require('./log-8aa651a0.development.cjs.js');
require('../dev/dist/xstate-dev.development.cjs.js');

/**
 * Asserts that the given event object is of the specified type or types. Throws
 * an error if the event object is not of the specified types.
 *
 * @example
 *
 * ```ts
 * // ...
 * entry: ({ event }) => {
 *   assertEvent(event, 'doNothing');
 *   // event is { type: 'doNothing' }
 * },
 * // ...
 * exit: ({ event }) => {
 *   assertEvent(event, 'greet');
 *   // event is { type: 'greet'; message: string }
 *
 *   assertEvent(event, ['greet', 'notify']);
 *   // event is { type: 'greet'; message: string }
 *   // or { type: 'notify'; message: string; level: 'info' | 'error' }
 * },
 * ```
 */
function assertEvent(event, type) {
  const types = guards_dist_xstateGuards.toArray(type);
  if (!types.includes(event.type)) {
    const typesText = types.length === 1 ? `type "${types[0]}"` : `one of types "${types.join('", "')}"`;
    throw new Error(`Expected event ${JSON.stringify(event)} to have ${typesText}`);
  }
}

const cache = new WeakMap();
function memo(object, key, fn) {
  let memoizedData = cache.get(object);
  if (!memoizedData) {
    memoizedData = {
      [key]: fn()
    };
    cache.set(object, memoizedData);
  } else if (!(key in memoizedData)) {
    memoizedData[key] = fn();
  }
  return memoizedData[key];
}

const EMPTY_OBJECT = {};
const toSerializableAction = action => {
  if (typeof action === 'string') {
    return {
      type: action
    };
  }
  if (typeof action === 'function') {
    if ('resolve' in action) {
      return {
        type: action.type
      };
    }
    return {
      type: action.name
    };
  }
  return action;
};
class StateNode {
  constructor(/** The raw config used to create the machine. */
  config, options) {
    this.config = config;
    /**
     * The relative key of the state node, which represents its location in the
     * overall state value.
     */
    this.key = void 0;
    /** The unique ID of the state node. */
    this.id = void 0;
    /**
     * The type of this state node:
     *
     * - `'atomic'` - no child state nodes
     * - `'compound'` - nested child state nodes (XOR)
     * - `'parallel'` - orthogonal nested child state nodes (AND)
     * - `'history'` - history state node
     * - `'final'` - final state node
     */
    this.type = void 0;
    /** The string path from the root machine node to this node. */
    this.path = void 0;
    /** The child state nodes. */
    this.states = void 0;
    /**
     * The type of history on this state node. Can be:
     *
     * - `'shallow'` - recalls only top-level historical state value
     * - `'deep'` - recalls historical state value at all levels
     */
    this.history = void 0;
    /** The action(s) to be executed upon entering the state node. */
    this.entry = void 0;
    /** The action(s) to be executed upon exiting the state node. */
    this.exit = void 0;
    /** The parent state node. */
    this.parent = void 0;
    /** The root machine node. */
    this.machine = void 0;
    /**
     * The meta data associated with this state node, which will be returned in
     * State instances.
     */
    this.meta = void 0;
    /**
     * The output data sent with the "xstate.done.state._id_" event if this is a
     * final state node.
     */
    this.output = void 0;
    /**
     * The order this state node appears. Corresponds to the implicit document
     * order.
     */
    this.order = -1;
    this.description = void 0;
    this.tags = [];
    this.transitions = void 0;
    this.always = void 0;
    this.parent = options._parent;
    this.key = options._key;
    this.machine = options._machine;
    this.path = this.parent ? this.parent.path.concat(this.key) : [];
    this.id = this.config.id || [this.machine.id, ...this.path].join(guards_dist_xstateGuards.STATE_DELIMITER);
    this.type = this.config.type || (this.config.states && Object.keys(this.config.states).length ? 'compound' : this.config.history ? 'history' : 'atomic');
    this.description = this.config.description;
    this.order = this.machine.idMap.size;
    this.machine.idMap.set(this.id, this);
    this.states = this.config.states ? guards_dist_xstateGuards.mapValues(this.config.states, (stateConfig, key) => {
      const stateNode = new StateNode(stateConfig, {
        _parent: this,
        _key: key,
        _machine: this.machine
      });
      return stateNode;
    }) : EMPTY_OBJECT;
    if (this.type === 'compound' && !this.config.initial) {
      throw new Error(`No initial state specified for compound state node "#${this.id}". Try adding { initial: "${Object.keys(this.states)[0]}" } to the state config.`);
    }

    // History config
    this.history = this.config.history === true ? 'shallow' : this.config.history || false;
    this.entry = guards_dist_xstateGuards.toArray(this.config.entry).slice();
    this.exit = guards_dist_xstateGuards.toArray(this.config.exit).slice();
    this.meta = this.config.meta;
    this.output = this.type === 'final' || !this.parent ? this.config.output : undefined;
    this.tags = guards_dist_xstateGuards.toArray(config.tags).slice();
  }

  /** @internal */
  _initialize() {
    this.transitions = guards_dist_xstateGuards.formatTransitions(this);
    if (this.config.always) {
      this.always = guards_dist_xstateGuards.toTransitionConfigArray(this.config.always).map(t => guards_dist_xstateGuards.formatTransition(this, guards_dist_xstateGuards.NULL_EVENT, t));
    }
    Object.keys(this.states).forEach(key => {
      this.states[key]._initialize();
    });
  }

  /** The well-structured state node definition. */
  get definition() {
    return {
      id: this.id,
      key: this.key,
      version: this.machine.version,
      type: this.type,
      initial: this.initial ? {
        target: this.initial.target,
        source: this,
        actions: this.initial.actions.map(toSerializableAction),
        eventType: null,
        reenter: false,
        toJSON: () => ({
          target: this.initial.target.map(t => `#${t.id}`),
          source: `#${this.id}`,
          actions: this.initial.actions.map(toSerializableAction),
          eventType: null
        })
      } : undefined,
      history: this.history,
      states: guards_dist_xstateGuards.mapValues(this.states, state => {
        return state.definition;
      }),
      on: this.on,
      transitions: [...this.transitions.values()].flat().map(t => ({
        ...t,
        actions: t.actions.map(toSerializableAction)
      })),
      entry: this.entry.map(toSerializableAction),
      exit: this.exit.map(toSerializableAction),
      meta: this.meta,
      order: this.order || -1,
      output: this.output,
      invoke: this.invoke,
      description: this.description,
      tags: this.tags
    };
  }

  /** @internal */
  toJSON() {
    return this.definition;
  }

  /** The logic invoked as actors by this state node. */
  get invoke() {
    return memo(this, 'invoke', () => guards_dist_xstateGuards.toArray(this.config.invoke).map((invokeConfig, i) => {
      const {
        src,
        systemId
      } = invokeConfig;
      const resolvedId = invokeConfig.id ?? guards_dist_xstateGuards.createInvokeId(this.id, i);
      const sourceName = typeof src === 'string' ? src : `xstate.invoke.${guards_dist_xstateGuards.createInvokeId(this.id, i)}`;
      return {
        ...invokeConfig,
        src: sourceName,
        id: resolvedId,
        systemId: systemId,
        toJSON() {
          const {
            onDone,
            onError,
            ...invokeDefValues
          } = invokeConfig;
          return {
            ...invokeDefValues,
            type: 'xstate.invoke',
            src: sourceName,
            id: resolvedId
          };
        }
      };
    }));
  }

  /** The mapping of events to transitions. */
  get on() {
    return memo(this, 'on', () => {
      const transitions = this.transitions;
      return [...transitions].flatMap(([descriptor, t]) => t.map(t => [descriptor, t])).reduce((map, [descriptor, transition]) => {
        map[descriptor] = map[descriptor] || [];
        map[descriptor].push(transition);
        return map;
      }, {});
    });
  }
  get after() {
    return memo(this, 'delayedTransitions', () => guards_dist_xstateGuards.getDelayedTransitions(this));
  }
  get initial() {
    return memo(this, 'initial', () => guards_dist_xstateGuards.formatInitialTransition(this, this.config.initial));
  }

  /** @internal */
  next(snapshot, event) {
    const eventType = event.type;
    const actions = [];
    let selectedTransition;
    const candidates = memo(this, `candidates-${eventType}`, () => guards_dist_xstateGuards.getCandidates(this, eventType));
    for (const candidate of candidates) {
      const {
        guard
      } = candidate;
      const resolvedContext = snapshot.context;
      let guardPassed = false;
      try {
        guardPassed = !guard || guards_dist_xstateGuards.evaluateGuard(guard, resolvedContext, event, snapshot);
      } catch (err) {
        const guardType = typeof guard === 'string' ? guard : typeof guard === 'object' ? guard.type : undefined;
        throw new Error(`Unable to evaluate guard ${guardType ? `'${guardType}' ` : ''}in transition for event '${eventType}' in state node '${this.id}':\n${err.message}`);
      }
      if (guardPassed) {
        actions.push(...candidate.actions);
        selectedTransition = candidate;
        break;
      }
    }
    return selectedTransition ? [selectedTransition] : undefined;
  }

  /** All the event types accepted by this state node and its descendants. */
  get events() {
    return memo(this, 'events', () => {
      const {
        states
      } = this;
      const events = new Set(this.ownEvents);
      if (states) {
        for (const stateId of Object.keys(states)) {
          const state = states[stateId];
          if (state.states) {
            for (const event of state.events) {
              events.add(`${event}`);
            }
          }
        }
      }
      return Array.from(events);
    });
  }

  /**
   * All the events that have transitions directly from this state node.
   *
   * Excludes any inert events.
   */
  get ownEvents() {
    const events = new Set([...this.transitions.keys()].filter(descriptor => {
      return this.transitions.get(descriptor).some(transition => !(!transition.target && !transition.actions.length && !transition.reenter));
    }));
    return Array.from(events);
  }
}

const STATE_IDENTIFIER = '#';
class StateMachine {
  constructor(/** The raw config used to create the machine. */
  config, implementations) {
    this.config = config;
    /** The machine's own version. */
    this.version = void 0;
    this.schemas = void 0;
    this.implementations = void 0;
    /** @internal */
    this.__xstatenode = true;
    /** @internal */
    this.idMap = new Map();
    this.root = void 0;
    this.id = void 0;
    this.states = void 0;
    this.events = void 0;
    this.id = config.id || '(machine)';
    this.implementations = {
      actors: implementations?.actors ?? {},
      actions: implementations?.actions ?? {},
      delays: implementations?.delays ?? {},
      guards: implementations?.guards ?? {}
    };
    this.version = this.config.version;
    this.schemas = this.config.schemas;
    this.transition = this.transition.bind(this);
    this.getInitialSnapshot = this.getInitialSnapshot.bind(this);
    this.getPersistedSnapshot = this.getPersistedSnapshot.bind(this);
    this.restoreSnapshot = this.restoreSnapshot.bind(this);
    this.start = this.start.bind(this);
    this.root = new StateNode(config, {
      _key: this.id,
      _machine: this
    });
    this.root._initialize();
    this.states = this.root.states; // TODO: remove!
    this.events = this.root.events;
    if (!('output' in this.root) && Object.values(this.states).some(state => state.type === 'final' && 'output' in state)) {
      console.warn('Missing `machine.output` declaration (top-level final state with output detected)');
    }
  }

  /**
   * Clones this state machine with the provided implementations and merges the
   * `context` (if provided).
   *
   * @param implementations Options (`actions`, `guards`, `actors`, `delays`,
   *   `context`) to recursively merge with the existing options.
   * @returns A new `StateMachine` instance with the provided implementations.
   */
  provide(implementations) {
    const {
      actions,
      guards,
      actors,
      delays
    } = this.implementations;
    return new StateMachine(this.config, {
      actions: {
        ...actions,
        ...implementations.actions
      },
      guards: {
        ...guards,
        ...implementations.guards
      },
      actors: {
        ...actors,
        ...implementations.actors
      },
      delays: {
        ...delays,
        ...implementations.delays
      }
    });
  }
  resolveState(config) {
    const resolvedStateValue = guards_dist_xstateGuards.resolveStateValue(this.root, config.value);
    const nodeSet = guards_dist_xstateGuards.getAllStateNodes(guards_dist_xstateGuards.getStateNodes(this.root, resolvedStateValue));
    return guards_dist_xstateGuards.createMachineSnapshot({
      _nodes: [...nodeSet],
      context: config.context || {},
      children: {},
      status: guards_dist_xstateGuards.isInFinalState(nodeSet, this.root) ? 'done' : config.status || 'active',
      output: config.output,
      error: config.error,
      historyValue: config.historyValue
    }, this);
  }

  /**
   * Determines the next snapshot given the current `snapshot` and received
   * `event`. Calculates a full macrostep from all microsteps.
   *
   * @param snapshot The current snapshot
   * @param event The received event
   */
  transition(snapshot, event, actorScope) {
    return guards_dist_xstateGuards.macrostep(snapshot, event, actorScope, []).snapshot;
  }

  /**
   * Determines the next state given the current `state` and `event`. Calculates
   * a microstep.
   *
   * @param state The current state
   * @param event The received event
   */
  microstep(snapshot, event, actorScope) {
    return guards_dist_xstateGuards.macrostep(snapshot, event, actorScope, []).microstates;
  }
  getTransitionData(snapshot, event) {
    return guards_dist_xstateGuards.transitionNode(this.root, snapshot.value, snapshot, event) || [];
  }

  /**
   * The initial state _before_ evaluating any microsteps. This "pre-initial"
   * state is provided to initial actions executed in the initial state.
   */
  getPreInitialState(actorScope, initEvent, internalQueue) {
    const {
      context
    } = this.config;
    const preInitial = guards_dist_xstateGuards.createMachineSnapshot({
      context: typeof context !== 'function' && context ? context : {},
      _nodes: [this.root],
      children: {},
      status: 'active'
    }, this);
    if (typeof context === 'function') {
      const assignment = ({
        spawn,
        event,
        self
      }) => context({
        spawn,
        input: event.input,
        self
      });
      return guards_dist_xstateGuards.resolveActionsAndContext(preInitial, initEvent, actorScope, [log.assign(assignment)], internalQueue, undefined);
    }
    return preInitial;
  }

  /**
   * Returns the initial `State` instance, with reference to `self` as an
   * `ActorRef`.
   */
  getInitialSnapshot(actorScope, input) {
    const initEvent = guards_dist_xstateGuards.createInitEvent(input); // TODO: fix;
    const internalQueue = [];
    const preInitialState = this.getPreInitialState(actorScope, initEvent, internalQueue);
    const nextState = guards_dist_xstateGuards.microstep([{
      target: [...guards_dist_xstateGuards.getInitialStateNodes(this.root)],
      source: this.root,
      reenter: true,
      actions: [],
      eventType: null,
      toJSON: null // TODO: fix
    }], preInitialState, actorScope, initEvent, true, internalQueue);
    const {
      snapshot: macroState
    } = guards_dist_xstateGuards.macrostep(nextState, initEvent, actorScope, internalQueue);
    return macroState;
  }
  start(snapshot) {
    Object.values(snapshot.children).forEach(child => {
      if (child.getSnapshot().status === 'active') {
        child.start();
      }
    });
  }
  getStateNodeById(stateId) {
    const fullPath = guards_dist_xstateGuards.toStatePath(stateId);
    const relativePath = fullPath.slice(1);
    const resolvedStateId = guards_dist_xstateGuards.isStateId(fullPath[0]) ? fullPath[0].slice(STATE_IDENTIFIER.length) : fullPath[0];
    const stateNode = this.idMap.get(resolvedStateId);
    if (!stateNode) {
      throw new Error(`Child state node '#${resolvedStateId}' does not exist on machine '${this.id}'`);
    }
    return guards_dist_xstateGuards.getStateNodeByPath(stateNode, relativePath);
  }
  get definition() {
    return this.root.definition;
  }
  toJSON() {
    return this.definition;
  }
  getPersistedSnapshot(snapshot, options) {
    return guards_dist_xstateGuards.getPersistedSnapshot(snapshot, options);
  }
  restoreSnapshot(snapshot, _actorScope) {
    const children = {};
    const snapshotChildren = snapshot.children;
    Object.keys(snapshotChildren).forEach(actorId => {
      const actorData = snapshotChildren[actorId];
      const childState = actorData.snapshot;
      const src = actorData.src;
      const logic = typeof src === 'string' ? guards_dist_xstateGuards.resolveReferencedActor(this, src) : src;
      if (!logic) {
        return;
      }
      const actorRef = guards_dist_xstateGuards.createActor(logic, {
        id: actorId,
        parent: _actorScope.self,
        syncSnapshot: actorData.syncSnapshot,
        snapshot: childState,
        src,
        systemId: actorData.systemId
      });
      children[actorId] = actorRef;
    });
    const restoredSnapshot = guards_dist_xstateGuards.createMachineSnapshot({
      ...snapshot,
      children,
      _nodes: Array.from(guards_dist_xstateGuards.getAllStateNodes(guards_dist_xstateGuards.getStateNodes(this.root, snapshot.value)))
    }, this);
    const seen = new Set();
    function reviveContext(contextPart, children) {
      if (seen.has(contextPart)) {
        return;
      }
      seen.add(contextPart);
      for (const key in contextPart) {
        const value = contextPart[key];
        if (value && typeof value === 'object') {
          if ('xstate$$type' in value && value.xstate$$type === guards_dist_xstateGuards.$$ACTOR_TYPE) {
            contextPart[key] = children[value.id];
            continue;
          }
          reviveContext(value, children);
        }
      }
    }
    reviveContext(restoredSnapshot.context, children);
    return restoredSnapshot;
  }
}

/**
 * Creates a state machine (statechart) with the given configuration.
 *
 * The state machine represents the pure logic of a state machine actor.
 *
 * @example
 *
 * ```ts
 * import { createMachine } from 'xstate';
 *
 * const lightMachine = createMachine({
 *   id: 'light',
 *   initial: 'green',
 *   states: {
 *     green: {
 *       on: {
 *         TIMER: { target: 'yellow' }
 *       }
 *     },
 *     yellow: {
 *       on: {
 *         TIMER: { target: 'red' }
 *       }
 *     },
 *     red: {
 *       on: {
 *         TIMER: { target: 'green' }
 *       }
 *     }
 *   }
 * });
 *
 * const lightActor = createActor(lightMachine);
 * lightActor.start();
 *
 * lightActor.send({ type: 'TIMER' });
 * ```
 *
 * @param config The state machine configuration.
 * @param options DEPRECATED: use `setup({ ... })` or `machine.provide({ ... })`
 *   to provide machine implementations instead.
 */
function createMachine(config, implementations) {
  return new StateMachine(config, implementations);
}

/** @internal */
function createInertActorScope(actorLogic) {
  const self = guards_dist_xstateGuards.createActor(actorLogic);
  const inertActorScope = {
    self,
    defer: () => {},
    id: '',
    logger: () => {},
    sessionId: '',
    stopChild: () => {},
    system: self.system,
    emit: () => {},
    actionExecutor: () => {}
  };
  return inertActorScope;
}

/** @deprecated Use `initialTransition(…)` instead. */
function getInitialSnapshot(actorLogic, ...[input]) {
  const actorScope = createInertActorScope(actorLogic);
  return actorLogic.getInitialSnapshot(actorScope, input);
}

/**
 * Determines the next snapshot for the given `actorLogic` based on the given
 * `snapshot` and `event`.
 *
 * If the `snapshot` is `undefined`, the initial snapshot of the `actorLogic` is
 * used.
 *
 * @deprecated Use `transition(…)` instead.
 * @example
 *
 * ```ts
 * import { getNextSnapshot } from 'xstate';
 * import { trafficLightMachine } from './trafficLightMachine.ts';
 *
 * const nextSnapshot = getNextSnapshot(
 *   trafficLightMachine, // actor logic
 *   undefined, // snapshot (or initial state if undefined)
 *   { type: 'TIMER' }
 * ); // event object
 *
 * console.log(nextSnapshot.value);
 * // => 'yellow'
 *
 * const nextSnapshot2 = getNextSnapshot(
 *   trafficLightMachine, // actor logic
 *   nextSnapshot, // snapshot
 *   { type: 'TIMER' }
 * ); // event object
 *
 * console.log(nextSnapshot2.value);
 * // =>'red'
 * ```
 */
function getNextSnapshot(actorLogic, snapshot, event) {
  const inertActorScope = createInertActorScope(actorLogic);
  inertActorScope.self._snapshot = snapshot;
  return actorLogic.transition(snapshot, event, inertActorScope);
}

// at the moment we allow extra actors - ones that are not specified by `children`
// this could be reconsidered in the future

function setup({
  schemas,
  actors,
  actions,
  guards,
  delays
}) {
  return {
    createMachine: config => createMachine({
      ...config,
      schemas
    }, {
      actors,
      actions,
      guards,
      delays
    })
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class SimulatedClock {
  constructor() {
    this.timeouts = new Map();
    this._now = 0;
    this._id = 0;
    this._flushing = false;
    this._flushingInvalidated = false;
  }
  now() {
    return this._now;
  }
  getId() {
    return this._id++;
  }
  setTimeout(fn, timeout) {
    this._flushingInvalidated = this._flushing;
    const id = this.getId();
    this.timeouts.set(id, {
      start: this.now(),
      timeout,
      fn
    });
    return id;
  }
  clearTimeout(id) {
    this._flushingInvalidated = this._flushing;
    this.timeouts.delete(id);
  }
  set(time) {
    if (this._now > time) {
      throw new Error('Unable to travel back in time');
    }
    this._now = time;
    this.flushTimeouts();
  }
  flushTimeouts() {
    if (this._flushing) {
      this._flushingInvalidated = true;
      return;
    }
    this._flushing = true;
    const sorted = [...this.timeouts].sort(([_idA, timeoutA], [_idB, timeoutB]) => {
      const endA = timeoutA.start + timeoutA.timeout;
      const endB = timeoutB.start + timeoutB.timeout;
      return endB > endA ? -1 : 1;
    });
    for (const [id, timeout] of sorted) {
      if (this._flushingInvalidated) {
        this._flushingInvalidated = false;
        this._flushing = false;
        this.flushTimeouts();
        return;
      }
      if (this.now() - timeout.start >= timeout.timeout) {
        this.timeouts.delete(id);
        timeout.fn.call(null);
      }
    }
    this._flushing = false;
  }
  increment(ms) {
    this._now += ms;
    this.flushTimeouts();
  }
}

/**
 * Returns a promise that resolves to the `output` of the actor when it is done.
 *
 * @example
 *
 * ```ts
 * const machine = createMachine({
 *   // ...
 *   output: {
 *     count: 42
 *   }
 * });
 *
 * const actor = createActor(machine);
 *
 * actor.start();
 *
 * const output = await toPromise(actor);
 *
 * console.log(output);
 * // logs { count: 42 }
 * ```
 */
function toPromise(actor) {
  return new Promise((resolve, reject) => {
    actor.subscribe({
      complete: () => {
        resolve(actor.getSnapshot().output);
      },
      error: reject
    });
  });
}

/**
 * Given actor `logic`, a `snapshot`, and an `event`, returns a tuple of the
 * `nextSnapshot` and `actions` to execute.
 *
 * This is a pure function that does not execute `actions`.
 */
function transition(logic, snapshot, event) {
  const executableActions = [];
  const actorScope = createInertActorScope(logic);
  actorScope.actionExecutor = action => {
    executableActions.push(action);
  };
  const nextSnapshot = logic.transition(snapshot, event, actorScope);
  return [nextSnapshot, executableActions];
}

/**
 * Given actor `logic` and optional `input`, returns a tuple of the
 * `nextSnapshot` and `actions` to execute from the initial transition (no
 * previous state).
 *
 * This is a pure function that does not execute `actions`.
 */
function initialTransition(logic, ...[input]) {
  const executableActions = [];
  const actorScope = createInertActorScope(logic);
  actorScope.actionExecutor = action => {
    executableActions.push(action);
  };
  const nextSnapshot = logic.getInitialSnapshot(actorScope, input);
  return [nextSnapshot, executableActions];
}

const defaultWaitForOptions = {
  timeout: Infinity // much more than 10 seconds
};

/**
 * Subscribes to an actor ref and waits for its emitted value to satisfy a
 * predicate, and then resolves with that value. Will throw if the desired state
 * is not reached after an optional timeout. (defaults to Infinity).
 *
 * @example
 *
 * ```js
 * const state = await waitFor(someService, (state) => {
 *   return state.hasTag('loaded');
 * });
 *
 * state.hasTag('loaded'); // true
 * ```
 *
 * @param actorRef The actor ref to subscribe to
 * @param predicate Determines if a value matches the condition to wait for
 * @param options
 * @returns A promise that eventually resolves to the emitted value that matches
 *   the condition
 */
function waitFor(actorRef, predicate, options) {
  const resolvedOptions = {
    ...defaultWaitForOptions,
    ...options
  };
  return new Promise((res, rej) => {
    const {
      signal
    } = resolvedOptions;
    if (signal?.aborted) {
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      rej(signal.reason);
      return;
    }
    let done = false;
    if (resolvedOptions.timeout < 0) {
      console.error('`timeout` passed to `waitFor` is negative and it will reject its internal promise immediately.');
    }
    const handle = resolvedOptions.timeout === Infinity ? undefined : setTimeout(() => {
      dispose();
      rej(new Error(`Timeout of ${resolvedOptions.timeout} ms exceeded`));
    }, resolvedOptions.timeout);
    const dispose = () => {
      clearTimeout(handle);
      done = true;
      sub?.unsubscribe();
      if (abortListener) {
        signal.removeEventListener('abort', abortListener);
      }
    };
    function checkEmitted(emitted) {
      if (predicate(emitted)) {
        dispose();
        res(emitted);
      }
    }

    /**
     * If the `signal` option is provided, this will be the listener for its
     * `abort` event
     */
    let abortListener;
    // eslint-disable-next-line prefer-const
    let sub; // avoid TDZ when disposing synchronously

    // See if the current snapshot already matches the predicate
    checkEmitted(actorRef.getSnapshot());
    if (done) {
      return;
    }

    // only define the `abortListener` if the `signal` option is provided
    if (signal) {
      abortListener = () => {
        dispose();
        // XState does not "own" the signal, so we should reject with its reason (if any)
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        rej(signal.reason);
      };
      signal.addEventListener('abort', abortListener);
    }
    sub = actorRef.subscribe({
      next: checkEmitted,
      error: err => {
        dispose();
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        rej(err);
      },
      complete: () => {
        dispose();
        rej(new Error(`Actor terminated without satisfying predicate`));
      }
    });
    if (done) {
      sub.unsubscribe();
    }
  });
}

exports.createEmptyActor = actors_dist_xstateActors.createEmptyActor;
exports.fromCallback = actors_dist_xstateActors.fromCallback;
exports.fromEventObservable = actors_dist_xstateActors.fromEventObservable;
exports.fromObservable = actors_dist_xstateActors.fromObservable;
exports.fromPromise = actors_dist_xstateActors.fromPromise;
exports.fromTransition = actors_dist_xstateActors.fromTransition;
exports.Actor = guards_dist_xstateGuards.Actor;
exports.__unsafe_getAllOwnEventDescriptors = guards_dist_xstateGuards.getAllOwnEventDescriptors;
exports.and = guards_dist_xstateGuards.and;
exports.cancel = guards_dist_xstateGuards.cancel;
exports.createActor = guards_dist_xstateGuards.createActor;
exports.getStateNodes = guards_dist_xstateGuards.getStateNodes;
exports.interpret = guards_dist_xstateGuards.interpret;
exports.isMachineSnapshot = guards_dist_xstateGuards.isMachineSnapshot;
exports.matchesState = guards_dist_xstateGuards.matchesState;
exports.not = guards_dist_xstateGuards.not;
exports.or = guards_dist_xstateGuards.or;
exports.pathToStateValue = guards_dist_xstateGuards.pathToStateValue;
exports.raise = guards_dist_xstateGuards.raise;
exports.spawnChild = guards_dist_xstateGuards.spawnChild;
exports.stateIn = guards_dist_xstateGuards.stateIn;
exports.stop = guards_dist_xstateGuards.stop;
exports.stopChild = guards_dist_xstateGuards.stopChild;
exports.toObserver = guards_dist_xstateGuards.toObserver;
exports.SpecialTargets = log.SpecialTargets;
exports.assign = log.assign;
exports.emit = log.emit;
exports.enqueueActions = log.enqueueActions;
exports.forwardTo = log.forwardTo;
exports.log = log.log;
exports.sendParent = log.sendParent;
exports.sendTo = log.sendTo;
exports.SimulatedClock = SimulatedClock;
exports.StateMachine = StateMachine;
exports.StateNode = StateNode;
exports.assertEvent = assertEvent;
exports.createMachine = createMachine;
exports.getInitialSnapshot = getInitialSnapshot;
exports.getNextSnapshot = getNextSnapshot;
exports.initialTransition = initialTransition;
exports.setup = setup;
exports.toPromise = toPromise;
exports.transition = transition;
exports.waitFor = waitFor;
