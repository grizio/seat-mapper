export interface Seat {
  id: number
  type: number
  name: string
  x: number
  y: number
  width: number
  height: number
}

export const defaultSeatWidth = 50
export const defaultSeatHeight = 50

export function seatEqual(seat1: Seat, seat2: Seat): boolean {
  return (
    seat1.id === seat2.id &&
    seat1.name === seat2.name &&
    seat1.x === seat2.x &&
    seat1.y === seat2.y
  )
}