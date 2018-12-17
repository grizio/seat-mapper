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
        height: "100%"
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
      },

      ".shadow": {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        overflow: "hidden"
      },

      ".adding-seat": {
        position: "absolute",
        width: "50px",
        height: "50px",
        border: "1px dotted #555"
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