import {h} from "preact"

interface Props {
  label: string
  onClick: () => void
}

export default function TextButton(props: Props) {
  return <button class="text-button" onClick={props.onClick}>{props.label}</button>
}