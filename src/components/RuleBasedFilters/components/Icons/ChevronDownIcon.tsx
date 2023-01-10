import styled from "styled-components"
import { Icon, IconProps } from "./Icon"

const StyledChevronDown = styled(Icon)`
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
    transform: rotate(45deg);
    left: 4px;
    top: 2px;
  }
`
export const ChevronDownIcon = ((props: IconProps) => {
  return (
    <>
      <StyledChevronDown {...props} icon-role="chevron-down" />
    </>
  )
})
