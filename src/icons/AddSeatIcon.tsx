import {h} from "preact"
import {IconProps, sizeLength} from "./IconProps"

// From: https://www.iconfinder.com/icons/3325018/plus_square_icon
export default function ({ size }: IconProps) {
  return (
    <svg fill="none" width={sizeLength(size)} height={sizeLength(size)} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
         stroke-width="2" viewBox="0 0 24 24">
      <rect height="18" rx="2" ry="2" width="18" x="3" y="3"/>
      <line x1="12" x2="12" y1="8" y2="16"/>
      <line x1="8" x2="16" y1="12" y2="12"/>
    </svg>
  )
}