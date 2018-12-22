import {Component, h} from "preact"
import {Seat} from "../models/Seat"
import {State} from "../store/State"
import StringField from "./form/StringField"
import NumberField from "./form/NumberField"
import {Type} from "../models/Type"
import RadioField from "./form/RadioField"
import ColorField from "./form/ColorField"
import IconButton from "./buttons/IconButton"
import {AddIcon, TrashIcon} from "../icons"

interface Props {
  state: State
  updateSeat: (seat: Seat) => void
  updateSelectedSeats: (patch: Partial<Seat>) => void
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
        <h3>Types of seats</h3>
        {props.state.structure.types.map(_ => this.renderTypeView(_, props))}
        <section>
          <IconButton label="New type" onClick={props.addType}>
            <AddIcon />
          </IconButton>
        </section>
      </div>
    } else {
      return <div class="right-panel">
        <h3>Selected seats</h3>
        {this.renderBatchSeatView(seats, props)}
        {seats.map(_ => this.renderSeatView(_, props))}
      </div>
    }
  }

  renderBatchSeatView = (seats: Array<Seat>, props: Props) => {
    return (
      <section>
        <RadioField name={`right-panel-seat-all-seats-type`}
                    label="Type of selected seats"
                    options={
                      props.state.structure.types.map(type => ({
                        label: type.name,
                        value: type.id.toString()
                      }))
                    }
                    value={seats[0].type.toString()}
                    onChange={type => props.updateSelectedSeats({type: parseInt(type, 10)})}/>
      </section>
    )
  }

  renderSeatView = (seat: Seat, props: Props) => {
    return (
      <details key={`seat-${seat.id.toString()}`}>
        <summary>{seat.name}</summary>

        <StringField name={`right-panel-seat-${seat.id}-name`}
                     label="Seat name"
                     value={seat.name}
                     onChange={name => props.updateSeat({...seat, name})}/>

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

        <NumberField name={`right-panel-seat-${seat.id}-pos-x`}
                     label="X position"
                     value={seat.x}
                     onChange={x => props.updateSeat({...seat, x})}/>

        <NumberField name={`right-panel-seat-${seat.id}-pos-y`}
                     label="Y position"
                     value={seat.y}
                     onChange={y => props.updateSeat({...seat, y})}/>

        <NumberField name={`right-panel-seat-${seat.id}-width`}
                     label="Width"
                     value={seat.width}
                     onChange={width => props.updateSeat({...seat, width})}/>

        <NumberField name={`right-panel-seat-${seat.id}-height`}
                     label="Height"
                     value={seat.height}
                     onChange={height => props.updateSeat({...seat, height})}/>
      </details>
    )
  }

  renderTypeView = (type: Type, props: Props) => {
    return (
      <details key={`type-${type.id.toString()}`}>
        <summary>
          {props.state.structure.types.length > 1
            ? (
              <IconButton label="Remove" onClick={() => props.removeType(type.id)}>
                <TrashIcon size="small"/>
              </IconButton>
            )
            : undefined}

          {type.name}
        </summary>

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

        <RadioField name={`right-panel-type-${type.id}-bookable`}
                    label="Bookable"
                    options={[
                      {label: "Yes", value: "true"},
                      {label: "No", value: "false"}
                    ]}
                    value={type.bookable.toString()}
                    onChange={bookable => props.updateType({...type, bookable: bookable === "true"})}/>


      </details>
    )
  }
}