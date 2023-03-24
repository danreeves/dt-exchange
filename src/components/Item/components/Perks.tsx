import { raritySymbol } from "../consts"
import localisation from "../../../localisation.json"
import { Text } from "../../Text"
import { rating } from "../../../icons"
import type { Items, Personal } from "../../../types"
import "./Perks.css"

type Props = {
  offer: Personal
  items: Items
}
export function Perks({ offer, items }: Props) {
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
        <span style={{}}>Perks</span>
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
          {offer.description.overrides.perks.reduce((sum, perk) => {
            sum += 10 + (perk.rarity - 1) * 5
            return sum
          }, 0)}
        </div>
      </div>
      <div>
        {offer.description.overrides.perks.map((perk) => {
          let desc = localisation[perk.id]?.description || perk.id
          let descVal = items![perk.id]?.description_values.find(
            (v) => v.rarity === perk.rarity.toString()
          )
          let replace = `{${descVal?.string_key}:%s}`
          let description = desc?.replace(replace, descVal?.string_value ?? "")
          return (
            <div className="perk" key={perk.id + perk.rarity}>
              <div className="perk-rarity">{raritySymbol[perk.rarity]}</div>
              <Text>{description}</Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
