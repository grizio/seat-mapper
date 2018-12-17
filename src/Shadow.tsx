import {h} from "preact"
import {State} from "./State"
import {Line, Seat, seatHeight, seatWidth} from "./models"

interface Props {
  state: State
  confirmAction: () => void
}

export function Shadow({state, confirmAction}: Props) {
  if (state.action !== undefined) {
    return (
      <g id="shadow">
        {renderShadowSeat(state.action.seat, confirmAction)}
        {renderAlignmentLines(state.action.seat, state.seats)}
      </g>
    )
  } else {
    return <g id="shadow"/>
  }
}

function renderShadowSeat(seat: Seat, confirmAction: () => void) {
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

function renderAlignmentLines(movingSeat: Seat, seats: Array<Seat>) {
  const lines = seats.flatMap(seat => {
    const acc: Array<Line> = []
    // We voluntarily go out of bounds so the trace is more visible
    const margin = 10
    const x1 = Math.min(seat.x, movingSeat.x) - margin
    const y1 = Math.min(seat.y, movingSeat.y) - margin
    const x2 = Math.max(seat.x, movingSeat.x) + seatWidth + margin
    const y2 = Math.max(seat.y, movingSeat.y) + seatHeight + margin

    if (seat.x === movingSeat.x) {
      // Currently, seats have only one size, so we can directly add helper for both sides
      acc.push({ x1: seat.x, y1: y1, x2: seat.x, y2: y2 })
      acc.push({ x1: seat.x + seatWidth, y1: y1, x2: seat.x + seatWidth, y2: y2 })
    }

    if (seat.x + seatWidth === movingSeat.x) {
      acc.push({ x1: movingSeat.x, y1: y1, x2: movingSeat.x, y2: y2 })
    }

    if (seat.x === movingSeat.x + seatWidth) {
      acc.push({ x1: seat.x, y1: y1, x2: seat.x, y2: y2 })
    }

    if (seat.y === movingSeat.y) {
      // Currently, seats have only one size, so we can directly add helper for both sides
      acc.push({ x1: x1, y1: seat.y, x2: x2, y2: seat.y })
      acc.push({ x1: x1, y1: seat.y + seatHeight, x2: x2, y2: seat.y + seatHeight })
    }

    if (seat.y + seatHeight === movingSeat.y) {
      acc.push({ x1: x1, y1: movingSeat.y, x2: x2, y2: movingSeat.y })
    }

    if (seat.y === movingSeat.y + seatHeight) {
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