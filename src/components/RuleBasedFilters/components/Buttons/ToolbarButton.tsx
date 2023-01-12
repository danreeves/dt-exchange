import styled from "styled-components"

export type SharedToolbarBtnProps = {
  onClick: () => void
  children?: any
}

const StyledToolbarButton = styled.button`
  & {
    height: 40px;
    color: #fff;
    background: transparent;
    border: none;
    flex: 0 0 38px;
    cursor: pointer;
    transition: background 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }
  &:hover {
    background: rgba(93, 248, 255, 0.1);
  }
`
export const ToolbarButton = ((props: SharedToolbarBtnProps) => {
  return (
    <>
      <StyledToolbarButton onClick={props.onClick} type={"button"}>
        { props.children }
      </StyledToolbarButton>
    </>
  )
})
