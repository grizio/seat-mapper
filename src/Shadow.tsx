import {h} from "preact"
import {Action} from "./State";

interface Props {
  action?: Action
  confirmAction: () => void
}

export function Shadow({action, confirmAction}: Props) {
  if (action !== undefined) {
    return (
      <div class="shadow">
        <div class="shadow-seat" style={{top: action.seat.y, left: action.seat.x}} onClick={confirmAction}/>
      </div>
    )
  } else {
    return <div/>
  }
}