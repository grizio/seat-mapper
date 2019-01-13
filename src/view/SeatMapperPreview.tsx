import {Component, h} from "preact"
import {Props as MapPreviewProps, default as MapPreview} from "./map/MapPreview"
import {renderStyles} from "utils/styles"
import seatMapperPreviewStyles from "./styles/seatMapperPreviewStyles"

type Props = MapPreviewProps

export default class SeatMapperPreview extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render(props: Props) {
    return <div class="host preview">
      <style>{renderStyles(seatMapperPreviewStyles)}</style>
      <MapPreview {...props} />
    </div>
  }
}