import {h} from "preact"
import {Shadow} from "./Shadow";
import {isMovingSeat, State} from "./State"
import {Seat} from "./models/Seat"

interface Props {
  state: State
  startMoveSeat: (id: number) => void
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
  return (
    <g id={`seat-${seat.id}`} onClick={() => props.startMoveSeat(seat.id)}>
      <rect x={seat.x} y={seat.y} width={50} height={50}
            fill={seat.id === movingSeatId ? "#ccc" : "#fff"}
            stroke="black"
      />
    </g>
  )
}