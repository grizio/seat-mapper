import {h} from "preact"
import {State} from "store/State"
import {Shadow} from "./Shadow";
import SeatElement from "./SeatElement"
import {onCurrentElement} from "../utils/view"

interface Props {
  state: State
  toggleSelectSeat: (id: number) => void
  deselectAllSeats: () => void
  startMoveSeats: () => void
  startZoneSelection: (event: MouseEvent) => void
  renameSeat: (id: number) => void
  confirmAction: () => void
}

export function Map(props: Props) {
  const {state, confirmAction} = props

  return (
    <svg class="map"
         onClick={onCurrentElement(props.deselectAllSeats)}
         onMouseDown={onCurrentElement(props.startZoneSelection)}
         onMouseUp={onCurrentElement(props.confirmAction)}
    >
      <g transform={`translate(${state.translation.x}, ${state.translation.y})`}>
        {
          state.structure.seats.map(seat => (
            <SeatElement
              storeState={props.state}
              seat={seat}
              toggleSelectSeat={props.toggleSelectSeat}
              startMoveSeats={props.startMoveSeats}
              renameSeat={props.renameSeat}
            />
          ))
        }
        <Shadow state={state} confirmAction={confirmAction}/>
      </g>
    </svg>
  )
}