import {h} from "preact"

interface Props {
  add: () => void
  startAddLine: () => void
  startAddGrid: () => void
}

export function Toolbar({add, startAddLine, startAddGrid}: Props) {
  return <div class="toolbar">
    <button onClick={add}>+</button>
    <button onClick={startAddLine}>+++</button>
    <button onClick={startAddGrid}>###</button>
  </div>
}