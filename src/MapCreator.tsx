import {Component, h} from "preact"
import {Styles} from "./Styles"
import {Toolbar} from "./Toolbar"
import {Map} from "./Map"
import {Store} from "./Store"
import {State as StoreState} from "./State"

interface Props {
}

interface State {
  state: StoreState
}

export default class MapCreator extends Component<Props, State> {
  private readonly store: Store

  constructor(props: Props) {
    super(props)
    this.store = new Store({seats: []}, state => this.setState({state}))
  }

  render({}: Props, state: State): preact.ComponentChild {
    return <div class="host">
      <Styles/>
      <Toolbar add={this.startAddSeat}/>
      <div class="map-container" onMouseMove={this.mousemove}>
        <Map
          state={state.state}
          startMoveSeat={this.startMoveSeat}
          confirmAction={this.confirmAction}
        />
      </div>
    </div>
  }

  startAddSeat = () => this.store.startAddSeat()
  startMoveSeat = (id: number) => this.store.startMoveSeat(id)
  confirmAction = () => this.store.confirmAction()
  mousemove = (event: MouseEvent) => this.store.updateMousePosition({
    x: event.clientX - (event.currentTarget as HTMLElement).offsetLeft,
    y: event.clientY - (event.currentTarget as HTMLElement).offsetTop
  })
}