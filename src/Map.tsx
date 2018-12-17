import {h} from "preact"
import {Seat} from "./models"
import {Shadow} from "./Shadow";
import {State} from "./State";

interface Props {
  state: State
  startMoveSeat: (id: number) => void
  confirmAction: () => void
}

export function Map({state, startMoveSeat, confirmAction}: Props) {
  return (
    <svg class="map">
      {
        state.seats.map(seat => Seat(seat, startMoveSeat))
      }
      <Shadow state={state} confirmAction={confirmAction}/>
    </svg>
  )
}

function Seat(seat: Seat, startMoveSeat: (id: number) => void) {
  return (
    <g id={`seat-${seat.id}`} onClick={() => startMoveSeat(seat.id)}>
      <rect x={seat.x} y={seat.y} width={50} height={50}/>
    </g>
  )
}