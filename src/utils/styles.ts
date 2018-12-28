import * as CSS from "csstype"

export interface Declaration {
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

export function mergeStyles(...declarations: Array<Declaration>): Declaration {
  return declarations.reduce((acc, current) => {
    const result: Declaration = {...acc}
    for (let key in current) {
      if (current.hasOwnProperty(key)) {
        result[key] = {...(result[key] || {}), ...current[key]}
      }
    }
    return result
  }, {})
}