import {h} from "preact"
import {IconProps, sizeLength} from "./IconProps"

// From: https://www.iconfinder.com/icons/3324937/2_edit_icon
export default function ({size}: IconProps) {
  return (
    <svg fill="none" width={sizeLength(size)} height={sizeLength(size)} stroke="currentColor" stroke-linecap="round"
         stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
      <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"/>
    </svg>
  )
}