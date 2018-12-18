import * as CSS from "csstype"

interface Declaration {
  [_: string]: CSS.Properties
}

export function renderStyles(declaration: Declaration): string {
  let builder = ""
  for (let key in declaration) {
    if (declaration.hasOwnProperty(key)) {
      builder += `${key}{${properties(declaration[key])}}`
    }
  }
  return builder
}

function properties(properties: CSS.Properties): string {
  const builder = []
  for (let key in properties) {
    if (properties.hasOwnProperty(key)) {
      // @ts-ignore
      builder.push(`${normalizeKey(key)}:${properties[key]}`)
    }
  }
  return builder.join(";")
}

function normalizeKey(key: string): string {
  return key.replace(/[A-Z]/g, "-$&").toLowerCase()
}

export function promptString(message: string): string | undefined {
  const value = prompt(message)
  if (value !== null) {
    return value
  } else {
    return undefined
  }
}

export function visuallyEqual(first: number, second: number) {
  return Math.round(first) === Math.round(second)
}