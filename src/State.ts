import {Seat} from "./models";

export interface State {
  action?: Action
  seats: Array<Seat>
}

export type Action = AddingSeat | MovingSeat

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