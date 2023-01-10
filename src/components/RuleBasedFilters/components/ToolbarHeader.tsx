import styled from "styled-components"
import type { FormFilterRule } from "../../../types"
import { Size } from "../../../types"
import { RuleText } from "./RuleText"

type ToolbarHeaderProps = {
  input: FormFilterRule
}

const StyledToolbarHeader = styled.div`
  & {
    color: #bdbdbd;
    flex: 1 1 100%;
    padding: 0 20px 0 10px;
    display: flex;
    height: 100%;
    align-items: center;
    min-width: 0;
  }
  & > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
export const ToolbarHeader = ((props: ToolbarHeaderProps) => {
  const buildHeader = (input: FormFilterRule): string => {
    let newHeaderAr: string[] = []
    if (input.character) newHeaderAr.push(input.character)
    if (input.item) newHeaderAr.push(input.item)
    if (input.blessing) newHeaderAr.push(input.blessing)
    if (input.perk) newHeaderAr.push(input.perk)
    if (parseFloat(input.minStats)) newHeaderAr.push(`Min Stats: ${input.minStats}`)
    if (parseFloat(input.minRating)) newHeaderAr.push(`Min Rating: ${input.minRating}`)
    return newHeaderAr.length ? newHeaderAr.join(" - ") : ""
  }

  const header: string = buildHeader(props.input)

  return (
    <>
      <StyledToolbarHeader title={ header }>
        <RuleText size={Size.Small}>{ header }</RuleText>
      </StyledToolbarHeader>
    </>
  )
})
