import {Rect, Zone} from "./geometry"
import {Seat, seatHeight, seatWidth} from "./Seat"

export function seatToZone(seat: Seat): Zone {
  return {
    x1: seat.x,
    y1: seat.y,
    x2: seat.x + seatWidth,
    y2: seat.y + seatHeight
  }
}

export function zoneToRect(zone: Zone): Rect {
  return {
    x: zone.x1,
    y: zone.y1,
    width: zone.x2 - zone.x1,
    height: zone.y2 - zone.y1
  }
}