import {h} from "preact"
import {Seat} from "./models"

interface Props {
  seats: Array<Seat>
  startMoveSeat: (id: number) => void
}

export function Map({seats, startMoveSeat}: Props) {
  return (
    <svg class="map">
      {
        seats.map(seat => Seat(seat, startMoveSeat))
      }
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