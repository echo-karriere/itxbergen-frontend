import {Observable} from 'rxjs'

/**
 * Operator that takes an array as input and emits a new array with the value of the projected observable for each item in the input array.
 * It creates a new inner observable for each unique element in the input array, and it will keep the subscription to the inner observable for as long as the input array includes the element.
 * The operator will emit the projected values in the same order as the input array, and if the order of elements in the input array changes, it will move items in the output array to match the new order.
 * @param project - Function that takes an item from the input array and returns an observable that emits the projected value.
 * @param isEqual - Optional function to compare items in the input array. Defaults to strict equality.
 * @public
 */
export declare function mergeMapArray<T, R>(
  project: (item: T) => Observable<R>,
  isEqual?: (a: T, b: T) => boolean,
): (source: Observable<T[]>) => Observable<R[]>

export {}
