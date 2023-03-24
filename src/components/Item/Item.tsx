import type { Character, FilterRule, Items, Personal } from "../../types"
import { credits, rating } from "../../icons"
import { ItemState } from "../ItemState"
import localisation from "../../localisation"
import { Text } from "../Text"
import "./Item.css"
import { Title } from "./components/Title"
import { Divider } from "./components/Divider"
import { BaseStats } from "./components/BaseStats"
import { Perks } from "./components/Perks"
import { Blessings } from "./components/Blessings"

export const deemphasizeClass = {
  none: "offer-display-normal",
  opacity: "offer-display-miss",
  hide: "offer-display-hide",
} as const

export type DeemphasizeOption = keyof typeof deemphasizeClass

export const DEEMPHASIZE_OPTIONS = Object.keys(
  deemphasizeClass
) as DeemphasizeOption[]

const ratingColor = {
  1: "rgb(152, 152, 152)", // grey
  2: "rgb(74, 177, 85)", // green
  3: "rgb(76, 132, 196)", // blue
  4: "rgb(143, 94, 196)", // purple
  5: "rgb(208, 136, 48)", // orange
  6: "rgb(198, 52, 53)", // red
} as const

export function Item({
  offer,
  character,
  rbfEnabled,
  deemphasizeOption,
  items,
  targets,
}: {
  offer: Personal
  character: Character
  rbfEnabled: boolean
  deemphasizeOption: DeemphasizeOption
  items: Items
  targets: FilterRule[]
}) {
  let alreadyOwnedClass =
    offer.state === "completed" ? "item-already-owned" : ""
  let filterMatchClass = rbfEnabled
    ? offer.description.overrides.filter_match >= 0
      ? `offer-match match-rule-${offer.description.overrides.filter_match}`
      : deemphasizeClass[deemphasizeOption]
    : ""
  let filterMatchStyle =
    rbfEnabled && offer.description.overrides.filter_match >= 0
      ? {
        color: targets[offer.description.overrides.filter_match].color,
      }
      : undefined

  return (
    <div
      className={`MuiBox-root css-178yklu item-container ${filterMatchClass} ${alreadyOwnedClass}`}
      key={offer.offerId}
    >
      <Title style={filterMatchStyle}>
        {localisation[offer.description.id].display_name}
      </Title>

      {offer.state === "completed" ? (
        <ItemState>You already own this</ItemState>
      ) : offer.description.overrides.characterLevel >
        (character?.level ?? 0) ? (
        <ItemState>
          Equippable at Level {offer.description.overrides.characterLevel}
        </ItemState>
      ) : null}

      <div style={{ display: "flex" }}>
        <div className="info-items">
          <div
            className="info-item"
            style={{
              color: ratingColor[offer.description.overrides.rarity],
            }}
          >
            <img src={rating} style={{}} />
            <div>
              <Text>Rating</Text>
              {offer.description.overrides.itemLevel}
            </div>
          </div>
          <div className="info-item">
            <img src={credits} />
            <div>
              <Text>{offer.price.amount.type}</Text>
              <span style={{ color: "gold" }}>{offer.price.amount.amount}</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {offer.description.type === "gadget" ? (
            <CurioLayout offer={offer} items={items} />
          ) : (
            <WeaponLayout offer={offer} items={items} />
          )}
        </div>
      </div>

      <Divider />
    </div>
  )
}

function CurioLayout({ offer, items }: { offer: Personal; items: Items }) {
  return (
    <>
      {offer.description.overrides.traits.length > 0 ? (
        <Blessings offer={offer} items={items} />
      ) : null}

      {offer.description.overrides.perks.length > 0 ? (
        <Perks offer={offer} items={items} />
      ) : null}
    </>
  )
}

function WeaponLayout({ offer, items }: { offer: Personal; items: Items }) {
  return (
    <>
      {offer.description.overrides.base_stats ? (
        <BaseStats offer={offer} />
      ) : null}

      {offer.description.overrides.perks.length > 0 ? (
        <Perks offer={offer} items={items} />
      ) : null}

      {offer.description.overrides.traits.length > 0 ? (
        <Blessings offer={offer} items={items} />
      ) : null}
    </>
  )
}
