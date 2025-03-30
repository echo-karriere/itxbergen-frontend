export function type(value: unknown) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
