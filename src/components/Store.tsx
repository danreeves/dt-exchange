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
import localisation from "../localisation"
import "./Store.css"
import { Countdown } from "./Countdown"
import { Item } from "./Item"
import type { DeemphasizeOption } from "./Item/Item"
import { getBlessingDescription, getPerkDescription } from "./Item/utils"

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

  curio: (items: Items) => (item: Personal) => {
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
    arr =
      typeof target.character === "string"
        ? [target.character]
        : target.character
    if (target.character && !arr.includes(char.archetype)) {
      return false
    }

    if (target.store && !target.store.includes(storeType)) {
      return false
    }

    if (target.item) {
      arr = typeof target.item === "string" ? [target.item] : target.item
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
      arr = typeof target.type === "string" ? [target.type] : target.type
      if (
        !arr.find(function (element) {
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

    if (
      target.minStats &&
      target.minStats > offer.description.overrides.baseItemLevel
    ) {
      return false
    }

    if (
      target.minRating &&
      target.minRating > offer.description.overrides.itemLevel
    ) {
      return false
    }

    if (target.blessing) {
      arr =
        typeof target.blessing === "string"
          ? [target.blessing]
          : target.blessing
      if (
        !offer.description.overrides.traits.find(function (blessing) {
          if (
            !arr.find((element) => {
              const nameMatch = localisation[blessing.id].display_name
                .toLowerCase()
                .includes(element.toLowerCase())
              const descMatch = getBlessingDescription(blessing, offer, items)
                .toLowerCase()
                .includes(element.toLowerCase())
              return nameMatch || descMatch
            })
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
      arr = typeof target.perk === "string" ? [target.perk] : target.perk
      if (
        !offer.description.overrides.perks.find(function (perk) {
          if (
            !arr.find((element) =>
              getPerkDescription(perk, items)
                .toLowerCase()
                .includes(element.toLowerCase())
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

    if (target.stats) {
      const statsPass: boolean = target.stats.every((statRule) => {
        const offerStatFound = offer.description.overrides.base_stats?.find(
          (baseStat) =>
            localisation[baseStat.name].display_name.toLowerCase() ===
              statRule.name.toLowerCase() && baseStat.value * 100 >= statRule.min
        )
        return !!offerStatFound
      })
      if (!statsPass) return false
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
  character: Character
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

  if (!store) {
    return <Loading />
  }

  if (!items) {
    return <Loading />
  }

  if (enableRuleBasedFilterOption) {
    try {
      targets = filterRules
      if (targets.length > 0) {
        store.personal.map(function (offer) {
          filterFunc(character, storeType, offer, targets, items!)
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
          return (
            <Item
              key={offer.offerId}
              offer={offer}
              character={character}
              rbfEnabled={enableRuleBasedFilterOption}
              deemphasizeOption={deemphasizeOption}
              items={items!}
              targets={targets}
            />
          )
        })}
    </>
  )
}
