import {Seat} from "models/Seat"
import {containingZone, defaultPosition, Pos, Zone} from "models/geometry"
import {Structure} from "models/Structure"

export interface State {
  structure: Structure
  selectedSeatIds: Array<number>
  translation: Pos
  mousePosition: Pos
  action?: Action
}

export type Action
  = AddingSeats
  | MovingSeats
  | ZoneSelection
  | Graping

export interface ActionSeatContainer {
  seats: Array<Seat>
  position: Pos
}

export function zoneOfActionSeatContainer(action: ActionSeatContainer): Zone {
  return containingZone(action.seats.map(seat => ({ x1: seat.x, y1: seat.y, x2: seat.x + seat.width, y2: seat.y + seat.height })))
}

export interface AddingSeats extends ActionSeatContainer {
  type: "addingSeats"
}

export function addingSeats(seats: Array<Seat>): AddingSeats {
  return {
    type: "addingSeats",
    seats: seats,
    position: defaultPosition
  }
}

export function isAddingSeats(action: Action): action is AddingSeats {
  return action.type === "addingSeats"
}

export interface MovingSeats extends ActionSeatContainer {
  type: "movingSeats"
  initialPosition: Pos
  positionInAction: Pos
}

export function movingSeats(seats: Array<Seat>, initialPosition: Pos, positionInAction: Pos): MovingSeats {
  return {
    type: "movingSeats",
    seats, initialPosition, position: initialPosition, positionInAction
  }
}

export function isMovingSeats(action: Action): action is MovingSeats {
  return action.type === "movingSeats"
}

export interface ZoneSelection {
  type: "zoneSelection"
  zone: Zone
  additionalSeats: boolean
}

export function zoneSelection(zone: Zone, additionalSeats: boolean): ZoneSelection {
  return {
    type: "zoneSelection",
    zone, additionalSeats
  }
}

export function isZoneSelection(action: Action): action is ZoneSelection {
  return action.type === "zoneSelection"
}

export interface Graping {
  type: "graping"
  clientStartingPosition: Pos
  mapStartingPosition: Pos
}

export function graping(clientStartingPosition: Pos, mapStartingPosition: Pos): Graping {
  return {
    type: "graping",
    clientStartingPosition, mapStartingPosition
  }
}

export function isGraping(action: Action): action is Graping {
  return action.type === "graping"
}