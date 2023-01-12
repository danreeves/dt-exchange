import type React from "react"
import "./RuleInput.css"

type RuleInputProps = {
  type: "text" | "number"
  min?: number
  max?: number
  name: string
  index: number
  value: string | number
  isFocused: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
}
export function RuleInput(props: RuleInputProps) {
  return (
    <>
      <div className={`filter-rules-input-wrapper ${props.isFocused ? "filter-rules-input-focused" : ""}`}>
        <input
          className={"filter-rules-input"}
          type={props.type}
          min={props.type === "number" ? props.min : undefined}
          max={props.type === "number" ? props.max : undefined}
          step={props.type === "number" ? 1 : undefined}
          autoComplete={"off"}
          id={`${props.name}_${props.index}`}
          name={props.name}
          value={props.value}
          onChange={event => props.onChange(event)}
          onFocus={event => props.onFocus(event)}
          onBlur={() => props.onBlur()}
        />
      </div>
    </>
  )
}
