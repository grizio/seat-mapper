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