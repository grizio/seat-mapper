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

export function arrayEqual<A>(array1: Array<A>, array2: Array<A>, comparaison: (value1: A, value2: A) => boolean): boolean {
  if (array1.length === array2.length) {
    for (let i = 0 ; i < array1.length ; i++) {
      if (!comparaison(array1[i], array2[i])) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}