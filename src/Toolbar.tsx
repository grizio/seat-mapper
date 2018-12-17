import {h} from "preact"

interface Props {
  add: () => void
}

export function Toolbar({add}: Props) {
  return <div class="toolbar">
    <button onClick={add}>+</button>
  </div>
}