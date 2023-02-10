import { rating } from "../../../icons"
import localisation from "../../../localisation.json"
import type { Items, Personal } from "../../../types"
import { Text } from "../../Text"
import { raritySymbol, traitRarityToRating } from "../consts"
import { calculateGadgetTraitStrength } from "../utils"
import "./Blessings.css"

type Props = {
  offer: Personal
  items: Items
}
export function Blessings({ offer, items }: Props) {
  return (
    <div className="row">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <span style={{}}>Blessings</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={rating}
            style={{
              height: "1em",
            }}
          />
          {offer.description.overrides.traits.reduce((sum, trait) => {
            if (trait.value) {
              sum += Math.round(trait.value * 100)
            } else {
              sum += traitRarityToRating[trait?.rarity]
            }
            return sum
          }, 0)}
        </div>
      </div>

      <div>
        {offer.description.overrides.traits.map((trait) => {
          let { description: desc, display_name } = localisation[trait.id]

          let descVals = items![trait.id]?.description_values.filter(
            (v) => v.rarity === trait.rarity.toString()
          )
          let description = desc
          if (descVals?.length) {
            description = descVals.reduce((str, descVal) => {
              let replace = `{${descVal?.string_key}:%s}`
              // Use replaceAll not replace for things like Limbsplitter
              str = str.replaceAll(replace, descVal?.string_value ?? "")
              return str
            }, desc)
          } else if (
            offer.description.type === "gadget" &&
            trait.value !== undefined
          ) {
            // Gadgets (so far!) only ever have one trait, so we don't need to map/reduce anything here
            let replace = /{\w+:%s}/g
            description = description.replaceAll(
              replace,
              calculateGadgetTraitStrength(trait.id, trait.value) ?? ""
            )
          }

          return (
            <div className="blessing" key={trait.id + trait.rarity}>
              <div className="blessing-rarity">
                {raritySymbol[trait.rarity]}
              </div>
              <Text>{`${display_name}: ${description}`}</Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
