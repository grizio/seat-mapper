export interface Structure_0_1_0 {
  version: "0.1.0"
  seats: Array<Seat_0_1_0>
  types: Array<Type_0_1_0>
}

export interface Seat_0_1_0 {
  id: number
  type: number
  name: string
  x: number
  y: number
  width: number
  height: number
}

export interface Type_0_1_0 {
  id: number
  name: string
  figure: string
  borderColor: string
  borderWidth: number
  bookable: boolean
}