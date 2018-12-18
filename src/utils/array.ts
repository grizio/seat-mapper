export function arrayFill<A>(size: number, map: (index: number) => A) {
  return new Array(size).fill(0).map((_, index) => map(index))
}

export function min(values: Array<number>, fallback: number): number {
  if (values.length === 0) {
    return fallback
  } else {
    return values.reduce((acc, value) => Math.min(acc, value))
  }
}

export function max(values: Array<number>, fallback: number): number {
  if (values.length === 0) {
    return fallback
  } else {
    return values.reduce((acc, value) => Math.max(acc, value))
  }
}