import styled from "styled-components"

export const RuleButton = styled.button`
  & {
    height: 36px;
    color: #fff;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: 
      background 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, 
      color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    padding: 0 10px;
    margin: 0 10px;
  }
  &:disabled {
    color: rgb(128, 128, 128);
    pointer-events: none;
    cursor: default;
  }
`
