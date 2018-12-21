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
        {
          this.getType().figure === "rectangle"
            ? this.renderRectangle(seat)
            : this.renderCircle(seat)
        }
        <text x={seat.x + seatWidth / 2} y={seat.y + seatHeight / 2}
              {...{
                "dominant-baseline": "middle",
                "text-anchor": "middle"
              }}
        >{seat.name}</text>
      </g>
    )
  }

  renderRectangle = (seat: Seat) => {
    const type = this.getType()
    return (
      <rect x={seat.x} y={seat.y} width={seatWidth} height={seatHeight}
            fill={this.isSelected() ? "#ccc" : "#fff"}
            stroke={type.borderColor}
            {...{
              "stroke-width": type.borderWidth
            }}
      />
    )
  }

  renderCircle = (seat: Seat) => {
    const type = this.getType()
    return (
      <ellipse
        cx={seat.x + seatWidth / 2} cy={seat.y + seatHeight / 2}
        rx={seatWidth / 2} ry={seatHeight / 2}
        fill={this.isSelected() ? "#ccc" : "#fff"}
        stroke={type.borderColor}
        {...{
          "stroke-width": type.borderWidth
        }}
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
      }
    }
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