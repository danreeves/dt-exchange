import type React from "react"
import styled from "styled-components"

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

const StyledInput = styled.input`
  & {
    color: #fff;
    font: inherit;
    letter-spacing: inherit;
    padding: 4px 0 5px;
    border: 0;
    box-sizing: content-box;
    background: none;
    height: 1.4em;
    margin: 0;
    display: block;
    min-width: 0;
    width: 100%;
    outline: none;
  }
`
const StyledInputWrapper = styled.div.attrs((props: RuleInputProps) => ({
  isFocused: props.isFocused,
}))`
  & {
    margin-top: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-family: "Roboto Mono", monospace;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1.4em;
    color: #fff;
    box-sizing: border-box;
    cursor: text;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
  }
  &::before {
    border-bottom: 1px solid #fff;
    left: 0;
    bottom: 0;
    content: " ";
    position: absolute;
    right: 0;
    pointer-events: none;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  &::after {
    border-bottom: 2px solid rgb(53, 139, 147);
    left: 0;
    bottom: 0;
    content: "";
    position: absolute;
    right: 0;
    transform: ${ props => props.isFocused ? "scaleX(1) translateX(0px)" : "scaleX(0)" };
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    pointer-events: none;
  }
  &:hover::before {
    border-width: 2px;
  }
`

export const RuleInput = ((props: RuleInputProps) => {
  return (
    <>
      <StyledInputWrapper isFocused={props.isFocused}>
        <StyledInput
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
      </StyledInputWrapper>
    </>
  )
})
