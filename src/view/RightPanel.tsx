import {Component, h} from "preact"
import {Seat} from "../models/Seat"
import {State} from "../store/State"
import StringField from "./form/StringField"
import NumberField from "./form/NumberField"
import {Type} from "../models/Type"
import RadioField from "./form/RadioField"
import ColorField from "./form/ColorField"

interface Props {
  state: State
  updateSeat: (seat: Seat) => void
  addType: () => void
  updateType: (type: Type) => void
  removeType: (id: number) => void
}

export default class RightPanel extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render(props: Props) {
    const seats = props.state.structure.seats.filter(seat => props.state.selectedSeatIds.includes(seat.id))
    if (seats.length === 0) {
      return <div class="right-panel">
        {props.state.structure.types.map(_ => this.renderTypeView(_, props))}
        <button onClick={props.addType}>Add</button>
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

        <StringField name={`right-panel-seat-${seat.id}-name`}
                     label="Seat name"
                     value={seat.name}
                     onChange={name => props.updateSeat({...seat, name})}/>

        <NumberField name={`right-panel-seat-${seat.id}-pos-x`}
                     label="X position"
                     value={seat.x}
                     onChange={x => props.updateSeat({...seat, x})}/>

        <NumberField name={`right-panel-seat-${seat.id}-pos-y`}
                     label="Y position"
                     value={seat.y}
                     onChange={y => props.updateSeat({...seat, y})}/>

        <RadioField name={`right-panel-seat-${seat.id}-type`}
                    label="Type"
                    options={
                      props.state.structure.types.map(type => ({
                        label: type.name,
                        value: type.id.toString()
                      }))
                    }
                    value={seat.type.toString()}
                    onChange={type => props.updateSeat({...seat, type: parseInt(type, 10)})}/>
      </section>
    )
  }

  renderTypeView = (type: Type, props: Props) => {
    return (
      <section>
        <h4>{type.name}</h4>

        <StringField name={`right-panel-type-${type.id}-name`}
                     label="Type name"
                     value={type.name}
                     onChange={name => props.updateType({...type, name})}/>

        <RadioField name={`right-panel-type-${type.id}-figure`}
                    label="Figure"
                    options={[
                      {label: "Rectangle", value: "rectangle"},
                      {label: "Circle", value: "circle"}
                    ]}
                    value={type.figure}
                    onChange={figure => props.updateType({...type, figure})}/>

        <ColorField name={`right-panel-type-${type.id}-border-color`}
                    label="Border color"
                    value={type.borderColor}
                    onChange={borderColor => props.updateType({...type, borderColor})}/>

        <NumberField name={`right-panel-type-${type.id}-border-width`}
                    label="Border width"
                    value={type.borderWidth}
                    onChange={borderWidth => props.updateType({...type, borderWidth})}/>

        { props.state.structure.types.length > 1 ? <button onClick={() => props.removeType(type.id)}>Remove</button> : undefined }
      </section>
    )
  }
}