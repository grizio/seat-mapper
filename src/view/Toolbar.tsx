import {h} from "preact"
import IconButton from "./buttons/IconButton"
import {AddGridIcon, AddLineIcon, AddSeatIcon, CrossIcon, EditIcon, TrashIcon} from "view/icons"

interface Props {
  add: () => void
  startAddLine: () => void
  startAddGrid: () => void
  renameSelectedSeat: () => void
  removeSeat: () => void
  cancelAction: () => void
}

export function Toolbar({add, startAddLine, startAddGrid, renameSelectedSeat, removeSeat, cancelAction}: Props) {
  return <div class="toolbar">
    <IconButton label="Add a seat" onClick={add}><AddSeatIcon /></IconButton>
    <IconButton label="Add a line of seats" onClick={startAddLine}><AddLineIcon /></IconButton>
    <IconButton label="Add a grid of seats" onClick={startAddGrid}><AddGridIcon /></IconButton>
    <IconButton label="Rename" onClick={renameSelectedSeat}><EditIcon /></IconButton>
    <IconButton label="Remove seat" onClick={removeSeat}><TrashIcon /></IconButton>
    <IconButton label="Cancel current action" onClick={cancelAction}><CrossIcon /></IconButton>
  </div>
}