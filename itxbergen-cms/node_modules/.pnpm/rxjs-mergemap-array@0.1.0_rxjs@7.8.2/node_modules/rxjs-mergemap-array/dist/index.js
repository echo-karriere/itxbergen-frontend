import { share, scan, filter, mergeMap, merge, takeUntil } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
const INITIAL_STATE = {
  current: [],
  added: [],
  removed: []
}, EMPTY_ARRAY = [];
function mergeMapArray(project, isEqual = (a, b) => a === b) {
  return (input) => {
    const sharedInput = input.pipe(share()), state$ = sharedInput.pipe(
      scan((state, next) => {
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
      share(),
      filter((state) => state.added.length > 0 || state.removed.length > 0)
    ), removed$ = state$.pipe(mergeMap((state) => state.removed)), added$ = state$.pipe(mergeMap((state) => state.added)), empty = sharedInput.pipe(
      filter((arr) => arr.length === 0),
      map(() => EMPTY_ARRAY)
    ), mapped = added$.pipe(
      mergeMap((element) => {
        const removed = removed$.pipe(filter((k) => isEqual(k, element))).pipe(share());
        return merge(
          removed.pipe(map(() => ({ type: "remove", element }))),
          project(element).pipe(
            takeUntil(removed),
            map((projected) => ({ type: "emit", element, projected }))
          )
        );
      }),
      withLatestFrom(sharedInput),
      scan((acc, [event, inputArray]) => inputArray.flatMap((item) => isEqual(item, event.element) ? event.type === "remove" ? [] : { item, emitted: !0, value: event.projected } : acc.find((v) => v && isEqual(v.item, item))), []),
      filter((v) => v.every((item) => item == null ? void 0 : item.emitted)),
      map((v) => v.map((item) => item.value))
    );
    return merge(empty, mapped);
  };
}
function uniqueBy(array, predicate) {
  const deduped = [];
  let hasDuplicates = !1;
  for (const item of array)
    deduped.find((previous) => predicate(previous, item)) ? hasDuplicates = !0 : deduped.push(item);
  return hasDuplicates ? deduped : array;
}
export {
  mergeMapArray
};
//# sourceMappingURL=index.js.map
