import {h} from "preact"
import {State} from "store/State"
import {Shadow} from "./Shadow";
import SeatElement from "./SeatElement"

interface Props {
  state: State
  toggleSelectSeat: (id: number) => void
  deselectAllSeats: () => void
  startMoveSeats: () => void
  renameSeat: (id: number) => void
  confirmAction: () => void
}

export function Map(props: Props) {
  const {state, confirmAction} = props

  const onClick = (event: MouseEvent) => {
    if (event.currentTarget === event.target) {
      props.deselectAllSeats()
    }
  }

  return (
    <svg class="map" onClick={onClick}>
      <g transform={`translate(${state.translation.x}, ${state.translation.y})`}>
        {
          state.seats.map(seat => (
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