import { RuleText } from "./RuleText"
import { Size } from "../../../types"
import "./RuleLabel.css"

type RuleLabelProps = {
  label: string
  name: string
  index: number
  isFocused: boolean
}
export function RuleLabel(props: RuleLabelProps) {
  return (
    <>
      <label
        className={`filter-rules-label ${props.isFocused ? "filter-rules-label-focused" : ""}`}
        htmlFor={`${props.name}_${props.index}`}
      >
        <RuleText size={Size.Large}>{ props.label }</RuleText>
      </label>
    </>
  )
}
