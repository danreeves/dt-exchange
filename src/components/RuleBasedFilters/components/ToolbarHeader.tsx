import type { FormFilterRule } from "../../../types"
import { RuleText } from "./RuleText"
import "./ToolbarHeader.css"

type ToolbarHeaderProps = {
  input: FormFilterRule
}
export function ToolbarHeader(props: ToolbarHeaderProps) {
  function buildHeader(input: FormFilterRule): string {
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
      <div className={"filter-rules-toolbar-header"} title={ header }>
        <RuleText size={"small"}>{ header }</RuleText>
      </div>
    </>
  )
}
