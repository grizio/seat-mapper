import {
  addingSeats,
  graping,
  isAddingSeats,
  isGraping,
  isMovingSeats,
  movingSeats,
  State,
  zoneOfActionSeatContainer
} from "./State"
import {
  Pos,
  translatePosition,
  differencePosition,
  negativePosition,
  translateSeat,
  containingZone, zoneTopLeftPosition
} from 'models/geometry'
import { seatToZone, zoneToRect } from 'models/adapters'
import addLineModal from "view/modal/AddLineModal"
import addGridModal from "view/modal/AddGridModal"
import {promptString} from "utils/view"
import {generateSeatGrid, generateSeatLine} from "utils/generators"

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
      .then((parameters) => {
        this.update({
          action: addingSeats(generateSeatGrid(parameters))
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

  public renameSelectedSeats = () => {
    this.state.selectedSeatIds.forEach(_ => this.renameSeat(_, false))
  }

  public removeSeats = () => {
    this.update({
      seats: this.state.seats.filter(seat => this.state.selectedSeatIds.every(_ => _ !== seat.id)),
      selectedSeatIds: []
    })
  }

  public toggleSelectSeat = (id: number) => {
    if (this.state.selectedSeatIds.some(_ => _ === id)) {
      this.update({
        selectedSeatIds: this.state.selectedSeatIds.filter(_ => _ !== id),
        action: undefined
      })
    } else {
      const seatToSelect = this.state.seats.find(_ => _.id === id)
      if (seatToSelect !== undefined) {
        this.update({
          selectedSeatIds: [
            ...this.state.selectedSeatIds,
            seatToSelect.id
          ]
        })
      }
    }
  }

  public startMoveSeats = () => {
    const zone = containingZone(this.getSelectedSeats().map(seatToZone))
    this.update({
      action: movingSeats(
        this.getSelectedSeats().map(seat => translateSeat(seat, negativePosition({x: zone.x1, y: zone.y1}))),
        zoneTopLeftPosition(zone),
        differencePosition(zoneTopLeftPosition(zone), this.state.mousePosition)
      )
    })
  }

  private getSelectedSeats = () => {
    return this.state.seats.filter(_ => this.state.selectedSeatIds.includes(_.id))
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

        case "movingSeats":
          this.update({
            seats: state.seats.map(seat => {
              const movingSeat = action.seats.find(_ => _.id === seat.id)
              if (movingSeat !== undefined) {
                return translateSeat(movingSeat, action.position)
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
        selectedSeatIds: [],
        action: undefined
      })
    }
  }

  public updateMousePosition = (clientPosition: Pos) => {
    const position: Pos = translatePosition(clientPosition, negativePosition(this.state.translation))
    this.update({ mousePosition: position })
    const action = this.state.action
    if (action) {
      if (isAddingSeats(action)) {
        const containingRect = zoneToRect(zoneOfActionSeatContainer(action))
        this.update({
          action: {
            ...action,
            position: { x: position.x - containingRect.width / 2, y: position.y - containingRect.height / 2 }
          }
        })
      } else if (isMovingSeats(action)) {
        this.update({
          action: {
            ...action,
            position: translatePosition(position, negativePosition(action.positionInAction))
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