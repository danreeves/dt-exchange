import type { FormFilterRule } from "../../../types"
import { RuleText } from "./RuleText"
import "./ToolbarHeader.css"
import { defaultEmphasisColor, STORE_LABELS } from "../../../types"
import { camelToSentence, capitalize } from "../../../utils"

type ToolbarHeaderProps = {
  input: FormFilterRule
}
export function ToolbarHeader(props: ToolbarHeaderProps) {
  function buildHeader(input: FormFilterRule): string {
    let newHeaderAr: string[] = []
    if (input.store) newHeaderAr.push(STORE_LABELS[input.store] || input.store)
    if (input.character) newHeaderAr.push(capitalize(input.character))
    if (input.type) newHeaderAr.push(capitalize(input.type))
    if (input.item) newHeaderAr.push(capitalize(input.item))
    // Blessings
    if (input.blessing) {
      const blessing = capitalize(input.blessing)
      if (parseFloat(input.minBlessingRarity)) {
        newHeaderAr.push(
          `${blessing} (Min Rarity: ${input.minBlessingRarity})`
        )
      } else {
        newHeaderAr.push(blessing)
      }
    } else if (parseFloat(input.minBlessingRarity)) {
      newHeaderAr.push(`Min Blessing Rarity: ${input.minBlessingRarity}`)
    }
    // Perks
    if (input.perk) {
      const perk = capitalize(input.perk)
      if (parseFloat(input.minPerkRarity)) {
        newHeaderAr.push(`${perk} (Min Rarity: ${input.minPerkRarity})`)
      } else {
        newHeaderAr.push(perk)
      }
    } else if (parseFloat(input.minPerkRarity)) {
      newHeaderAr.push(`Min Perk Rarity: ${input.minPerkRarity}`)
    }
    // Statistics
    if (input.stats?.length) {
      const statRules: string[] = []
      input.stats.forEach((statRule) => {
        if (statRule.name !== "" && statRule.min > 0) {
          statRules.push(`${capitalize(statRule.name)}: ${statRule.min}`)
        }
      })
      if (statRules.length) {
        newHeaderAr.push(statRules.join(", "))
      }
    }
    // Minimums
    if (parseFloat(input.minStats))
      newHeaderAr.push(`Min Stats: ${input.minStats}`)
    if (parseFloat(input.minRating))
      newHeaderAr.push(`Min Rating: ${input.minRating}`)
    return newHeaderAr.length ? newHeaderAr.join(" - ") : ""
  }

  const header: string = buildHeader(props.input)

  return (
    <>
      <div
        className={"filter-rules-toolbar-header"}
        title={header}
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div
          className={"filter-rules-toolbar-header-color"}
          style={{ background: props.input.color || defaultEmphasisColor }}
        />
        <RuleText size={"small"}>{header}</RuleText>
      </div>
    </>
  )
}
