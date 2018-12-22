import {Seat} from "../models/Seat"
import {arrayFill} from "./array"

export type Direction = "horizontal" | "vertical"
export type Changing = "letter" | "number"
export type Order = "ascending" | "descending"

interface GenerateSeatLineParameters {
  direction: Direction
  numberOfSeats: number
  spacing: number
  firstLetter: string
  firstNumber: number
  changing: Changing
  order: Order
  type: number
  seatWidth: number
  seatHeight: number
}

export function generateSeatLine({ direction, numberOfSeats, spacing, firstLetter, firstNumber, changing, order, type, seatWidth, seatHeight }: GenerateSeatLineParameters): Array<Seat> {
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
    type: type,
    name: `${letter(index)}${number(index)}`,
    x: posX(index),
    y: posY(index),
    width: seatWidth,
    height: seatHeight
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

interface GenerateSeatGridParameters {
  numberOfRows: number
  numberOfColumns: number
  columnSpacing: number
  rowSpacing: number
  shift: number
  firstLetter: string
  firstNumber: number
  letterDirection: Direction
  letterOrder: Order
  numberOrder: Order,
  type: number
  seatWidth: number
  seatHeight: number
}

export function generateSeatGrid({
  numberOfRows, numberOfColumns, columnSpacing, rowSpacing, shift,
  firstLetter, firstNumber, letterDirection, letterOrder, numberOrder,
  type, seatWidth, seatHeight
}: GenerateSeatGridParameters): Array<Seat> {
  const letter = (index: number, maxNumber: number) => {
    if (letterOrder === "ascending") {
      return numberToString(stringToNumber(firstLetter) + index)
    } else {
      return numberToString(maxNumber + stringToNumber(firstLetter) - index - 1)
    }
  }
  const number = (index: number, maxNumber: number) => {
    if (numberOrder === "ascending") {
      return firstNumber + index
    } else {
      return maxNumber + firstNumber - index - 1
    }
  }
  const name = (rowIndex: number, columnIndex: number) => {
    if (letterDirection === "horizontal") {
      return `${letter(rowIndex, numberOfRows)}${number(columnIndex, numberOfColumns)}`
    } else {
      return `${letter(columnIndex, numberOfColumns)}${number(rowIndex, numberOfRows)}`
    }
  }

  return arrayFill(numberOfRows, (rowIndex) => {
    return arrayFill(numberOfColumns, (columnIndex) => {
      return {
        id: -1,
        type: type,
        name: name(rowIndex, columnIndex),
        x: (seatWidth + rowSpacing) * columnIndex + (rowIndex * (shift) % (seatWidth + rowSpacing)),
        y: (seatHeight + columnSpacing) * rowIndex,
        width: seatWidth,
        height: seatHeight
      }
    })
  }).flat()
}