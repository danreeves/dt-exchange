import styled from "styled-components"
import { RuleText } from "./RuleText"
import { Size } from "../../../types"

type RuleLabelProps = {
  label: string
  name: string
  index: number
  isFocused: boolean
}

const StyledLabel = styled.label.attrs((props: RuleLabelProps) => ({
  isFocused: props.isFocused,
}))`
  & {
    color: ${ props => props.isFocused ? "#358b93" : "#fff" };
    padding: 0;
    display: block;
    transform-origin: left top;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 133%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(0px, -1.5px) scale(0.75);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }
`

export const RuleLabel = ((props: RuleLabelProps) => {
  return (
    <>
      <StyledLabel htmlFor={`${props.name}_${props.index}`} isFocused={props.isFocused}>
        <RuleText size={Size.Large}>{ props.label }</RuleText>
      </StyledLabel>
    </>
  )
})
