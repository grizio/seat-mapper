import { defaultPosition } from 'models/geometry'
import { Component, h } from 'preact'
import { State as StoreState } from 'store/State'
import { Store } from 'store/Store'
import { Map } from './Map'
import { Styles } from './Styles'
import { Toolbar } from './Toolbar'
import RightPanel from "./RightPanel"
import {defaultStructure, hasStructureChanged, Structure} from "../models/Structure"

interface Props {
  initialStructure?: Structure
  onChange: (structure: Structure) => void
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
        structure: props.initialStructure || defaultStructure,
        selectedSeatIds: [],
        translation: defaultPosition,
        mousePosition: defaultPosition
      },
      this.onStoreUpdate
    )
  }

  componentWillReceiveProps(nextProps: Props) {
    this.store.reload(nextProps.initialStructure || defaultStructure)
  }

  onStoreUpdate = (state: StoreState) => {
    if (this.state.state === undefined || hasStructureChanged(state.structure, this.state.state.structure)) {
      this.props.onChange(state.structure)
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
      <div class="row">
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
        <RightPanel state={state.state} updateSeat={this.store.updateSeat}/>
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