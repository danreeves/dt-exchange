import type { Items, Perk, Personal, Trait } from "../../types"
import localisation from "../../localisation"

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
export function calculateGadgetTraitStrength(
  trait_id: string,
  value: number
): string {
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

export function getBlessingDescription(trait: Trait, offer: Personal, items: Items): string {
  let descVals = items![trait.id]?.description_values.filter(
    (v) => v.rarity === trait.rarity.toString()
  )
  let description = localisation[trait.id].description
  const desc = description
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
  return description
}

export function getPerkDescription(perk: Perk, items: Items): string {
  let desc = localisation[perk.id].description
  let descVal = items![perk.id]?.description_values.find(
    (v) => v.rarity === perk.rarity.toString()
  )
  let replace = `{${descVal?.string_key}:%s}`
  return desc?.replace(replace, descVal?.string_value ?? "")
}
