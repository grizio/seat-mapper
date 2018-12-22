import {h} from "preact"
import StringField from "view/form/StringField"
import RadioField from "view/form/RadioField"
import NumberField from "view/form/NumberField"
import {State} from "store/State"
import {Seat} from "models/Seat"

interface Props {
  state: State
  updateSeat: (seat: Seat) => void
  updateSelectedSeats: (patch: Partial<Seat>) => void
}

export default function SeatsPanel(props: Props) {
  const seats = props.state.structure.seats.filter(seat => props.state.selectedSeatIds.includes(seat.id))
  return (
    <div className="right-panel">
      <h3>Selected seats</h3>
      {BatchSeatView(seats, props)}
      {seats.map(_ => SeatView(_, props))}
    </div>
  )
}

function BatchSeatView(seats: Array<Seat>, props: Props) {
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

function SeatView(seat: Seat, props: Props) {
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