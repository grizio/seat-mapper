import { zoneToRect } from 'models/adapters'
import { Line, Pos, translateSeat, translateZone, Zone } from 'models/geometry'
import { Seat, seatHeight, seatWidth } from 'models/Seat'
import { h } from 'preact'
import { ActionSeatContainer, isAddingSeats, isMovingSeats, State, zoneOfActionSeatContainer } from 'store/State'
import { visuallyEqual } from 'utils/view'

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
          isAddingSeats(action) || isMovingSeats(action) && action.position !== action.initialPosition
            ? renderShadowSeats(action, confirmAction)
            : undefined
        }
        {
          isAddingSeats(action) || isMovingSeats(action)
            ? renderAlignmentLines(translateZone(zoneOfActionSeatContainer(action), action.position), state.seats)
            : undefined
        }
      </g>
    )
  } else {
    return <g id="shadow"/>
  }
}

function renderShadowSeats(action: ActionSeatContainer, confirmAction: () => void) {
  const container = zoneToRect(zoneOfActionSeatContainer(action))
  return (
    <g onMouseUp={confirmAction}>
      <rect x={container.x + action.position.x} y={container.y + action.position.y}
            width={container.width} height={container.height}
            fill="transparent" stroke="transparent"
      />
      {
        action.seats
          .map(seat => translateSeat(seat, action.position))
          .map(renderShadowSeat)
      }
    </g>
  )
}

function renderShadowSeat(seat: Seat) {
  return (
    <rect x={seat.x}
          y={seat.y}
          width={seatWidth}
          height={seatHeight}
          fill="transparent"
          strokeWidth={1}
          stroke="#555"
          {...{
            "stroke-dasharray": "5 2"
          }}
    />
  )
}

function renderAlignmentLines(zone: Zone, seats: Array<Pos>) {
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