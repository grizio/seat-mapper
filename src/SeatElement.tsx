import {Component, h} from "preact"
import {Seat, seatHeight, seatWidth} from "models/Seat"
import {isMovingSeat, State as StoreState} from "store/State"

interface Props {
  storeState: StoreState
  seat: Seat
  startMoveSeat: (id: number) => void
  renameSeat: (id: number) => void
}

interface State {

}

export default class SeatElement extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render({storeState, seat}: Props) {
    const action = storeState.action
    const movingSeatId = action !== undefined && isMovingSeat(action) ? action.seat.id : undefined

    return (
      <g id={`seat-${seat.id}`} onClick={this.onClick}>
        <rect x={seat.x} y={seat.y} width={seatWidth} height={seatHeight}
              fill={seat.id === movingSeatId ? "#ccc" : "#fff"}
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

  onClick = (event: MouseEvent) => {
    if (event.ctrlKey) {
      this.props.renameSeat(this.props.seat.id)
    } else if (!event.altKey && !event.shiftKey) {
      this.props.startMoveSeat(this.props.seat.id)
    }
  }
}