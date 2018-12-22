import {h} from "preact"
import {Seat} from "models/Seat"
import {State} from "store/State"
import {Type} from "models/Type"
import TypesPanel from "./TypesPanel"
import SeatsPanel from "./SeatsPanel"

interface Props {
  state: State

  updateSeat: (seat: Seat) => void
  updateSelectedSeats: (patch: Partial<Seat>) => void

  addType: () => void
  updateType: (type: Type) => void
  removeType: (id: number) => void
}

export default function RightPanel(props: Props) {
  if (props.state.selectedSeatIds.length === 0) {
    return <TypesPanel
      state={props.state}
      addType={props.addType}
      updateType={props.updateType}
      removeType={props.removeType}
    />
  } else {
    return <SeatsPanel
      state={props.state}
      updateSeat={props.updateSeat}
      updateSelectedSeats={props.updateSelectedSeats}
    />
  }
}