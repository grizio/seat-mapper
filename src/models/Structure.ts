import {Seat, seatEqual} from "./Seat"
import {isIncluded, normalizeZone, Zone} from "./geometry"
import {seatToZone} from "./adapters"
import {arrayEqual} from "utils/array"
import {defaultSeatType, defaultStageType, Type, typeEqual} from "./Type"
import { Language } from "../i18n"

export interface Structure {
  seats: Array<Seat>
  types: Array<Type>
}

export function defaultStructure(language?: Language): Structure {
  return {
    seats: [],
    types: [defaultSeatType(language), defaultStageType(language)]
  }
}

export function nextSeatId(structure: Structure): number {
  return structure.seats.reduce((acc, seat) => Math.max(acc, seat.id), 0) + 1
}

export function seatById(structure: Structure, id: number): Seat | undefined {
  return structure.seats.find(_ => _.id === id)
}

export function seatsByIds(structure: Structure, ids: Array<number>): Array<Seat> {
  return structure.seats.filter(_ => ids.includes(_.id))
}

export function seatsByZone(structure: Structure, zone: Zone): Array<Seat> {
  return structure.seats.filter(seat => isIncluded(seatToZone(seat), normalizeZone(zone)))
}

export function patchSeat(structure: Structure, patch: {id: number} & Partial<Seat>): Structure {
  return {
    ...structure,
    seats: structure.seats.map(seat => {
      if (seat.id === patch.id) {
        return {...seat, ...patch}
      } else {
        return seat
      }
    })
  }
}

export function patchSeats(structure: Structure, patches: Array<{id: number} & Partial<Seat>>): Structure {
  return {
    ...structure,
    seats: structure.seats.map(seat => {
      const seatPatch = patches.find(_ => _.id === seat.id)
      if (seatPatch) {
        return {...seat, ...seatPatch}
      } else {
        return seat
      }
    })
  }
}

export function addSeats(structure: Structure, seats: Array<Seat>): Structure {
  return {
    ...structure,
    seats: [...structure.seats, ...seats]
  }
}

export function removeSeats(structure: Structure, seatIds: Array<number>): Structure {
  return {
    ...structure,
    seats: structure.seats.filter(seat => seatIds.every(_ => _ !== seat.id))
  }
}

export function nextTypeId(structure: Structure): number {
  return structure.types.reduce((acc, seat) => Math.max(acc, seat.id), 0) + 1
}

export function addType(structure: Structure, type: Type): Structure {
  return {
    ...structure,
    types: [...structure.types, type]
  }
}

export function patchType(structure: Structure, patch: Partial<Type> & {id: number}): Structure {
  return {
    ...structure,
    types: structure.types.map(type => {
      if (type.id === patch.id) {
        return {...type, ...patch}
      } else {
        return type
      }
    })
  }
}

export function removeType(structure: Structure, id: number): Structure {
  return {
    ...structure,
    types: structure.types.filter(_ => _.id !== id)
  }
}

export function hasStructureChanged(previousStructure: Structure, nextStructure: Structure): boolean {
  return (
    !arrayEqual(previousStructure.seats, nextStructure.seats, seatEqual) ||
    !arrayEqual(previousStructure.types, nextStructure.types, typeEqual)
  )
}