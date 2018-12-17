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

export function translateZone(zone: Zone, translationFromZero: Pos): Zone {
  return {
    x1: zone.x1 + translationFromZero.x,
    y1: zone.y1 + translationFromZero.y,
    x2: zone.x2 + translationFromZero.x,
    y2: zone.y2 + translationFromZero.y
  }
}