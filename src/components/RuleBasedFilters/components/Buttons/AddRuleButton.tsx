import styled from "styled-components"
import { RuleText } from "../RuleText"
import { Size } from "../../../../types"

export type AddRuleBtnProps = {
  onClick: () => void
}

const StyledAddButton = styled.button`
  & {
    flex: 1 1 100%;
    height: 38px;
    color: #bdbdbd;
    background: #0b0b0b;
    padding: 0;
    margin: 0;
    border: 1px solid #328588;
    cursor: pointer;
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, border-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }
  &:hover {
    color: #fff;
    border-color: #5df8ff;
  }
`

const StyledAddButtonWrapper = styled.div`
  & {
    margin: 10px 0 0 0;
    width: 100%;
    display: flex;
  }
`
export const AddRuleButton = ((props: AddRuleBtnProps) => {
  return (
    <>
      <StyledAddButtonWrapper>
        <StyledAddButton onClick={props.onClick} type={"button"}>
          <RuleText size={Size.Medium}>+ Add Rule...</RuleText>
        </StyledAddButton>
      </StyledAddButtonWrapper>
    </>
  )
})
