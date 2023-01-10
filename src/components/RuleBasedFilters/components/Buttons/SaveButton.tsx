import styled from "styled-components"
import { Size } from "../../../../types"
import { RuleText } from "../RuleText"
import { RuleButton } from "./RuleButton"

export type SaveBtnProps = {
  disabled: boolean
}

const StyledSaveButton = styled(RuleButton)`
  & {
    padding: 0 25px;
    margin: 0;
  }
  &:hover {
    color: rgb(102, 187, 106);
    background: rgba(102, 187, 106, 0.1);
  }
`

export const SaveButton = ((props: SaveBtnProps) => {
  return (
    <>
      <StyledSaveButton type={"submit"} disabled={props.disabled}>
        <RuleText size={Size.Medium}>Save</RuleText>
      </StyledSaveButton>
    </>
  )
})
