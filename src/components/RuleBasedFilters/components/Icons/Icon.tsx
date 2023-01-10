import styled from "styled-components"
import { Size } from "../../../../types"

export type IconProps = {
  size: Size
}

export const Icon = styled.i.attrs((props: IconProps) => ({
  scale:
    props.size === Size.Large ? "1.2"
      : props.size === Size.Medium ? "1"
        : props.size === Size.Small ? "0.8" : "1",
}))`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(${props => props.scale});
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    margin: 0 auto;
  }
`
