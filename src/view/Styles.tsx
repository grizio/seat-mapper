import * as CSS from "csstype"
import {h} from "preact"

export function Styles() {
  return <style>{
    render({
      ":host, .host": {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
        height: "100%",
        outline: "none"
      },

      ".toolbar": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      },

      ".map-container": {
        flexGrow: 1,
        display: "flex",
        alignItems: "stretch",
        position: "relative"
      },

      ".map": {
        flexGrow: 1
      }
    })
  }</style>
}

interface Declaration {
  [_: string]: CSS.Properties
}

function render(declaration: Declaration): string {
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