import { Seat } from 'models/Seat'

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

export interface Pos {
  x: number
  y: number
}

export const defaultPosition: Pos = {x: 0, y: 0}

export function translatePosition(position: Pos, translationFromZero: Pos): Pos {
  return {
    x: position.x + translationFromZero.x,
    y: position.y + translationFromZero.y
  }
}

export function differencePosition(position1: Pos, position2: Pos): Pos {
  return {
    x: position2.x - position1.x,
    y: position2.y - position1.y
  }
}

export function negativePosition(position: Pos): Pos {
  return {
    x: -position.x,
    y: -position.y
  }
}

export function translateZone(zone: Zone, translationFromZero: Pos): Zone {
  return {
    x1: zone.x1 + translationFromZero.x,
    y1: zone.y1 + translationFromZero.y,
    x2: zone.x2 + translationFromZero.x,
    y2: zone.y2 + translationFromZero.y
  }
}

export function translateSeat(seat: Seat, translationFromZero: Pos): Seat {
  return {
    ...seat,
    x: Math.round(seat.x + translationFromZero.x),
    y: Math.round(seat.y + translationFromZero.y)
  }
}

export function containingZone(zones: Array<Zone>): Zone {
  if (zones.length === 0) {
    return { x1: 0, y1: 0, x2: 0, y2: 0 }
  } else {
    const head = zones[0]
    const tail = zones.slice(1)
    return tail.reduce((acc, zone) => ({
      x1: Math.min(acc.x1, zone.x1),
      y1: Math.min(acc.y1, zone.y1),
      x2: Math.max(acc.x2, zone.x2),
      y2: Math.max(acc.y2, zone.y2)
    }), head)
  }
}

export function zoneCornerPositions(zone: Zone): Array<Pos> {
  return [
    zoneTopLeftPosition(zone),
    zoneTopRightPosition(zone),
    zoneBottomLeftPosition(zone),
    zoneBottomRightPosition(zone)
  ]
}

export function zoneTopLeftPosition(zone: Zone): Pos {
  return {
    x: zone.x1,
    y: zone.y1
  }
}

export function zoneTopRightPosition(zone: Zone): Pos {
  return {
    x: zone.x2,
    y: zone.y1
  }
}

export function zoneBottomLeftPosition(zone: Zone): Pos {
  return {
    x: zone.x1,
    y: zone.y2
  }
}

export function zoneBottomRightPosition(zone: Zone): Pos {
  return {
    x: zone.x2,
    y: zone.y2
  }
}

export function normalizeZone(zone: Zone): Zone {
  return {
    x1: Math.min(zone.x1, zone.x2),
    y1: Math.min(zone.y1, zone.y2),
    x2: Math.max(zone.x1, zone.x2),
    y2: Math.max(zone.y1, zone.y2)
  }
}

export function isIncluded(zone: Zone, reference: Zone): boolean {
  const hasZoneCornerInReference = zoneCornerPositions(zone).some(corner => isPositionInZone(corner, reference))
  const hasReferenceCornerInZone = zoneCornerPositions(reference).some(corner => isPositionInZone(corner, zone))
  const isIncludedHorizontally = (
    zone.x1 <= reference.x1 && reference.x2 <= zone.x2 &&
    reference.y1 <= zone.y1 && zone.y2 <= reference.y2
  )
  const isIncludedVertically = (
    zone.y1 <= reference.y1 && reference.y2 <= zone.y2 &&
    reference.x1 <= zone.x1 && zone.x2 <= reference.x2
  )

  return hasZoneCornerInReference || hasReferenceCornerInZone || isIncludedHorizontally || isIncludedVertically
}

export function isPositionInZone(pos: Pos, zone: Zone): boolean {
  return (
    zone.x1 <= pos.x && pos.x <= zone.x2 &&
    zone.y1 <= pos.y && pos.y <= zone.y2
  )
}