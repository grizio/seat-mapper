import {Declaration} from "utils/styles"
import {formStyles} from "../form/formStyles"
import {mergeStyles} from "../../utils/styles"
import commonStyles from "./common"

const seatMapperStyles: Declaration = mergeStyles(commonStyles, formStyles, {
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
  },

  ".map:not(.map-action) rect, .map ellipse, .map text": {
    cursor: "pointer"
  },

  ".right-panel": {
    flex: "350px 0 0",
    margin: "1rem",
    boxShadow: "0 0 2px #aaa",
    maxHeight: "calc(100vh - 40px - 2rem)",
    overflow: "auto"
  },

  ".right-panel section, .right-panel h3": {
    margin: "1rem 0",
    padding: "0 0.5rem"
  },

  ".right-panel details": {
    padding: "0 1rem",
    border: "1px solid #ccc"
  },

  ".right-panel details:not(:first-of-type)": {
    borderTop: "none"
  },

  ".right-panel details summary": {
    padding: "0.25rem",
    cursor: "pointer",
    outline: "none"
  },

  ".icon-button": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
    padding: "0.5rem",
    transition: "all 0.25s ease-in-out"
  },

  ".icon-button:hover": {
    backgroundColor: "#ddd"
  }
})
export default seatMapperStyles