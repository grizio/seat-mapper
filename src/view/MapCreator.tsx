import { defaultPosition } from 'models/geometry'
import { Component, h } from 'preact'
import { State as StoreState } from 'store/State'
import { Store } from 'store/Store'
import { Map } from './Map'
import { Styles } from './Styles'
import { Toolbar } from './Toolbar'
import {arrayEqual} from "../utils/array"
import {Seat, seatEqual} from "../models/Seat"

interface Props {
  initialSeats: Array<Seat>
  onChange: (seats: Array<Seat>) => void
}

interface State {
  state: StoreState
}

export default class MapCreator extends Component<Props, State> {
  private readonly store: Store

  constructor(props: Props) {
    super(props)
    this.store = new Store(
      {
        seats: props.initialSeats || [],
        selectedSeatIds: [],
        translation: defaultPosition,
        mousePosition: defaultPosition
      },
      this.onStoreUpdate
    )
  }

  componentWillReceiveProps(nextProps: Props) {
    this.store.reload(nextProps.initialSeats || [])
  }

  onStoreUpdate = (state: StoreState) => {
    const previousSeats = this.state.state !== undefined ? this.state.state.seats : []
    const nextSeats = state.seats
    if (!arrayEqual(previousSeats, nextSeats, seatEqual)) {
      this.props.onChange(nextSeats)
    }
    this.setState({state})
  }

  render({}: Props, state: State): preact.ComponentChild {
    return <div class="host" onKeyPress={this.onKeyPress} tabIndex={-1}>
      <Styles/>
      <Toolbar
        add={this.store.startAddSeat}
        startAddLine={this.store.startAddLine}
        startAddGrid={this.store.startAddGrid}
        renameSelectedSeat={this.store.renameSelectedSeats}
        removeSeat={this.store.removeSeats}
        cancelAction={this.store.cancelAction}
      />
      <div class="map-container" onMouseMove={this.mousemove} onMouseDown={this.mousedown} onMouseUp={this.mouseup}>
        <Map
          state={state.state}
          toggleSelectSeat={this.store.toggleSelectSeat}
          deselectAllSeats={this.store.deselectAllSeats}
          startZoneSelection={this.store.startZoneSelection}
          startMoveSeats={this.store.startMoveSeats}
          renameSeat={this.store.renameSeat}
          confirmAction={this.store.confirmAction}
        />
      </div>
    </div>
  }

  mousemove = (event: MouseEvent) => this.store.updateMousePosition({
    x: event.clientX - (event.currentTarget as HTMLElement).offsetLeft,
    y: event.clientY - (event.currentTarget as HTMLElement).offsetTop
  })
  mousedown = (event: MouseEvent) => {
    if (event.shiftKey) {
      this.store.startGraping({
        x: event.clientX - (event.currentTarget as HTMLElement).offsetLeft,
        y: event.clientY - (event.currentTarget as HTMLElement).offsetTop
      })
    }
  }
  mouseup = () => this.store.endGraping()

  onKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        this.store.cancelAction()
        break
      case "Backspace":
      case "Delete":
        this.store.removeSeats()
        break
      case "r":
      case "R":
        if (!event.ctrlKey && !event.altKey) {
          this.store.renameSelectedSeats()
        }
        break
    }
  }
}