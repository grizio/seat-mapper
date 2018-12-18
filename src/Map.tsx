import {h} from "preact"
import {Shadow} from "./Shadow";
import {isMovingSeat, State} from "./State"
import {Seat, seatHeight, seatWidth} from "./models/Seat"

interface Props {
  state: State
  startMoveSeat: (id: number) => void
  renameSeat: (id: number) => void
  confirmAction: () => void
}

export function Map(props: Props) {
  const {state, confirmAction} = props
  return (
    <svg class="map">
      {
        state.seats.map(seat => renderSeat(seat, props))
      }
      <Shadow state={state} confirmAction={confirmAction}/>
    </svg>
  )
}

function renderSeat(seat: Seat, props: Props) {
  const action = props.state.action
  const movingSeatId = action !== undefined && isMovingSeat(action) ? action.seat.id : undefined

  const onClick = (event: MouseEvent) => {
    if (event.ctrlKey) {
      props.renameSeat(seat.id)
    } else {
      props.startMoveSeat(seat.id)
    }
  }

  return (
    <g id={`seat-${seat.id}`} onClick={onClick}>
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