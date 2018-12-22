import {Declaration} from "utils/view"

export const formStyles: Declaration = {
  ".field": {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "1rem 0"
  },

  ".field .field-label": {
    margin: 0,
    flexBasis: "150px",
    flexShrink: 0
  },

  ".field-input": {
    margin: "0",
    marginLeft: "0.5rem",
    display: "flex",
    flexGrow: 1
  },

  ".field-input input[type=text], .field-input input[type=number], .field-input input[type=color]": {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "2px",
    padding: "0.25rem",
    flexGrow: 1
  },

  ".field-input.radio": {
    flexDirection: "column"
  },

  ".field-input.radio label": {
    display: "flex",
    alignItems: "center",
    margin: "0.25rem 0"
  },

  ".field-input.radio label input[type=radio]": {
    margin: 0,
    marginRight: "0.5rem"
  }
}