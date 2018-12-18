import {h} from "preact"

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
    <button onClick={add}>+</button>
    <button onClick={startAddLine}>+++</button>
    <button onClick={startAddGrid}>###</button>
    <button onClick={renameSelectedSeat}>Rename</button>
    <button onClick={removeSeat}>🗑️</button>
    <button onClick={cancelAction}>X</button>
  </div>
}