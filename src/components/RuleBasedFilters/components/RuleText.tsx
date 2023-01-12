import type { Size } from "../../../types"
import "./RuleText.css"

export type TextProps = {
  size: Size
  children?: any
}
export function RuleText(props: TextProps) {
  const fontSize: string =
    props.size === "large" ? "large-text"
      : props.size === "medium" ? "medium-text"
        : props.size === "small" ? "small-text" : "medium-text";

  return (
    <>
      <span className={`filter-rules-text ${fontSize}`}>
        { props.children }
      </span>
    </>
  )
}
