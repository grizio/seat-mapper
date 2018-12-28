import {Declaration, mergeStyles} from "utils/styles"
import commonStyles from "./common"

const seatMapperPreviewStyles: Declaration = mergeStyles(commonStyles, {
  ":host, .host": {
    display: "inline-block"
  }
})
export default seatMapperPreviewStyles