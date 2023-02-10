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
