import i18n, { Language } from "../i18n"

export interface Type {
  id: number
  name: string
  figure: Figure
  borderColor: string
  borderWidth: number
  bookable: boolean
}

export type Figure = "rectangle" | "circle"

export function defaultSeatType(language?: Language): Type {
  return {
    id: 1,
    name: i18n("types.default.seat", language),
    figure: "rectangle",
    borderColor: "#000",
    borderWidth: 1,
    bookable: true
  }
}

export function defaultStageType(language?: Language): Type {
  return {
    id: 2,
    name: i18n("types.default.stage", language),
    figure: "rectangle",
    borderColor: "#000",
    borderWidth: 5,
    bookable: false
  }
}

export function typeEqual(type1: Type, type2: Type): boolean {
  return (
    type1.id === type2.id &&
    type1.name === type2.name &&
    type1.figure === type2.figure &&
    type1.borderColor === type2.borderColor &&
    type1.borderWidth === type2.borderWidth &&
    type1.bookable === type2.bookable
  )
}