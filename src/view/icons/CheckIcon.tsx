import {h} from "preact"
import {IconProps, sizeLength} from "./IconProps"

// From: https://www.iconfinder.com/icons/226590/check_circle_icon
export default function ({ size }: IconProps) {
  return (
    <svg enable-background="new 0 0 96 96" width={sizeLength(size)} height={sizeLength(size)} id="circle_check" version="1.1" viewBox="0 0 96 96">
      <path
        d="M48,4C23.7,4,4,23.699,4,48s19.7,44,44,44s44-19.699,44-44S72.3,4,48,4z M48,84c-19.882,0-36-16.118-36-36s16.118-36,36-36  s36,16.118,36,36S67.882,84,48,84z"/>
      <path
        d="M64.284,37.17c-1.562-1.561-4.095-1.561-5.657,0L44.485,51.313l-5.657-5.657c-1.562-1.562-4.094-1.562-5.657,0  c-1.562,1.562-1.562,4.095,0,5.658l8.484,8.483c1.562,1.562,4.096,1.562,5.658,0l16.97-16.97  C65.846,41.265,65.848,38.733,64.284,37.17z"/>
    </svg>
  )
}