import type { ReactNode } from "react"
import { credits, rating } from "../icons"
import { Loading } from "./Loading"
import { Text } from "./Text"
import type {
  Items,
  Personal,
  StoreType,
  FilterRule,
  Character,
} from "../types"
import { useMasterList } from "../hooks/useMasterList"
import { useStore } from "../hooks/useStore"
import localisation from "../localisation.json"
import "./Store.css"
import { Countdown } from "./Countdown"
import { ItemState } from "./ItemState"
import type React from "react"

function Divider() {
  return <hr className="MuiDivider-root MuiDivider-fullWidth css-pj146d" />
}

function Title({ children, style }: { children: ReactNode, style?: React.CSSProperties}) {
  return <div className="item-title" style={style}>{children}</div>
}

// Linearly interpolate input between min and max. E.g. lerp(1, 2, 0.5) returns 1.5
function lerp(min: number, max: number, input: number): number {
  // Make sure input is a unit interval (0 <= n <= 1)
  let clampedInput = Math.min(Math.max(input, 0.0), 1.0)
  return min * (1 - clampedInput) + max * clampedInput
}

// Linearly interpolate to the nth element of an array.
// E.g. steppedLerp(['a','b'], 0.5) returns 'b' due to rounding.
function steppedLerp(range: number[], input: number): number {
  // Make sure input is a unit interval (0 <= n <= 1)
  let clampedInput = Math.min(Math.max(input, 0.0), 1.0)
  let interpolatedValue = lerp(1, range.length, clampedInput)

  // Make sure that the value will always lie inside valid indexes of the range.
  let clampedInterpolatedValue = Math.min(
    Math.max(interpolatedValue, 1),
    range.length
  )
  return range[Math.round(clampedInterpolatedValue) - 1] as number
}

// Calculate the in-game value for gadget traits. These are usually some sort of
// linear interpolation, but some are constants and some are scaled to integers instead.
// Min/Max and logic inferred from https://github.com/Cortex-Network/Darkmass-Data-Mining/blob/main/All%20.lua%20Scripts/scripts/settings/buff/gadget_buff_templates.lua
function calculateGadgetTraitStrength(trait_id: string, value: number): string {
  let traitStrength = ""
  switch (trait_id) {
    case "content/items/traits/gadget_inate_trait/trait_inate_gadget_toughness":
      traitStrength = `${(
        parseFloat(lerp(0.05, 0.2, value).toFixed(2)) * 100
      ).toFixed()}%`
      break
    case "content/items/traits/gadget_inate_trait/trait_inate_gadget_health":
      traitStrength = `${(
        parseFloat(lerp(0.05, 0.25, value).toFixed(2)) * 100
      ).toFixed()}%`
      break
    case "content/items/traits/gadget_inate_trait/trait_inate_gadget_health_segment":
      traitStrength = "1"
      break
    case "content/items/traits/gadget_inate_trait/trait_inate_gadget_stamina":
      traitStrength = steppedLerp([1, 2, 3], value).toString()
      break
  }
  return traitStrength
}

const ratingColor = {
  1: "rgb(152, 152, 152)", // grey
  2: "rgb(74, 177, 85)", // green
  3: "rgb(76, 132, 196)", // blue
  4: "rgb(143, 94, 196)", // purple
  5: "rgb(208, 136, 48)", // orange
  6: "rgb(198, 52, 53)", // red
} as const

const raritySymbol = {
  1: "Ⅰ",
  2: "Ⅱ",
  3: "Ⅲ",
  4: "Ⅳ",
  5: "Ⅴ",
} as const

const traitRarityToRating = {
  1: 25,
  2: 35,
  3: 45,
  4: 55,
  5: 65,
} as const

export const deemphasizeClass = {
  none: "offer-display-normal",
  opacity: "offer-display-miss",
  hide: "offer-display-hide",
} as const

export type DeemphasizeOption = keyof typeof deemphasizeClass
export const DEEMPHASIZE_OPTIONS = Object.keys(
  deemphasizeClass
) as DeemphasizeOption[]

const sortOptions = {
  modifiersRating: (a: Personal, b: Personal) => {
    let aRating =
      a.description.overrides.base_stats?.reduce((sum, stat) => {
        return Math.round(sum + stat.value * 100)
      }, 0) || a.description.overrides.itemLevel
    let bRating =
      b.description.overrides.base_stats?.reduce((sum, stat) => {
        return Math.round(sum + stat.value * 100)
      }, 0) || b.description.overrides.itemLevel
    return bRating - aRating
  },

  itemRating: (a: Personal, b: Personal) => {
    return b.description.overrides.itemLevel - a.description.overrides.itemLevel
  },

  rarity: (a: Personal, b: Personal) => {
    if (b.description.overrides.rarity === a.description.overrides.rarity) {
      return (
        b.description.overrides.itemLevel - a.description.overrides.itemLevel
      )
    }
    return b.description.overrides.rarity - a.description.overrides.rarity
  },

  alphabetical: (a: Personal, b: Personal) => {
    let aName = localisation[a.description.id].display_name
    let bName = localisation[b.description.id].display_name
    return aName > bName ? 1 : -1
  },

  credits: (a: Personal, b: Personal) => {
    return b.price.amount.amount - a.price.amount.amount
  },
} as const

export type SortOption = keyof typeof sortOptions
export const SORT_OPTIONS = Object.keys(sortOptions) as SortOption[]

let filterOptions = {
  none: () => () => true,

  ranged: (items: Items) => (item: Personal) => {
    return items[item.description.id]?.item_type === "WEAPON_RANGED"
  },

  melee: (items: Items) => (item: Personal) => {
    return items[item.description.id]?.item_type === "WEAPON_MELEE"
  },

  trinket: (items: Items) => (item: Personal) => {
    return items[item.description.id]?.item_type === "GADGET"
  },
}

export type FilterOption = keyof typeof filterOptions
export const FILTER_OPTIONS = Object.keys(filterOptions) as FilterOption[]

function filterFunc(
  char: Character | undefined,
  storeType: StoreType,
  offer: Personal,
  targets: FilterRule[],
  items: Items
) {
  if (!char) {
    return
  }

  let arr: string[]

  var found = targets.findIndex(function (target) {
    arr = typeof target.character === 'string' ? [target.character] : target.character
    if (target.character && !arr.includes(char.archetype)) {
      return false
    }

    if (target.store && !target.store.includes(storeType)) {
      return false
    }

    if (target.item) {
      arr = typeof target.item === 'string' ? [target.item] : target.item
      if (
        !arr.find((element) =>
          localisation[offer.description.id].display_name.match(
            new RegExp(element, "i")
          )
        )
      ) {
        return false
      }
    }

    if (target.type) {
      arr = typeof target.type === 'string' ? [target.type] : target.type
      if (
        !arr.find(function(element){
          switch (items[offer.description.id]?.item_type) {
            case "WEAPON_RANGED":
              return target.type.toLowerCase() == "ranged" ? true : false
            case "WEAPON_MELEE":
              return target.type.toLowerCase() == "melee" ? true : false
            case "GADGET":
              return target.type.toLowerCase() == "curio" ? true : false
            default:
              return false
          }
        })
      ) {
        return false
      }
    }

    if (target.minStats && target.minStats > offer.description.overrides.baseItemLevel) {
      return false
    }

    if (
      target.minRating &&
      target.minRating > offer.description.overrides.itemLevel
    ) {
      return false
    }

    if (target.blessing) {
      arr = typeof target.blessing === 'string' ? [target.blessing] : target.blessing
      if (
        !offer.description.overrides.traits.find(function (blessing) {
          if (
            !arr.find((element) =>
              localisation[blessing.id].display_name.match(
                new RegExp(element, "i")
              )
            )
          ) {
            return false
          }
          return true
        })
      ) {
        return false
      }
    }

    if (target.minBlessingRarity) {
      if (
        !offer.description.overrides.traits.find(function (blessing) {
          if (blessing.rarity >= target.minBlessingRarity) {
            return true
          }
          return false
        })
      ) {
        return false
      }
    }

    if (target.perk) {
      arr = typeof target.perk === 'string' ? [target.perk] : target.perk
      if (
        !offer.description.overrides.perks.find(function (perk) {
          if (
            !arr.find((element) =>
              localisation[perk.id].description.match(new RegExp(element, "i"))
            )
          ) {
            return false
          }
          return true
        })
      ) {
        return false
      }
    }

    if (target.minPerkRarity) {
      if (
        !offer.description.overrides.perks.find(function (perk) {
          if (perk.rarity >= target.minPerkRarity) {
            return true
          }
          return false
        })
      ) {
        return false
      }
    }

    return true
  })

  offer.description.overrides.filter_match = found
}

export function Store({
  character,
  storeType,
  sortOption,
  filterOption,
  enableRuleBasedFilterOption,
  filterRules,
  deemphasizeOption,
}: {
  character: Character | undefined
  storeType: StoreType
  sortOption: SortOption
  filterOption: FilterOption
  enableRuleBasedFilterOption: boolean
  filterRules: FilterRule[]
  deemphasizeOption: DeemphasizeOption
}) {
  let store = useStore(character, storeType)
  let items = useMasterList()
  var targets: FilterRule[]

  if (!store || !items) {
    return <Loading />
  }

  if (enableRuleBasedFilterOption) {
    try {
      targets = filterRules
      if (targets.length > 0) {
        store.personal.map(function (offer) {
          filterFunc(character, storeType, offer, targets, items)
        })
      }
    } catch (e) {
      console.log("Failed to parse filter rules", e)
    }
  } else {
    deemphasizeOption = "none"
  }

  return (
    <>
      <Text>
        Refresh in{" "}
        <Countdown
          key={store.currentRotationEnd}
          until={parseInt(store.currentRotationEnd, 10)}
        />
      </Text>
      {store.personal
        .filter(filterOptions[filterOption](items))
        .sort(sortOptions[sortOption])
        .map((offer) => {
          // console.log(offer)

          let alreadyOwnedClass =
            offer.state === "completed" ? "item-already-owned" : ""
          let filterMatchClass = enableRuleBasedFilterOption
            ? offer.description.overrides.filter_match >= 0
              ? `offer-match match-rule-${offer.description.overrides.filter_match}`
              : deemphasizeClass[deemphasizeOption]
            : ""
          let filterMatchStyle = enableRuleBasedFilterOption && offer.description.overrides.filter_match >= 0
            ? {color: targets[offer.description.overrides.filter_match].color}
            : undefined
          return (
            <div
              className={`MuiBox-root css-178yklu item-container ${filterMatchClass} ${alreadyOwnedClass}`}
              key={offer.offerId}
            >
              <Title style={filterMatchStyle}>{localisation[offer.description.id].display_name}</Title>

              {offer.state === "completed" ? (
                <ItemState>You already own this</ItemState>
              ) : offer.description.overrides.characterLevel >
                (character?.level ?? 0) ? (
                <ItemState>
                  Equippable at Level{" "}
                  {offer.description.overrides.characterLevel}
                </ItemState>
              ) : null}

              {/* <details> */}
              {/* 	<summary className="MuiFormHelperText-root MuiFormHelperText-sizeMedium css-13fvtaj"> */}
              {/* 		Description */}
              {/* 	</summary> */}
              {/* 	<Text>{items![offer.description.id]?.description}</Text> */}
              {/* 	<Text>{items![offer.description.id]?.dev_name}</Text> */}
              {/* 	<Text>{items![offer.description.id]?.dev_description}</Text> */}
              {/* </details> */}

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
                      <span style={{ color: "gold" }}>
                        {offer.price.amount.amount}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  {offer.description.overrides.base_stats ? (
                    <div className="row">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{}}>Modifiers</span>
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
                          {offer.description.overrides.baseItemLevel}
                        </div>
                      </div>
                      <div className="stats">
                        {offer.description.overrides.base_stats?.map((stat) => {
                          return (
                            <div className="stat" key={stat.name}>
                              <Text>{localisation[stat.name]}</Text>
                              <div className="stat-bar-row">
                                <span className="stat-p">{`${Math.round(
                                  stat.value * 100
                                )}%`}</span>
                                <div className="stat-bar-outer">
                                  <div
                                    className="stat-bar-inner"
                                    style={{
                                      width: `${stat.value * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}

                  {offer.description.overrides.perks.length > 0 ? (
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
                          {offer.description.overrides.perks.reduce(
                            (sum, perk) => {
                              sum += 10 + (perk.rarity - 1) * 5
                              return sum
                            },
                            0
                          )}
                        </div>
                      </div>
                      <div className="perks">
                        {offer.description.overrides.perks.map((perk) => {
                          let desc = localisation[perk.id].description
                          let descVal = items![
                            perk.id
                          ]?.description_values.find(
                            (v) => v.rarity === perk.rarity.toString()
                          )
                          let replace = `{${descVal?.string_key}:%s}`
                          let description = desc?.replace(
                            replace,
                            descVal?.string_value ?? ""
                          )
                          return (
                            <div className="perk" key={perk.id + perk.rarity}>
                              <div className="perk-rarity">
                                {raritySymbol[perk.rarity]}
                              </div>
                              <Text>{description}</Text>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}

                  {offer.description.overrides.traits.length > 0 ? (
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
                          {offer.description.overrides.traits.reduce(
                            (sum, trait) => {
                              if (trait.value) {
                                sum += Math.round(trait.value * 100)
                              } else {
                                sum += traitRarityToRating[trait?.rarity]
                              }
                              return sum
                            },
                            0
                          )}
                        </div>
                      </div>

                      <div className="perks">
                        {offer.description.overrides.traits.map((trait) => {
                          let { description: desc, display_name } =
                            localisation[trait.id]

                          let descVals = items![
                            trait.id
                          ]?.description_values.filter(
                            (v) => v.rarity === trait.rarity.toString()
                          )
                          let description = desc
                          if (descVals?.length) {
                            description = descVals.reduce((str, descVal) => {
                              let replace = `{${descVal?.string_key}:%s}`
                              // Use replaceAll not replace for things like Limbsplitter
                              str = str.replaceAll(
                                replace,
                                descVal?.string_value ?? ""
                              )
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
                              calculateGadgetTraitStrength(
                                trait.id,
                                trait.value
                              ) ?? ""
                            )
                          }

                          return (
                            <div className="perk" key={trait.id + trait.rarity}>
                              <div className="perk-rarity">
                                {raritySymbol[trait.rarity]}
                              </div>
                              <Text>{`${display_name}: ${description}`}</Text>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <Divider />
            </div>
          )
        })}
    </>
  )
}
