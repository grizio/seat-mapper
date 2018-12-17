export function promptInteger(message: string): number | undefined {
  let value: string | null = null
  do {
    value = prompt(message)
  } while (value !== null && isNaN(parseInt(value, 10)))

  if (value !== null) {
    return parseInt(value, 10)
  } else {
    return undefined
  }
}

export function promptEnum<I extends string, O extends I>(message: string, acceptedValues: Array<string>, normalizer: (value: I) => O = i => i as O): O | undefined {
  let value: string | null = null
  do {
    value = prompt(`${message} (${acceptedValues.join(", ")})`)
  } while (value !== null && !acceptedValues.includes(value))

  if (value !== null) {
    return normalizer(value as I)
  } else {
    return undefined
  }
}

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

export function visuallyEqual(first: number, second: number) {
  return Math.round(first) === Math.round(second)
}