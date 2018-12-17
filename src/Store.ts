import {addingSeat, State} from "./State";

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

  startAddSeat = () => {
    this.update({
      action: addingSeat({id: 0, x: 0, y: 0})
    })
  }

  confirmAction = () => {
    if (this.state.action) {
      switch (this.state.action.type) {
        case "addingSeat":
          this.update({
            seats: [...this.state.seats, this.state.action.seat],
            action: undefined
          })
      }
    }
  }

  updateMousePosition = ({x, y}: { x: number, y: number }) => {
    if (this.state.action) {
      switch (this.state.action.type) {
        case "addingSeat":
          this.update({
            action: addingSeat({
              ...this.state.action.seat,
              x: x - 25,
              y: y - 25,
            })
          })
      }
    }
  }
}