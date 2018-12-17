export interface Seat {
  id: number
  x: number
  y: number
}

export interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Zone {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export const seatWidth = 50
export const seatHeight = 50

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