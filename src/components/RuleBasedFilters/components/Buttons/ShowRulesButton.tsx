import styled from "styled-components"
import { RuleText } from "../RuleText"
import { Size } from "../../../../types"
import { RuleButton } from "./RuleButton"
import { ChevronDownIcon } from "../Icons/ChevronDownIcon"
import { ChevronRightIcon } from "../Icons/ChevronRightIcon"

export type ShowRulesBtnProps = {
  onClick: () => void
  isOpen: boolean
  children?: any
}

const StyledShowRulesButton = styled(RuleButton)`
  & {
    padding: 0;
    margin: 0;
    height: auto;
    color: #BDBDBDFF;
  }
  &:hover {
    color: rgb(53, 139, 147);
  }
`
const StyledFlexWrapper = styled.div`
  & {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`
const StyledChevronDown = styled(ChevronDownIcon)`
  width: 24px;
`
const StyledChevronRight = styled(ChevronRightIcon)`
  width: 24px;
`
const StyledText = styled(RuleText)`
  flex: 1 1 100%;
`

export const ShowRulesButton = ((props: ShowRulesBtnProps) => {
  return (
    <>
      <StyledShowRulesButton type={"button"} onClick={props.onClick}>
        <StyledFlexWrapper>
          {props.isOpen ? (
            <StyledChevronDown size={Size.Small} />
          ) : (
            <StyledChevronRight size={Size.Small} />
          )}
          <StyledText size={Size.Small}>{ props.children }</StyledText>
        </StyledFlexWrapper>
      </StyledShowRulesButton>
    </>
  )
})
