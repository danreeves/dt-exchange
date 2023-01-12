import { Size } from "../../../types"
import "./RuleText.css"

export type TextProps = {
  size: Size
  children?: any
}
export function RuleText(props: TextProps) {
  const fontSize: string =
    props.size === Size.Large ? "large-text"
      : props.size === Size.Medium ? "medium-text"
        : props.size === Size.Small ? "small-text" : "medium-text";

  return (
    <>
      <span className={`filter-rules-text ${fontSize}`}>
        { props.children }
      </span>
    </>
  )
}
