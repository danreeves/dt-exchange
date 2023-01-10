import styled from "styled-components"
import { Icon, IconProps } from "./Icon"

const StyledClose = styled(Icon)`
  & {
    border-radius: 40px;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 16px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 8px;
    left: 1px;
  }
  &::after {
    transform: rotate(-45deg);
  }
`
export const CloseIcon = ((props: IconProps) => {
  return (
    <>
      <StyledClose {...props} icon-role="close" />
    </>
  )
})
