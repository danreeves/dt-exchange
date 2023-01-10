import styled from "styled-components"
import { RuleText } from "../RuleText"
import { Size } from "../../../../types"
import { RuleButton } from "./RuleButton"

export type CancelBtnProps = {
  onClick: () => void
  disabled: boolean
}

const StyledCancelButton = styled(RuleButton)`
  &:hover {
    color: #d32239;
  }
  &:disabled {
    color: transparent;
  }
`

export const CancelButton = ((props: CancelBtnProps) => {
  return (
    <>
      <StyledCancelButton type={"button"} disabled={props.disabled} onClick={props.onClick}>
        <RuleText size={Size.Medium}>Cancel</RuleText>
      </StyledCancelButton>
    </>
  )
})
