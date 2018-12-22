export interface Type {
  id: number
  name: string
  figure: Figure
  borderColor: string
  borderWidth: number
  bookable: boolean
}

export type Figure = "rectangle" | "circle"

export const defaultSeatType: Type = {
  id: 1,
  name: "Seat",
  figure: "rectangle",
  borderColor: "#000",
  borderWidth: 1,
  bookable: true
}

export const defaultStageType: Type = {
  id: 2,
  name: "Stage",
  figure: "rectangle",
  borderColor: "#000",
  borderWidth: 5,
  bookable: false
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