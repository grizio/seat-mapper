import {Seat, seatHeight, seatWidth} from "models/Seat"
import {containingZone, defaultPosition, Pos, Zone} from "models/geometry"

export interface State {
  seats: Array<Seat>
  translation: Pos
  action?: Action
}

export type Action
  = AddingSeats
  | MovingSeat
  | Graping

export interface AddingSeats {
  type: "addingSeats"
  seats: Array<Seat>
  position: Pos
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

export function zoneOfAddingSeats(action: AddingSeats): Zone {
  return containingZone(action.seats.map(seat => ({ x1: seat.x, y1: seat.y, x2: seat.x + seatWidth, y2: seat.y + seatHeight })))
}

export interface MovingSeat {
  type: "movingSeat"
  seat: Seat
}

export function movingSeat(seat: Seat): MovingSeat {
  return {
    type: "movingSeat",
    seat
  }
}

export function isMovingSeat(action: Action): action is MovingSeat {
  return action.type === "movingSeat"
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