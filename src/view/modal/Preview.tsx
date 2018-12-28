import {h} from "preact"
import {Seat} from "models/Seat"
import {seatToZone, zoneToRect} from "models/adapters"
import {containingZone} from "models/geometry"
import {Figure, Type} from "models/Type"

interface Props {
  seats: Array<Seat>
  types: Array<Type>
}

export default function Preview(props: Props) {
  const rect = zoneToRect(containingZone(props.seats.map(_ => seatToZone(_))))
  return (
    <svg viewBox={`${rect.x - 5} ${rect.y - 5} ${rect.width + 10} ${rect.height + 10}`} width={800} height={500}>
      {props.seats.map(seat => (
        <g id={`seat-${seat.id}`}>
          {
            getSeatFigure(seat, props.types) === "rectangle"
              ? renderRectangle(seat)
              : renderCircle(seat)
          }
          <text x={seat.x + seat.width / 2} y={seat.y + seat.height / 2}
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

function getSeatFigure(seat: Seat, types: Array<Type>): Figure {
  const type = types.find(_ => _.id === seat.type)
  if (type !== undefined) {
    return type.figure
  } else {
    return "rectangle"
  }
}

function renderRectangle(seat: Seat) {
  return (
    <rect x={seat.x} y={seat.y} width={seat.width} height={seat.height}
          fill="#fff" stroke="black"
    />
  )
}

function renderCircle(seat: Seat) {
  return (
    <ellipse cx={seat.x + seat.width / 2} cy={seat.y + seat.height / 2}
             rx={seat.width / 2} ry={seat.height / 2}
             fill="#fff" stroke="black"
    />
  )
}