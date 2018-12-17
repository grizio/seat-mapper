import {addingSeats, movingSeat, State, zoneOfAddingSeats} from "./State"
import {arrayFill, promptEnum, promptInteger} from "./utils"
import {Pos, defaultPosition} from "./models/geometry"
import {seatHeight, seatWidth} from "./models/Seat"
import {zoneToRect} from "./models/adapters"

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
      action: addingSeats([defaultPosition])
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
    const direction = promptEnum<"vertical" | "v" | "horizontal" | "h", "vertical" | "horizontal">(
      "Direction of the lines",
      ["vertical", "v", "horizontal", "h"],
      (value) => value.startsWith("v") ? "vertical" : "horizontal"
    )
    if (direction === undefined) return

    const numberOfSeats = promptInteger("Number of seats")
    if (numberOfSeats === undefined) return

    const spacing = promptInteger("Spacing between seats (size of a seat: 50)")
    if (spacing === undefined) return

    if (direction === "horizontal") {
      this.update({
        action: addingSeats(arrayFill(numberOfSeats, index => ({
          x: (seatWidth + spacing) * index,
          y: 0
        })))
      })
    } else {
      this.update({
        action: addingSeats(arrayFill(numberOfSeats, index => ({
          x: 0,
          y: (seatHeight + spacing) * index
        })))
      })
    }
  }

  public confirmAction = () => {
    const state = this.state;
    const action = state.action
    if (action) {
      switch (action.type) {
        case "addingSeats":
          const nextSeatId = this.nextSeatId()
          this.update({
            seats: [
              ...state.seats,
              ...action.seats.map((seatPosition, index) => ({
                id: nextSeatId + index,
                x: seatPosition.x + action.position.x,
                y: seatPosition.y + action.position.y
              }))
            ],
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
      }
    }
  }

  public updateMousePosition = (position: Pos) => {
    const action = this.state.action
    if (action) {
      switch (action.type) {
        case "addingSeats":
          const containingRect = zoneToRect(zoneOfAddingSeats(action))
          this.update({
            action: {
              ...action,
              position: { x: position.x - containingRect.width / 2, y: position.y - containingRect.height / 2 }
            }
          })
          break

        case "movingSeat":
          this.update({
            action: {
              ...action,
              seat: {
                ...action.seat,
                x: position.x - (seatWidth / 2),
                y: position.y - (seatHeight / 2)
              }
            }
          })
          break
      }
    }
  }
}