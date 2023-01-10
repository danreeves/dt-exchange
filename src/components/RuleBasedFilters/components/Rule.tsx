import type React from "react"
import styled from "styled-components"
import { RuleLabel } from "./RuleLabel"
import { RuleInput } from "./RuleInput"

type RuleProps = {
  label: string
  type: "text" | "number"
  min?: number
  max?: number
  name: string
  index: number
  value: string | number
  focus: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
}

const StyledWrapper = styled.div`
  & {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    padding: 0;
    margin: 7px 0;
    border: 0;
    vertical-align: top;
    width: 100%;
  }
`

export const Rule = ((props: RuleProps) => {
  const isFocused: boolean = props.focus === `${props.name}_${props.index}`
  return (
    <>
      <StyledWrapper>
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
          onChange={event => props.onChange(event)}
          onFocus={event => props.onFocus(event)}
          onBlur={() => props.onBlur()}
          isFocused={isFocused} />
      </StyledWrapper>
    </>
  )
})
