import {Seat, seatHeight, seatWidth} from "../models/Seat"
import {arrayFill} from "./array"

interface GenerateSeatLineParameters {
  direction: Direction
  numberOfSeats: number
  spacing: number
  firstLetter: string
  firstNumber: number
  changing: Changing
  order: Order
}
export type Direction = "horizontal" | "vertical"
export type Changing = "letter" | "number"
export type Order = "ascending" | "descending"

export function generateSeatLine({ direction, numberOfSeats, spacing, firstLetter, firstNumber, changing, order }: GenerateSeatLineParameters): Array<Seat> {
  const posX = (index: number) => direction === "horizontal" ? (seatWidth + spacing) * index : 0
  const posY = (index: number) => direction === "vertical" ? (seatHeight + spacing) * index : 0
  const letter = (index: number) => {
    if (changing === "letter") {
      if (order === "ascending") {
        return numberToString(stringToNumber(firstLetter) + index)
      } else {
        return numberToString(stringToNumber(firstLetter) - index)
      }
    } else {
      return firstLetter
    }
  }
  const number = (index: number) => {
    if (changing === "number") {
      if (order === "ascending") {
        return firstNumber + index
      } else {
        return firstNumber - index
      }
    } else {
      return firstNumber
    }
  }

  return arrayFill(numberOfSeats, index => ({
    id: -1,
    name: `${letter(index)}${number(index)}`,
    x: posX(index),
    y: posY(index)
  }))
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")

function stringToNumber(input: string): number {
  if (input === "") {
    return 0
  } else {
    return input
      .toUpperCase()
      .split("")
      .filter(char => letters.includes(char))
      .map(char => letters.indexOf(char) + 1)
      .reverse()
      .reduce((acc, current, index) => {
        return acc + current * Math.pow(26, index)
      }, 0)
  }
}

function numberToString(input: number): string {
  let current = input
  let result = ""
  while (current > 0) {
    result = letters[(current - 1) % 26] + result
    current = Math.floor((current - 1) / 26)
  }
  return result
}