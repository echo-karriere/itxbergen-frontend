import {isObject} from './isObject'

const PATH_DELIMITER = '.'

function integer(str: string): number {
  return parseInt(str, 10)
}

export function lens(data: unknown, path: string): unknown {
  var p = path.split(PATH_DELIMITER)
  var segment = p.shift()

  if (!segment) {
    return data
  }

  if (Array.isArray(data) && data[integer(segment)]) {
    return lens(data[integer(segment)], p.join(PATH_DELIMITER))
  }

  if (isObject(data) && segment in data) {
    return lens(data[segment], p.join(PATH_DELIMITER))
  }

  return undefined
}
