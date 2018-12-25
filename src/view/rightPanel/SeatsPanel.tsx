import {h} from "preact"
import StringField from "view/form/StringField"
import RadioField from "view/form/RadioField"
import NumberField from "view/form/NumberField"
import {State} from "store/State"
import {Seat} from "models/Seat"
import i18n  from "../../i18n"

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
                  label={i18n("rightPanel.typeOfSelectSeats", props.state.language)}
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
                   label={i18n("rightPanel.seatName", props.state.language)}
                   value={seat.name}
                   onChange={name => props.updateSeat({...seat, name})}/>

      <RadioField name={`right-panel-seat-${seat.id}-type`}
                  label={i18n("rightPanel.seatType", props.state.language)}
                  options={
                    props.state.structure.types.map(type => ({
                      label: type.name,
                      value: type.id.toString()
                    }))
                  }
                  value={seat.type.toString()}
                  onChange={type => props.updateSeat({...seat, type: parseInt(type, 10)})}/>

      <NumberField name={`right-panel-seat-${seat.id}-pos-x`}
                   label={i18n("rightPanel.xPos", props.state.language)}
                   value={seat.x}
                   onChange={x => props.updateSeat({...seat, x})}/>

      <NumberField name={`right-panel-seat-${seat.id}-pos-y`}
                   label={i18n("rightPanel.yPos", props.state.language)}
                   value={seat.y}
                   onChange={y => props.updateSeat({...seat, y})}/>

      <NumberField name={`right-panel-seat-${seat.id}-width`}
                   label={i18n("rightPanel.width", props.state.language)}
                   value={seat.width}
                   onChange={width => props.updateSeat({...seat, width})}/>

      <NumberField name={`right-panel-seat-${seat.id}-height`}
                   label={i18n("rightPanel.height", props.state.language)}
                   value={seat.height}
                   onChange={height => props.updateSeat({...seat, height})}/>
    </details>
  )
}