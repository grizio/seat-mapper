import {h} from "preact"
import {IconProps, sizeLength} from "./IconProps"

// From: https://www.iconfinder.com/icons/226558/stack_icon
export default function ({size}: IconProps) {
  return (
    <svg enable-background="new 0 0 96 96" width={sizeLength(size)} height={sizeLength(size)} id="stack" version="1.1" viewBox="0 0 96 96">
      <path
        d="M80,4H44c-6.63,0-12,5.37-12,12v16H16C9.37,32,4,37.37,4,44v36c0,6.63,5.37,12,12,12h36c6.63,0,12-5.37,12-12V64h16  c6.63,0,12-5.37,12-12V16C92,9.37,86.63,4,80,4z M56,80c0,2.21-1.79,4-4,4H16c-2.21,0-4-1.79-4-4V44c0-2.21,1.79-4,4-4h16v12  c0,6.63,5.37,12,12,12h12V80z M84,52c0,2.21-1.79,4-4,4H44c-2.21,0-4-1.79-4-4V16c0-2.21,1.79-4,4-4h36c2.21,0,4,1.79,4,4V52z"/>
    </svg>
  )
}