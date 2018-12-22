import {Rect, Zone} from "./geometry"
import {Seat} from "./Seat"

export function seatToZone(seat: Seat): Zone {
  return {
    x1: seat.x,
    y1: seat.y,
    x2: seat.x + seat.width,
    y2: seat.y + seat.height
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