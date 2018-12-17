import {h} from "preact"

interface Props {
  add: () => void
  startAddLine: () => void
  startAddGrid: () => void
  cancelAction: () => void
}

export function Toolbar({add, startAddLine, startAddGrid, cancelAction}: Props) {
  return <div class="toolbar">
    <button onClick={add}>+</button>
    <button onClick={startAddLine}>+++</button>
    <button onClick={startAddGrid}>###</button>
    <button onClick={cancelAction}>X</button>
  </div>
}