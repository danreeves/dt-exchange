import { RuleText } from "./RuleText"
import "./RuleLabel.css"

type RuleLabelProps = {
  label: string
  name: string
  index?: number
  isFocused: boolean
}
export function RuleLabel(props: RuleLabelProps) {
  return (
    <>
      <label
        className={`filter-rules-label ${
          props.isFocused ? "filter-rules-label-focused" : ""
        }`}
        htmlFor={`${props.name}_${props.index || 0}`}
      >
        <RuleText size={"small"}>{props.label}</RuleText>
      </label>
    </>
  )
}
