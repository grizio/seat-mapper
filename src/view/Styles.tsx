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