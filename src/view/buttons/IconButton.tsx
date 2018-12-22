import {ComponentChildren, h} from "preact"

interface Props {
  children: ComponentChildren
  label: string
  onClick: () => void
}

export default function IconButton(props: Props) {
  return <button class="icon-button" title={props.label} onClick={props.onClick}>{props.children}</button>
}