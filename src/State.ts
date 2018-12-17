import {Seat} from "./models";

export interface State {
  action?: Action
  seats: Array<Seat>
}

export type Action = AddingSeat

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