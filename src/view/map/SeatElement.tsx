import {Component, h} from "preact"
import {Seat} from "models/Seat"
import {Type} from "models/Type"
import {State as StoreState} from "store/State"
import {SeatRender} from "./SeatRender"

interface Props {
  storeState: StoreState
  seat: Seat
  selectSeat: (id: number, adding: boolean) => void
  startMoveSeats: () => void
  renameSeat: (id: number) => void
}

interface State {

}

export default class SeatElement extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render({seat}: Props) {
    return (
      <SeatRender
        seat={seat}
        type={this.getType()}
        fill={this.isSelected() ? "#ccc" : "#fff"}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
      />
    )
  }

  isSelected = () => {
    return this.props.storeState.selectedSeatIds.includes(this.props.seat.id)
  }

  getType = () => {
    const type = this.props.storeState.structure.types.find(_ => _.id === this.props.seat.type)
    if (type !== undefined) {
      return type
    } else {
      return {
        id: -1,
        name: "",
        figure: "rectangle",
        borderColor: "#000",
        borderWidth: 1
      } as Type
    }
  }

  onClick = (event: MouseEvent) => {
    this.props.selectSeat(this.props.seat.id, event.ctrlKey || event.metaKey)
  }

  onMouseDown = () => {
    if (this.isSelected()) {
      this.props.startMoveSeats()
    }
  }
}