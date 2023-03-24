import { rating } from "../../../icons"
import localisation from "../../../localisation"
import type { Items, Personal } from "../../../types"
import { Text } from "../../Text"
import { raritySymbol, traitRarityToRating } from "../consts"
import { getBlessingDescription } from "../utils"
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
          const displayName: string = localisation[trait.id].display_name
          const description: string = getBlessingDescription(trait, offer, items)
          return (
            <div className="blessing" key={trait.id + trait.rarity}>
              <div className="blessing-rarity">
                {raritySymbol[trait.rarity]}
              </div>
              <Text>{`${displayName}: ${description}`}</Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
