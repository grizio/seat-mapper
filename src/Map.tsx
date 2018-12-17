import {h} from "preact"
import {Seat} from "./models"

interface Props {
  seats: Array<Seat>
}

export function Map({seats}: Props) {
  return (
    <svg class="map">
      {
        seats.map(Seat)
      }
    </svg>
  )
}

function Seat(seat: Seat) {
  return (
    <g id={`seat-${seat.id}`}>
      <rect x={seat.x} y={seat.y} width={50} height={50}/>
    </g>
  )
}