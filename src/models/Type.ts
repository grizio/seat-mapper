export interface Type {
  id: number
  name: string
  figure: Figure
  borderColor: string
  borderWidth: number
}

export type Figure = "rectangle" | "circle"

export const defaultType: Type = {
  id: 1,
  name: "default",
  figure: "rectangle",
  borderColor: "#000",
  borderWidth: 1
}

export function typeEqual(type1: Type, type2: Type): boolean {
  return (
    type1.id === type2.id &&
    type1.name === type2.name &&
    type1.figure === type2.figure &&
    type1.borderColor === type2.borderColor &&
    type1.borderWidth === type2.borderWidth
  )
}