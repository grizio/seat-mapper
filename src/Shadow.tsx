import {h} from "preact"
import {AddingLine, isAddingLine, isAddingSeat, isMovingSeat, State, zoneOfAddingLine} from "./State"
import {Line, Seat, seatHeight, seatToZone, seatWidth, Zone, zoneToRect} from "./models"
import {arrayFill, visuallyEqual} from "./utils"

interface Props {
  state: State
  confirmAction: () => void
}

export function Shadow({state, confirmAction}: Props) {
  const action = state.action
  if (action !== undefined) {
    return (
      <g id="shadow">
        {
          isAddingSeat(action) || isMovingSeat(action)
            ? renderShadowSeat(action.seat, confirmAction)
            : undefined
        }

        {
          isAddingSeat(action) || isMovingSeat(action)
            ? renderAlignmentLines(seatToZone(action.seat), state.seats)
            : undefined
        }

        {
          isAddingLine(action)
            ? renderAlignmentLines(zoneOfAddingLine(action), state.seats)
            : undefined
        }

        {
          isAddingLine(action)
            ? renderShadowLine(action, confirmAction)
            : undefined
        }
      </g>
    )
  } else {
    return <g id="shadow"/>
  }
}

function renderShadowSeat(seat: Seat, confirmAction?: () => void) {
  return (
    <rect x={seat.x}
          y={seat.y}
          width={seatWidth}
          height={seatHeight}
          onClick={confirmAction}
          fill="transparent"
          strokeWidth={1}
          stroke="#555"
          {...{
            "stroke-dasharray": "5 2"
          }}
    />
  )
}

function renderShadowLine(action: AddingLine, confirmAction: () => void) {
  const shadowSeats = shadowSeatOfLine(action)
  const rect = zoneToRect(zoneOfAddingLine(action))
  // The first rect exists to capture all click on the group when having even seats.
  return (
    <g onClick={confirmAction}>
      <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill="transparent" stroke="transparent"/>
      {shadowSeats.map(_ => renderShadowSeat(_))}
    </g>
  )
}

function shadowSeatOfLine(action: AddingLine): Array<Seat> {
  if (action.direction === "horizontal") {
    return arrayFill(action.numberOfSeats, index => ({
      id: -1,
      x: action.x + (seatWidth + action.spacing) * index,
      y: action.y
    }))
  } else {
    return arrayFill(action.numberOfSeats, index => ({
      id: -1,
      x: action.x,
      y: action.y + (seatHeight + action.spacing) * index
    }))
  }
}

function renderAlignmentLines(zone: Zone, seats: Array<Seat>) {
  const lines = seats.flatMap(seat => {
    const acc: Array<Line> = []
    // We voluntarily go out of bounds so the trace is more visible
    const margin = 10
    const x1 = Math.min(seat.x, zone.x1) - margin
    const y1 = Math.min(seat.y, zone.y1) - margin
    const x2 = Math.max(seat.x + seatWidth, zone.x2) + margin
    const y2 = Math.max(seat.y + seatHeight, zone.y2) + margin

    if (visuallyEqual(seat.x, zone.x1)) {
      acc.push({ x1: seat.x, y1: y1, x2: seat.x, y2: y2 })
    }

    if (visuallyEqual(seat.x + seatWidth, zone.x2)) {
      acc.push({ x1: seat.x + seatWidth, y1: y1, x2: seat.x + seatWidth, y2: y2 })
    }

    if (visuallyEqual(seat.x + seatWidth, zone.x1)) {
      acc.push({x1: zone.x1, y1: y1, x2: zone.x1, y2: y2})
    }

    if (visuallyEqual(seat.x, zone.x2)) {
      acc.push({ x1: seat.x, y1: y1, x2: seat.x, y2: y2 })
    }

    if (visuallyEqual(seat.y, zone.y1)) {
      acc.push({ x1: x1, y1: seat.y, x2: x2, y2: seat.y })
    }

    if (visuallyEqual(seat.y + seatHeight, zone.y2)) {
      acc.push({ x1: x1, y1: seat.y + seatHeight, x2: x2, y2: seat.y + seatHeight })
    }

    if (visuallyEqual(seat.y + seatHeight, zone.y1)) {
      acc.push({x1: x1, y1: zone.y1, x2: x2, y2: zone.y1})
    }

    if (visuallyEqual(seat.y, zone.y2)) {
      acc.push({ x1: x1, y1: seat.y, x2: x2, y2: seat.y })
    }
    return acc
  })

  return lines.map(line => (
    <line
      x1={line.x1}
      y1={line.y1}
      x2={line.x2}
      y2={line.y2}
      stroke="#aaa"
    />
  ))
}