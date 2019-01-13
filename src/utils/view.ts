import { Pos, Zone } from "models/geometry"

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

export function clientPositionFromEvent(event: MouseEvent): Pos {
  const allScrollsElement = allScrolls(event.currentTarget as HTMLElement)
  return {
    x: event.clientX - (event.currentTarget as HTMLElement).offsetLeft + allScrollsElement.left,
    y: event.clientY - (event.currentTarget as HTMLElement).offsetTop + allScrollsElement.top
  }
}

function allScrolls(element: HTMLElement): { top: number, left: number } {
  const result = {top: 0, left: 0}
  let currentElement: Node | null = element
  while (currentElement) {
    result.top += (currentElement as HTMLElement).scrollTop || 0
    result.left += (currentElement as HTMLElement).scrollLeft || 0

    // We need to take into account we could be into a shadow root (at least for `<seat-mapper>` element)
    if ((currentElement as ShadowRoot).host) {
      currentElement = (currentElement as ShadowRoot).host
    } else {
      currentElement = currentElement.parentNode as HTMLElement
    }
  }
  return result
}