import { Language } from 'i18n'
import { defaultPosition } from 'models/geometry'
import { Component, h } from 'preact'
import { State as StoreState } from 'store/State'
import { Store } from 'store/Store'
import { Map } from './map/Map'
import { Styles } from './Styles'
import { Toolbar } from './Toolbar'
import RightPanel from "./rightPanel/RightPanel"
import {defaultStructure, hasStructureChanged, Structure} from "../models/Structure"

interface Props {
  initialStructure?: Structure
  language?: Language
  onChange: (structure: Structure) => void
}

interface State {
  state: StoreState
}

export default class SeatMapper extends Component<Props, State> {
  private readonly store: Store

  constructor(props: Props) {
    super(props)
    this.store = new Store(
      {
        language: props.language,
        structure: props.initialStructure || defaultStructure,
        selectedSeatIds: [],
        translation: defaultPosition,
        mousePosition: defaultPosition
      },
      this.onStoreUpdate
    )
  }

  componentWillReceiveProps(nextProps: Props) {
    this.store.reload(nextProps.initialStructure || defaultStructure, nextProps.language)
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
        language={state.state.language}
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
            selectSeat={this.store.selectSeat}
            deselectAllSeats={this.store.deselectAllSeats}
            startZoneSelection={this.store.startZoneSelection}
            startMoveSeats={this.store.startMoveSeats}
            renameSeat={this.store.renameSeat}
            confirmAction={this.store.confirmAction}
          />
        </div>
        <RightPanel
          state={state.state}
          updateSeat={this.store.updateSeat}
          updateSelectedSeats={this.store.updateSelectedSeats}
          addType={this.store.addType}
          updateType={this.store.updateType}
          removeType={this.store.removeType}
        />
      </div>
    </div>
  }

  mousemove = (event: MouseEvent) => this.store.updateMousePosition({
    x: event.clientX - (event.currentTarget as HTMLElement).offsetLeft + document.body.scrollLeft,
    y: event.clientY - (event.currentTarget as HTMLElement).offsetTop + document.body.scrollTop
  })
  mousedown = (event: MouseEvent) => {
    if (event.shiftKey) {
      this.store.startGraping({
        x: event.clientX - (event.currentTarget as HTMLElement).offsetLeft + document.body.scrollLeft,
        y: event.clientY - (event.currentTarget as HTMLElement).offsetTop + document.body.scrollTop
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