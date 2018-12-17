import {addingSeat, movingSeat, State} from "./State";

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
    const idMax = this.state.seats.reduce((acc, seat) => Math.max(acc, seat.id), 0)
    const nextId = idMax + 1
    this.update({
      action: addingSeat({id: nextId, x: 0, y: 0})
    })
  }

  public startMoveSeat = (id: number) => {
    const seat = this.state.seats.find(_ => _.id === id)
    if (seat !== undefined) {
      this.update({
        action: movingSeat(seat)
      })
    }
  }

  public confirmAction = () => {
    const state = this.state;
    if (state.action) {
      switch (state.action.type) {
        case "addingSeat":
          this.update({
            seats: [...state.seats, state.action.seat],
            action: undefined
          })
          break
        case "movingSeat":
          const movingSeat = state.action.seat
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
      }
    }
  }

  public updateMousePosition = ({x, y}: { x: number, y: number }) => {
    const state = this.state;
    if (state.action) {
      switch (state.action.type) {
        case "addingSeat":
          this.update({
            action: addingSeat({
              ...state.action.seat,
              x: x - 25,
              y: y - 25,
            })
          })
          break
        case "movingSeat":
          this.update({
            action: movingSeat({
              ...state.action.seat,
              x: x - 25,
              y: y - 25,
            })
          })
          break
      }
    }
  }
}