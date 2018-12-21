import {
  addingSeats,
  graping,
  isAddingSeats,
  isGraping,
  isMovingSeats, isZoneSelection,
  movingSeats,
  State,
  zoneOfActionSeatContainer, zoneSelection
} from "./State"
import {
  Pos,
  translatePosition,
  differencePosition,
  negativePosition,
  translateSeat,
  containingZone, zoneTopLeftPosition, translateZone, isIncluded, normalizeZone
} from "models/geometry"
import { seatToZone, zoneToRect } from 'models/adapters'
import addLineModal from "view/modal/AddLineModal"
import addGridModal from "view/modal/AddGridModal"
import { magnet } from 'utils/view'
import {generateSeatGrid, generateSeatLine} from "utils/generators"
import renameSeatsModal from "../view/modal/RenameSeatsModal"
import {Seat} from "../models/Seat"

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

  public reload = (seats: Array<Seat>) => {
    this.update({
      seats: seats,
      selectedSeatIds: [],
      action: undefined
    })
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

  public renameSeat = (id: number) => {
    this.renameSeats([id])
  }

  public renameSelectedSeats = () => {
    this.renameSeats(this.state.selectedSeatIds)
  }

  private renameSeats = (seatIds: Array<number>) => {
    const seats = this.state.seats.filter(_ => seatIds.includes(_.id))
    renameSeatsModal(seats)
      .then(({seats: seatPatches}) => {
        this.update({
          seats: this.state.seats.map(seat => {
            const seatPatch = seatPatches.find(_ => _.id === seat.id)
            if (seatPatch) {
              return {...seat, name: seatPatch.name}
            } else {
              return seat
            }
          })
        })
      })
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

  public deselectAllSeats = () => {
    this.update({ selectedSeatIds: [] })
  }

  public startZoneSelection = (event: MouseEvent) => {
    this.update({
      action: zoneSelection({
        x1: this.state.mousePosition.x,
        y1: this.state.mousePosition.y,
        x2: this.state.mousePosition.x,
        y2: this.state.mousePosition.y
      }, event.ctrlKey)
    })
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

        case "zoneSelection":
          const seatIdsInSelection = this.state.seats
            .filter(seat => isIncluded(seatToZone(seat), normalizeZone(action.zone)))
            .map(_ => _.id)
          this.update({
            selectedSeatIds: action.additionalSeats ? [...this.state.selectedSeatIds, ...seatIdsInSelection] : seatIdsInSelection,
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
        const newPosition = translatePosition(position, negativePosition(action.positionInAction))
        const containerZone = containingZone(action.seats.map(seatToZone))
        const magnetizedPosition = magnet(translateZone(containerZone, newPosition), translateZone(containerZone, action.initialPosition))
        this.update({
          action: {
            ...action,
            position: translatePosition(newPosition, magnetizedPosition)
          }
        })
      } else if (isZoneSelection(action)) {
        this.update({
          action: {
            ...action,
            zone: {
              ...action.zone,
              x2: position.x,
              y2: position.y
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