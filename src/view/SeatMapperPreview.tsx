import {Component, h} from "preact"
import {Structure} from "../models/Structure"
import MapPreview from "./map/MapPreview"
import {renderStyles} from "utils/styles"
import seatMapperPreviewStyles from "./styles/seatMapperPreviewStyles"

interface Props {
  structure: Structure
}

export default class SeatMapperPreview extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render({structure}: Props) {
    return <div class="host preview">
      <style>{renderStyles(seatMapperPreviewStyles)}</style>
      <MapPreview structure={structure}/>
    </div>
  }
}