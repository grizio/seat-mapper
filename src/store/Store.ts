import {
  addingSeats,
  graping,
  isAddingSeats,
  isGraping,
  isMovingSeat,
  movingSeat,
  State,
  zoneOfAddingSeats
} from "./State"
import {Pos, translatePosition, differencePosition, negativePosition} from "models/geometry"
import {seatHeight, seatWidth} from "models/Seat"
import {zoneToRect} from "models/adapters"
import addLineModal from "view/modal/AddLineModal"
import addGridModal from "view/modal/AddGridModal"
import {arrayFill} from "utils/array"
import {promptString} from "utils/view"
import {generateSeatLine} from "../utils/generators"

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
      action: addingSeats([{
        id: -1,
        name: "",
        x: 0,
        y: 0
      }])
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
    addLineModal()
      .then((parameters) => {
        this.update({
          action: addingSeats(generateSeatLine(parameters))
        })
      })
  }

  public startAddGrid = () => {
    addGridModal()
      .then(({numberOfRows, numberOfColumns, columnSpacing, rowSpacing, shift}) => {
        this.update({
          action: addingSeats(arrayFill(numberOfRows, (rowIndex) => {
            return arrayFill(numberOfColumns, (columnIndex) => {
              return {
                id: -1,
                name: "",
                x: (seatWidth + rowSpacing) * columnIndex + (rowIndex * (shift) % (seatWidth + rowSpacing)),
                y: (seatHeight + columnSpacing) * rowIndex
              }
            })
          }).flat())
        })
      })
  }

  public renameSeat = (id: number, removeAction: boolean = false) => {
    const seat = this.state.seats.find(_ => _.id === id)
    if (seat !== undefined) {
      const seatName = promptString(`New seat name (current: ${seat.name || "-"})`)
      if (seatName === undefined) return
      this.update({
        seats: this.state.seats.map(currentSeat => {
          if (currentSeat.id === seat.id) {
            return {...currentSeat, name: seatName}
          } else {
            return currentSeat
          }
        }),
        action: removeAction ? undefined : this.state.action
      })
    }
  }

  public renameSelectedSeat = () => {
    const action = this.state.action
    if (action && isMovingSeat(action)) {
      this.renameSeat(action.seat.id, true)
    }
  }

  public removeSeat = () => {
    const action = this.state.action
    if (action && isMovingSeat(action)) {
      this.update({
        seats: this.state.seats.filter(_ => _.id !== action.seat.id),
        action: undefined
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
              ...action.seats.map((seatInfo, index) => ({
                id: nextSeatId + index,
                name: seatInfo.name,
                x: seatInfo.x + action.position.x,
                y: seatInfo.y + action.position.y
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

  public cancelAction = () => {
    if (this.state.action && isGraping(this.state.action)) {
      this.update({
        translation: this.state.action.mapStartingPosition,
        action: undefined
      })
    } else {
      this.update({
        action: undefined
      })
    }
  }

  public updateMousePosition = (clientPosition: Pos) => {
    const position: Pos = translatePosition(clientPosition, negativePosition(this.state.translation))
    const action = this.state.action
    if (action) {
      if (isAddingSeats(action)) {
        const containingRect = zoneToRect(zoneOfAddingSeats(action))
        this.update({
          action: {
            ...action,
            position: {x: position.x - containingRect.width / 2, y: position.y - containingRect.height / 2}
          }
        })
      } else if (isMovingSeat(action)) {
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
      } else if (isGraping(action)) {
        this.update({
          translation: translatePosition(action.mapStartingPosition, differencePosition(action.clientStartingPosition, clientPosition))
        })
      }
    }
  }

  public startGraping = (clientPosition: Pos) => {
    this.update({
      action: graping(clientPosition, this.state.translation)
    })
  }

  public endGraping = () => {
    if (this.state.action && isGraping(this.state.action)) {
      this.update({
        action: undefined
      })
    }
  }
}