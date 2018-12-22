import {Seat_0_1_0, Structure_0_1_0, Type_0_1_0} from "./model"
import {Structure} from "models/Structure"
import {Seat} from "models/Seat"
import {Type} from "models/Type"

export function export_0_1_0(structure: Structure): Structure_0_1_0 {
  return {
    version: "0.1.0",
    seats: structure.seats.map(fromSeat),
    types: structure.types.map(fromType)
  }
}

function fromSeat(seat: Seat): Seat_0_1_0 {
  return {
    id: seat.id,
    type: seat.type,
    name: seat.name,
    x: seat.x,
    y: seat.y,
    width: seat.width,
    height: seat.height
  }
}

function fromType(type: Type): Type_0_1_0 {
  return {
    id: type.id,
    name: type.name,
    figure: type.figure,
    borderColor: type.borderColor,
    borderWidth: type.borderWidth,
    bookable: type.bookable
  }
}