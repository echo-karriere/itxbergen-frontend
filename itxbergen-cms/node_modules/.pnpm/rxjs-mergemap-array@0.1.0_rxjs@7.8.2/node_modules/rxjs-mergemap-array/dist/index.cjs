"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var rxjs = require("rxjs"), operators = require("rxjs/operators");
const INITIAL_STATE = {
  current: [],
  added: [],
  removed: []
}, EMPTY_ARRAY = [];
function mergeMapArray(project, isEqual = (a, b) => a === b) {
  return (input) => {
    const sharedInput = input.pipe(rxjs.share()), state$ = sharedInput.pipe(
      rxjs.scan((state, next) => {
        const added = next.filter(
          (item) => !state.current.find((current) => isEqual(current, item))
        ), removed = state.current.filter(
          (item) => !next.find((current) => isEqual(current, item))
        );
        return {
          current: next,
          added: uniqueBy(added, isEqual),
          removed: uniqueBy(removed, isEqual)
        };
      }, INITIAL_STATE)
    ).pipe(
      rxjs.share(),
      rxjs.filter((state) => state.added.length > 0 || state.removed.length > 0)
    ), removed$ = state$.pipe(rxjs.mergeMap((state) => state.removed)), added$ = state$.pipe(rxjs.mergeMap((state) => state.added)), empty = sharedInput.pipe(
      rxjs.filter((arr) => arr.length === 0),
      operators.map(() => EMPTY_ARRAY)
    ), mapped = added$.pipe(
      rxjs.mergeMap((element) => {
        const removed = removed$.pipe(rxjs.filter((k) => isEqual(k, element))).pipe(rxjs.share());
        return rxjs.merge(
          removed.pipe(operators.map(() => ({ type: "remove", element }))),
          project(element).pipe(
            rxjs.takeUntil(removed),
            operators.map((projected) => ({ type: "emit", element, projected }))
          )
        );
      }),
      operators.withLatestFrom(sharedInput),
      rxjs.scan((acc, [event, inputArray]) => inputArray.flatMap((item) => isEqual(item, event.element) ? event.type === "remove" ? [] : { item, emitted: !0, value: event.projected } : acc.find((v) => v && isEqual(v.item, item))), []),
      rxjs.filter((v) => v.every((item) => item == null ? void 0 : item.emitted)),
      operators.map((v) => v.map((item) => item.value))
    );
    return rxjs.merge(empty, mapped);
  };
}
function uniqueBy(array, predicate) {
  const deduped = [];
  let hasDuplicates = !1;
  for (const item of array)
    deduped.find((previous) => predicate(previous, item)) ? hasDuplicates = !0 : deduped.push(item);
  return hasDuplicates ? deduped : array;
}
exports.mergeMapArray = mergeMapArray;
//# sourceMappingURL=index.cjs.map
