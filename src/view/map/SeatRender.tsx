import {h} from "preact"
import {Type} from "models/Type"
import {Seat} from "models/Seat"

interface Props {
  seat: Seat
  type: Type
  fill?: string
  onClick?: (event: MouseEvent) => void
  onMouseDown?: (event: MouseEvent) => void
}

export function SeatRender(props: Props) {
  const { seat, type, onClick, onMouseDown } = props
  return (
    <g id={`seat-${seat.id}`} onClick={onClick} onMouseDown={onMouseDown}>
      {
        type.figure === "rectangle"
          ? renderRectangle(props)
          : renderCircle(props)
      }
      <text x={seat.x + seat.width / 2} y={seat.y + seat.height / 2}
            {...{
              "dominant-baseline": "middle",
              "text-anchor": "middle"
            }}
      >{seat.name}</text>
    </g>
  )
}

function renderRectangle ({ seat, type, fill }: Props) {
  return (
    <rect x={seat.x} y={seat.y} width={seat.width} height={seat.height}
          fill={fill || "#fff"}
          stroke={type.borderColor}
          {...{
            "stroke-width": type.borderWidth
          }}
    />
  )
}

function renderCircle({ seat, type, fill }: Props) {
  return (
    <ellipse
      cx={seat.x + seat.width / 2} cy={seat.y + seat.height / 2}
      rx={seat.width / 2} ry={seat.height / 2}
      fill={fill || "#fff"}
      stroke={type.borderColor}
      {...{
        "stroke-width": type.borderWidth
      }}
    />
  )
}