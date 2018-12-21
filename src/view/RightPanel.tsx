import {Component, h} from "preact"
import {Seat} from "../models/Seat"
import {State} from "../store/State"
import StringField from "./form/StringField"
import NumberField from "./form/NumberField"

interface Props {
  state: State
  updateSeat: (seat: Seat) => void
}

export default class RightPanel extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render(props: Props) {
    const seats = props.state.seats.filter(seat => props.state.selectedSeatIds.includes(seat.id))
    if (seats.length === 0) {
      return <div class="right-panel">
        {this.renderEmptyView()}
      </div>
    } else {
      return <div class="right-panel">
        {seats.map(_ => this.renderSeatView(_, props))}
      </div>
    }
  }

  renderSeatView = (seat: Seat, props: Props) => {
    return (
      <section>
        <h4>{seat.name}</h4>

        <StringField name="right-panel-seat-name"
                     label="Seat name"
                     value={seat.name}
                     onChange={name => props.updateSeat({...seat, name})}/>

        <NumberField name="right-panel-seat-pos-x"
                     label="X position"
                     value={seat.x}
                     onChange={x => props.updateSeat({...seat, x})}/>

        <NumberField name="right-panel-seat-pos-y"
                     label="Y position"
                     value={seat.y}
                     onChange={y => props.updateSeat({...seat, y})}/>
      </section>
    )
  }

  renderEmptyView = () => {
    return <div>
      Select a seat to see additional information
    </div>
  }
}