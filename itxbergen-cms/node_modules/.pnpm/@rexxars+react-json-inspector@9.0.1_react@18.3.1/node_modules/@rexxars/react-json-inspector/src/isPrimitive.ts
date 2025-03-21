import {type} from './type'

export function isPrimitive(value: unknown): boolean {
  const t = type(value)
  return t !== 'Object' && t !== 'Array'
}
