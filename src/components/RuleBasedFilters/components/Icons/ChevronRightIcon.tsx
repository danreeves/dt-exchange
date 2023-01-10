import styled from "styled-components"
import { Icon, IconProps } from "./Icon"

const StyledChevronRight = styled(Icon)`
  & {
    border-radius: 100px;
  }
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(-45deg);
    right: 6px;
    top: 4px;
  }
`
export const ChevronRightIcon = ((props: IconProps) => {
  return (
    <>
      <StyledChevronRight {...props} icon-role="chevron-right" />
    </>
  )
})
