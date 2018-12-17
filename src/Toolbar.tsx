import {h} from "preact"

interface Props {
  add: () => void
  startAddLine: () => void
}

export function Toolbar({add, startAddLine}: Props) {
  return <div class="toolbar">
    <button onClick={add}>+</button>
    <button onClick={startAddLine}>+++</button>
  </div>
}