import {h} from "preact"
import {renderStyles} from "../utils/view"

export function Styles() {
  return <style>{
    renderStyles({
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

      ".row": {
        flexGrow: 1,
        display: "flex",
        alignItems: "stretch"
      },

      ".map-container": {
        display: "flex",
        alignItems: "stretch",
        position: "relative",
        height: "100%"
      },

      ".map": {
        flexGrow: 1,
        cursor: "default",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none"
      },

      ".map:not(.map-action) rect, .map ellipse, .map text": {
        cursor: "pointer"
      },

      ".right-panel": {
        flex: "250px 0 0",
        margin: "1rem",
        padding: "1rem",
        boxShadow: "0 0 2px #aaa"
      },

      ".right-panel section:not(:first-of-type)": {
        borderTop: "1px dotted #ccc"
      }
    })
  }</style>
}