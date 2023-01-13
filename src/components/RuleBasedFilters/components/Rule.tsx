import type React from "react"
import { RuleLabel } from "./RuleLabel"
import { RuleInput } from "./RuleInput"
import "./Rule.css"

type RuleProps = {
  label: string
  type: "text" | "number" | "color"
  min?: number
  max?: number
  name: string
  index: number
  value: string | number
  focus: string
  placeholder?: string
  dataValues?: string[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
}
export function Rule(props: RuleProps) {
  const isFocused: boolean = props.focus === `${props.name}_${props.index}`
  return (
    <>
      <div className={"filter-rule-wrapper"}>
        <RuleLabel
          label={props.label}
          name={props.name}
          index={props.index}
          isFocused={isFocused} />
        <RuleInput
          type={props.type}
          min={props.min}
          max={props.max}
          name={props.name}
          index={props.index}
          value={props.value}
          placeholder={props.placeholder}
          dataValues={props.dataValues}
          onChange={event => props.onChange(event)}
          onFocus={event => props.onFocus(event)}
          onBlur={() => props.onBlur()}
          isFocused={isFocused} />
      </div>
    </>
  )
}
