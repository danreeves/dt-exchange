import styled from "styled-components"
import { Size } from "../../../types"

export type TextProps = {
  size: Size
  children?: any
}

export const StyledRuleText = styled.span.attrs((props: TextProps) => ({
  fontSize:
    props.size === Size.Large ? "1rem"
      : props.size === Size.Medium ? "0.9rem"
        : props.size === Size.Small ? "0.75rem" : "1rem",
}))<TextProps>`
  & {
    font-family: "Roboto Mono", monospace;
    font-weight: 400;
    font-size: ${props => props.fontSize};
    line-height: 1.4em;
  }
`
export const RuleText = ((props: TextProps) => {
  return (
    <>
      <StyledRuleText size={ props.size }>
        { props.children }
      </StyledRuleText>
    </>
  )
})
