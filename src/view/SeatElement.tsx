import {Component, h} from "preact"
import {Seat, seatHeight, seatWidth} from "models/Seat"
import {State as StoreState} from "store/State"

interface Props {
  storeState: StoreState
  seat: Seat
  toggleSelectSeat: (id: number) => void
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
      <g id={`seat-${seat.id}`} onClick={this.onClick} onMouseDown={this.onMouseDown}>
        <rect x={seat.x} y={seat.y} width={seatWidth} height={seatHeight}
              fill={this.isSelected() ? "#ccc" : "#fff"}
              stroke="black"
        />
        <text x={seat.x + seatWidth / 2} y={seat.y + seatHeight / 2}
              {...{
                "dominant-baseline": "middle",
                "text-anchor": "middle"
              }}
        >{seat.name}</text>
      </g>
    )
  }

  isSelected = () => {
    return this.props.storeState.selectedSeatIds.includes(this.props.seat.id)
  }

  onClick = (event: MouseEvent) => {
    if (event.ctrlKey) {
      this.props.renameSeat(this.props.seat.id)
    } else if (!event.altKey && !event.shiftKey) {
      this.props.toggleSelectSeat(this.props.seat.id)
    }
  }

  onMouseDown = () => {
    if (this.isSelected()) {
      this.props.startMoveSeats()
    }
  }
}