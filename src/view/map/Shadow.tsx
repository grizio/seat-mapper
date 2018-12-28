import { seatToZone, zoneToRect } from 'models/adapters'
import {
  containingZone,
  Line,
  normalizeZone,
  translateSeat,
  translateZone,
  Zone
} from "models/geometry"
import { Seat } from 'models/Seat'
import { h } from 'preact'
import {
  ActionSeatContainer,
  isAddingSeats,
  isMovingSeats, isZoneSelection,
  MovingSeats,
  State,
  zoneOfActionSeatContainer, ZoneSelection
} from "store/State"
import { visuallyEqual } from 'utils/view'

interface Props {
  state: State
  confirmAction: () => void
}

export function Shadow(props: Props) {
  const action = props.state.action
  if (action !== undefined) {
    return (
      <g id="shadow">
        {
          isMovingSeats(action)
            ? renderInitialZoneLines(action)
            : undefined
        }
        {
          isAddingSeats(action) || isMovingSeats(action)
            ? renderShadowSeats(action, props)
            : undefined
        }
        {
          isAddingSeats(action) || isMovingSeats(action)
            ? renderAlignmentLines(translateZone(zoneOfActionSeatContainer(action), action.position), props.state.structure.seats)
            : undefined
        }
        {
          isZoneSelection(action)
            ? renderZoneSelection(action, props.confirmAction)
            : undefined
        }
      </g>
    )
  } else {
    return <g id="shadow"/>
  }
}

function renderShadowSeats(action: ActionSeatContainer, props: Props) {
  const container = zoneToRect(zoneOfActionSeatContainer(action))
  return (
    <g onMouseUp={props.confirmAction}>
      <rect x={container.x + action.position.x} y={container.y + action.position.y}
            width={container.width} height={container.height}
            fill="transparent" stroke="transparent"
      />
      {
        action.seats
          .map(seat => translateSeat(seat, action.position))
          .map(_ => renderShadowSeat(_, props))
      }
    </g>
  )
}

function renderShadowSeat(seat: Seat, props: Props) {
  if (getSeatFigure(seat, props) === "rectangle") {
    return (
      <rect x={seat.x}
            y={seat.y}
            width={seat.width}
            height={seat.height}
            fill="transparent"
            strokeWidth={1}
            stroke="#555"
            {...{
              "stroke-dasharray": "5 2"
            }}
      />
    )
  } else {
    return (
      <ellipse cx={seat.x + seat.width / 2}
               cy={seat.y + seat.height / 2}
               rx={seat.width / 2}
               ry={seat.height / 2}
               fill="transparent"
               strokeWidth={1}
               stroke="#555"
               {...{
                 "stroke-dasharray": "5 2"
               }}
      />
    )
  }
}

function getSeatFigure(seat: Seat, props: Props) {
  const type = props.state.structure.types.find(_ => _.id === seat.type)
  if (type !== undefined) {
    return type.figure
  } else {
    return "rectangle"
  }
}

function renderAlignmentLines(zone: Zone, seats: Array<Seat>) {
  const lines = seats.flatMap(seat => {
    const acc: Array<Line> = []
    // We voluntarily go out of bounds so the trace is more visible
    const margin = 10
    const x1 = Math.min(seat.x, zone.x1) - margin
    const y1 = Math.min(seat.y, zone.y1) - margin
    const x2 = Math.max(seat.x + seat.width, zone.x2) + margin
    const y2 = Math.max(seat.y + seat.height, zone.y2) + margin

    if (visuallyEqual(seat.x, zone.x1)) {
      acc.push({ x1: seat.x, y1: y1, x2: seat.x, y2: y2 })
    }

    if (visuallyEqual(seat.x + seat.width, zone.x2)) {
      acc.push({ x1: seat.x + seat.width, y1: y1, x2: seat.x + seat.width, y2: y2 })
    }

    if (visuallyEqual(seat.x + seat.width, zone.x1)) {
      acc.push({x1: zone.x1, y1: y1, x2: zone.x1, y2: y2})
    }

    if (visuallyEqual(seat.x, zone.x2)) {
      acc.push({ x1: seat.x, y1: y1, x2: seat.x, y2: y2 })
    }

    if (visuallyEqual(seat.y, zone.y1)) {
      acc.push({ x1: x1, y1: seat.y, x2: x2, y2: seat.y })
    }

    if (visuallyEqual(seat.y + seat.height, zone.y2)) {
      acc.push({ x1: x1, y1: seat.y + seat.height, x2: x2, y2: seat.y + seat.height })
    }

    if (visuallyEqual(seat.y + seat.height, zone.y1)) {
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

function renderInitialZoneLines(action: MovingSeats) {
  const zone = translateZone(containingZone(action.seats.map(_ => seatToZone(_))), action.initialPosition)
  const rect = zoneToRect(zone)
  return (
    <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height}
          fill="transparent" stroke="#aaa"
          {...{
            "stroke-dasharray": "3 2"
          }}
    />
  )
}

function renderZoneSelection(action: ZoneSelection, confirmAction: () => void) {
  const rect = zoneToRect(normalizeZone(action.zone))
  return (
    <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height}
          fill="transparent" stroke="#aaa"
          onMouseUp={confirmAction}
    />
  )
}