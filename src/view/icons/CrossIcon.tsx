import {h} from "preact"
import {IconProps, sizeLength} from "./IconProps"

// From: https://www.iconfinder.com/icons/226589/circle_cross_icon
export default function ({size}: IconProps) {
  return (
    <svg enable-background="new 0 0 96 96" width={sizeLength(size)} height={sizeLength(size)} id="circle_cross"
         version="1.1" viewBox="0 0 96 96">
      <path
        d="M48,4C23.7,4,4,23.699,4,48s19.7,44,44,44s44-19.699,44-44S72.3,4,48,4z M48,84c-19.882,0-36-16.118-36-36s16.118-36,36-36  s36,16.118,36,36S67.882,84,48,84z"/>
      <path
        d="M53.657,48l8.485-8.485c1.562-1.562,1.562-4.095,0-5.656c-1.562-1.562-4.096-1.562-5.658,0L48,42.343l-8.485-8.484  c-1.562-1.562-4.095-1.562-5.657,0c-1.562,1.562-1.562,4.096,0,5.656L42.343,48l-8.485,8.485c-1.562,1.562-1.562,4.095,0,5.656  c1.562,1.562,4.095,1.562,5.657,0L48,53.657l8.484,8.484c1.562,1.562,4.096,1.562,5.658,0c1.562-1.562,1.562-4.096,0-5.656  L53.657,48z"/>
    </svg>
  )
}