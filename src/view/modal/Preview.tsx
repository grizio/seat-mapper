import {h} from "preact"
import {Seat, seatHeight, seatWidth} from "models/Seat"
import {seatToZone, zoneToRect} from "../../models/adapters"
import {containingZone} from "../../models/geometry"

interface Props {
  seats: Array<Seat>
}

export default function Preview(props: Props) {
  const rect = zoneToRect(containingZone(props.seats.map(seatToZone)))
  const width = Math.min(rect.width + 10, 800)
  const height = Math.min(rect.height + 10, 400)
  return (
    <div class="preview">
      <p>Preview</p>
      <svg viewBox={`${rect.x - 5} ${rect.y - 5} ${rect.width + 10} ${rect.height + 10}`} width={width} height={height}>
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
    </div>
  )
}