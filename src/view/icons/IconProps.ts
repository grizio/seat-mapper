export interface IconProps {
  size?: Size
}

export type Size = "small" | "normal"
export function sizeLength(size: Size | undefined): string {
  if (size === "small") return "16px"
  if (size === "normal") return "24px"
  else return "24px"
}