import {h} from "preact"
import {State} from "store/State"
import {Shadow} from "./Shadow";
import SeatElement from "./SeatElement"
import {onCurrentElement} from "../utils/view"
import {arrayWithoutUndefined} from "../utils/array"

interface Props {
  state: State
  selectSeat: (id: number, adding: boolean) => void
  deselectAllSeats: () => void
  startMoveSeats: () => void
  startZoneSelection: (event: MouseEvent) => void
  renameSeat: (id: number) => void
  confirmAction: () => void
}

export function Map(props: Props) {
  const {state, confirmAction} = props

  return (
    <svg class={arrayWithoutUndefined([
      "map",
      props.state.action ? "map-action" : undefined
    ]).join(" ")}
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
              selectSeat={props.selectSeat}
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