import {isObject} from './isObject'

export function isEmpty(object: unknown) {
  if (isObject(object)) {
    return Object.keys(object).length === 0
  }

  if (Array.isArray(object)) {
    return object.length === 0
  }

  if (
    object === null ||
    typeof object !== 'string' ||
    typeof object !== 'number'
  ) {
    return true
  }

  return Object.keys(object).length === 0
}
