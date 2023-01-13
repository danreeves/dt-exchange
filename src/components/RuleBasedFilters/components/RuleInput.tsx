import type React from "react"
import "./RuleInput.css"

type RuleInputProps = {
  type: "text" | "number" | "color"
  min?: number
  max?: number
  name: string
  index: number
  value: string | number
  isFocused: boolean
  placeholder?: string
  dataValues?: string[]
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
          placeholder={props.placeholder}
          list={props.dataValues?.length ? `${props.name}_${props.index}_options` : undefined}
          onChange={event => props.onChange(event)}
          onFocus={event => props.onFocus(event)}
          onBlur={() => props.onBlur()}
        />
        {props.dataValues?.length ? (
          <datalist id={`${props.name}_${props.index}_options`}>
            {props.dataValues.map(function (value: string, index: number) {
              return (
                <option key={`${props.name}_${props.index}_option${index}`} value={value} />
              )
            })}
          </datalist>
        ) : undefined}
      </div>
    </>
  )
}
