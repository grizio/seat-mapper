import {Seat_0_1_0, Structure_0_1_0, Type_0_1_0} from "./model"
import {Structure} from "models/Structure"
import {Seat} from "models/Seat"
import {Type} from "models/Type"

export function import_0_1_0(structure: Structure_0_1_0): Structure {
  return {
    seats: structure.seats.map(toSeat),
    types: structure.types.map(toType)
  }
}

function toSeat(seat: Seat_0_1_0): Seat {
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

function toType(type: Type_0_1_0): Type {
  return {
    id: type.id,
    name: type.name,
    figure: type.figure === "rectangle" || type.figure === "circle" ? type.figure : "rectangle",
    borderColor: type.borderColor,
    borderWidth: type.borderWidth,
    bookable: type.bookable
  }
}