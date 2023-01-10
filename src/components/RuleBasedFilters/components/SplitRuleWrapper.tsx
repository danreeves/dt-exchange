import styled from "styled-components"

const StyledWrapper = styled.div`
  & {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-top: 15px;
  }
  & > * {
    flex: 1 1 50%;
    margin-top: 0;
    &:first-child {
      padding-right: 4%;
    }
  }
`
export const SplitRuleWrapper =((props: any) => {
  return (
    <>
      <StyledWrapper>
        { props.children }
      </StyledWrapper>
    </>
  )
})
