import styled from "styled-components"

const StyledRuleToolbarWrapper = styled.div`
  & {
    position: relative;
    display: block;
    margin-top: 10px;
    border: 1px solid #5df8ff;
  }
`
const StyledRuleToolbar = styled.div`
  & {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    z-index: 1;
  }
`
const StyledRuleToolbarBg = styled.div`
  & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    filter: blur(1px);
    background: linear-gradient(
      90deg, 
      rgba(11, 11, 11, 0) 0%, 
      rgba(11, 11, 11, 0.25) 5%, 
      rgba(11, 11, 11, 0.75) 15%, 
      rgba(11, 11, 11, 0.95) 35%, 
      rgba(11, 11, 11, 0.95) 65%, 
      rgba(11, 11, 11, 0.75) 85%, 
      rgba(11, 11, 11, 0.25) 95%, 
      rgba(11, 11, 11, 0) 100%
    ), 
    repeating-linear-gradient(
      0deg, 
      transparent, 
      transparent 4px, 
      rgb(116, 243, 255) 4px, 
      rgb(48, 158, 164) 5px
    );
  }
`
export const RuleToolbar = ((props: any) => {
    return (
      <>
        <StyledRuleToolbarWrapper>
          <StyledRuleToolbar>{ props.children }</StyledRuleToolbar>
          <StyledRuleToolbarBg />
        </StyledRuleToolbarWrapper>
      </>
    )
  }
)
