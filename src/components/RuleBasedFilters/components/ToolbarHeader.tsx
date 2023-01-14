import type { FormFilterRule } from "../../../types"
import { RuleText } from "./RuleText"
import "./ToolbarHeader.css"
import { defaultEmphasisColor } from "../../../types"

type ToolbarHeaderProps = {
  input: FormFilterRule
}
export function ToolbarHeader(props: ToolbarHeaderProps) {
  function buildHeader(input: FormFilterRule): string {
    let newHeaderAr: string[] = []
    if (input.store) newHeaderAr.push(input.store)
    if (input.character) newHeaderAr.push(input.character)
    if (input.type) newHeaderAr.push(input.type)
    if (input.item) newHeaderAr.push(input.item)
    // Blessings
    if (input.blessing) {
      if (parseFloat(input.minBlessingRarity)) {
        newHeaderAr.push(`${input.blessing} (Min Rarity: ${input.minBlessingRarity})`)
      } else {
        newHeaderAr.push(input.blessing)
      }
    } else if (parseFloat(input.minBlessingRarity)) {
      newHeaderAr.push(`Min Blessing Rarity: ${input.minBlessingRarity}`)
    }
    // Perks
    if (input.perk) {
      if (parseFloat(input.minPerkRarity)) {
        newHeaderAr.push(`${input.perk} (Min Rarity: ${input.minPerkRarity})`)
      } else {
        newHeaderAr.push(input.perk)
      }
    } else if (parseFloat(input.minPerkRarity)) {
      newHeaderAr.push(`Min Perk Rarity: ${input.minPerkRarity}`)
    }
    if (parseFloat(input.minStats)) newHeaderAr.push(`Min Stats: ${input.minStats}`)
    if (parseFloat(input.minRating)) newHeaderAr.push(`Min Rating: ${input.minRating}`)
    return newHeaderAr.length ? newHeaderAr.join(" - ") : ""
  }

  const header: string = buildHeader(props.input)

  return (
    <>
      <div
        className={"filter-rules-toolbar-header"}
        title={ header }
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className={"filter-rules-toolbar-header-color"} style={{ background: props.input.color || defaultEmphasisColor }} />
        <RuleText size={"small"}>{ header }</RuleText>
      </div>
    </>
  )
}
