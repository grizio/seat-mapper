import {Rect, Zone} from "./geometry"
import {Seat} from "./Seat"
import {Type} from "./Type"

export function seatToZone(seat: Seat, type?: Type): Zone {
  const borderWidth = type !== undefined ? type.borderWidth : 0
  return {
    x1: seat.x - borderWidth,
    y1: seat.y - borderWidth,
    x2: seat.x + seat.width + borderWidth,
    y2: seat.y + seat.height + borderWidth
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