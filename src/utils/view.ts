import * as CSS from "csstype"
import { Pos, Zone } from 'models/geometry'

interface Declaration {
  [_: string]: CSS.Properties
}

export function renderStyles(declaration: Declaration): string {
  let builder = ""
  for (let key in declaration) {
    if (declaration.hasOwnProperty(key)) {
      builder += `${key}{${properties(declaration[key])}}`
    }
  }
  return builder
}

function properties(properties: CSS.Properties): string {
  const builder = []
  for (let key in properties) {
    if (properties.hasOwnProperty(key)) {
      // @ts-ignore
      builder.push(`${normalizeKey(key)}:${properties[key]}`)
    }
  }
  return builder.join(";")
}

function normalizeKey(key: string): string {
  return key.replace(/[A-Z]/g, "-$&").toLowerCase()
}

export function visuallyEqual(first: number, second: number) {
  return Math.round(first) === Math.round(second)
}

const magnetSensibility = 5
export function magnet(zone: Zone, reference: Zone): Pos {
  return {
    x: magnetX(zone, reference),
    y: magnetY(zone, reference)
  }
}

function magnetX(zone: Zone, reference: Zone): number {
  if (Math.abs(zone.x1 - reference.x1) < magnetSensibility) {
    return reference.x1 - zone.x1
  } else if (Math.abs(zone.x2 - reference.x2) < magnetSensibility) {
    return reference.x2 - zone.x2
  } else if (Math.abs(zone.x1 - reference.x2) < magnetSensibility) {
    return reference.x2 - zone.x1
  } else if (Math.abs(zone.x2 - reference.x1) < magnetSensibility) {
    return reference.x1 - zone.x2
  } else {
    return 0
  }
}

function magnetY(zone: Zone, reference: Zone): number {
  if (Math.abs(zone.y1 - reference.y1) < magnetSensibility) {
    return reference.y1 - zone.y1
  } else if (Math.abs(zone.y2 - reference.y2) < magnetSensibility) {
    return reference.y2 - zone.y2
  } else if (Math.abs(zone.y1 - reference.y2) < magnetSensibility) {
    return reference.y2 - zone.y1
  } else if (Math.abs(zone.y2 - reference.y1) < magnetSensibility) {
    return reference.y1 - zone.y2
  } else {
    return 0
  }
}

export function onCurrentElement<SpecificEvent extends Event>(handler: (event: SpecificEvent) => void) {
  return (event: SpecificEvent) => {
    if (event.currentTarget === event.target) {
      handler(event)
    }
  }
}