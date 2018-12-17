import {addingLine, addingSeat, Direction, movingSeat, State} from "./State"
import {arrayFill, promptEnum, promptInteger} from "./utils"
import {seatHeight, seatWidth} from "./models"

export class Store {
  private state: State
  private readonly listener: (state: State) => void

  constructor(initialState: State, listener: (state: State) => void) {
    this.state = initialState
    this.listener = listener
    this.listener(this.state)
  }

  private update(newState: Partial<State>) {
    this.state = {...this.state, ...newState}
    this.listener(this.state)
  }

  public startAddSeat = () => {
    this.update({
      action: addingSeat({id: this.nextSeatId(), x: 0, y: 0})
    })
  }

  private nextSeatId = () => {
    const idMax = this.state.seats.reduce((acc, seat) => Math.max(acc, seat.id), 0)
    return idMax + 1
  }

  public startMoveSeat = (id: number) => {
    const seat = this.state.seats.find(_ => _.id === id)
    if (seat !== undefined) {
      this.update({
        action: movingSeat(seat)
      })
    }
  }

  public startAddLine = () => {
    // Use a real modal dialog in the future
    const direction = promptEnum<Direction | "v" | "h", Direction>(
      "Direction of the lines",
      ["vertical", "v", "horizontal", "h"],
      (value) => value.startsWith("v") ? "vertical" : "horizontal"
    )
    if (direction === undefined) return

    const numberOfSeats = promptInteger("Number of seats")
    if (numberOfSeats === undefined) return

    const spacing = promptInteger("Spacing between seats (size of a seat: 50)")
    if (spacing === undefined) return

    this.update({
      action: addingLine({
        direction, numberOfSeats, spacing,
        x: 0, y: 0
      })
    })
  }

  public confirmAction = () => {
    const state = this.state;
    const action = state.action
    if (action) {
      switch (action.type) {
        case "addingSeat":
          this.update({
            seats: [...state.seats, action.seat],
            action: undefined
          })
          break

        case "movingSeat":
          const movingSeat = action.seat
          this.update({
            seats: state.seats.map(seat => {
              if (seat.id === movingSeat.id) {
                return movingSeat
              } else {
                return seat
              }
            }),
            action: undefined
          })
          break

        case "addingLine":
          // We need to use the `Math.round` function because sometimes, a seat will be between two px so alignment will not work.
          // Visually, there is no difference
          const nextSeatId = this.nextSeatId()
          const addedSeats = action.direction === "horizontal"
            ? arrayFill(action.numberOfSeats, index => ({
              id: nextSeatId + index,
              x: Math.round(action.x + (seatWidth + action.spacing) * index),
              y: Math.round(action.y)
            }))
            : arrayFill(action.numberOfSeats, index => ({
              id: nextSeatId + index,
              x: Math.round(action.x),
              y: Math.round(action.y + (seatHeight + action.spacing) * index)
            }))

          this.update({
            seats: [
              ...state.seats,
              ...addedSeats
            ],
            action: undefined
          })
          break
      }
    }
  }

  public updateMousePosition = ({x, y}: { x: number, y: number }) => {
    const action = this.state.action
    if (action) {
      switch (action.type) {
        case "addingSeat":
        case "movingSeat":
          this.update({
            action: {
              ...action,
              seat: {
                ...action.seat,
                x: x - (seatWidth / 2),
                y: y - (seatHeight / 2)
              }
            }
          })
          break

        case "addingLine":
          const width = action.direction === "horizontal"
            ? seatWidth * action.numberOfSeats + action.spacing * (action.numberOfSeats - 1)
            : seatWidth
          const height = action.direction === "vertical"
            ? seatHeight * action.numberOfSeats + action.spacing * (action.numberOfSeats - 1)
            : seatHeight
          this.update({
            action: {
              ...action,
              x: x - (width / 2),
              y: y - (height / 2)
            }
          })
          break
      }
    }
  }
}