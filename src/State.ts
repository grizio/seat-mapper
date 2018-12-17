import {Seat, seatHeight, seatWidth, Zone} from "./models"

export interface State {
  action?: Action
  seats: Array<Seat>
}

export type Action
  = AddingSeat
  | MovingSeat
  | AddingLine

export interface AddingSeat {
  type: "addingSeat"
  seat: Seat
}

export function addingSeat(seat: Seat): AddingSeat {
  return {
    type: "addingSeat",
    seat: seat
  }
}

export function isAddingSeat(action: Action): action is AddingSeat {
  return action.type === "addingSeat"
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

export type Direction = "vertical" | "horizontal"

export interface AddingLine {
  type: "addingLine"
  direction: Direction
  numberOfSeats: number
  spacing: number
  x: number
  y: number
}

export function addingLine({direction, numberOfSeats, spacing, x, y}: { direction: Direction, numberOfSeats: number, spacing: number, x: number, y: number }): AddingLine {
  return {
    type: "addingLine",
    direction,
    numberOfSeats,
    spacing,
    x,
    y
  }
}

export function isAddingLine(action: Action): action is AddingLine {
  return action.type === "addingLine"
}

export function zoneOfAddingLine(action: AddingLine): Zone {
  if (action.direction === "horizontal") {
    return {
      x1: action.x,
      y1: action.y,
      x2: action.x + seatWidth * action.numberOfSeats + action.spacing * (action.numberOfSeats - 1),
      y2: action.y + seatHeight
    }
  } else {
    return {
      x1: action.x,
      y1: action.y,
      x2: action.x + seatWidth,
      y2: action.y + seatHeight * action.numberOfSeats + action.spacing * (action.numberOfSeats - 1)
    }
  }
}