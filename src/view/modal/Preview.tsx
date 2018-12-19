import {h} from "preact"
import {Seat, seatHeight, seatWidth} from "models/Seat"
import {seatToZone, zoneToRect} from "models/adapters"
import {containingZone} from "models/geometry"

interface Props {
  seats: Array<Seat>
}

export default function Preview(props: Props) {
  const rect = zoneToRect(containingZone(props.seats.map(seatToZone)))
  return (
    <svg viewBox={`${rect.x - 5} ${rect.y - 5} ${rect.width + 10} ${rect.height + 10}`} width={800} height={500}>
      {props.seats.map(seat => (
        <g id={`seat-${seat.id}`}>
          <rect x={seat.x} y={seat.y} width={seatWidth} height={seatHeight}
                fill="#fff" stroke="black"
          />
          <text x={seat.x + seatWidth / 2} y={seat.y + seatHeight / 2}
                {...{
                  "dominant-baseline": "middle",
                  "text-anchor": "middle"
                }}
          >{seat.name}</text>
        </g>
      ))}
    </svg>
  )
}