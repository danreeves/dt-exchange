import type { ClassType, FilterRule, FormFilterRule, StoreType } from "../../types"

export function formDataToRules(rulesFormData: FormFilterRule[]): FilterRule[] {
  return rulesFormData.map(function (formRule: FormFilterRule): FilterRule {
    return {
      minStats: parseFloat(formRule.minStats),
      minRating: parseFloat(formRule.minRating),
      minBlessingRarity: parseFloat(formRule.minBlessingRarity),
      minPerkRarity: parseFloat(formRule.minPerkRarity),
      character: ruleStringToValue(formRule.character) as ClassType[],
      item: ruleStringToValue(formRule.item),
      blessing: ruleStringToValue(formRule.blessing),
      perk: ruleStringToValue(formRule.perk),
      store: ruleStringToValue(formRule.store) as StoreType[]
    }
  })
}

export function rulesToFormData(rulesData: FilterRule[]): FormFilterRule[] {
  return rulesData.map(function (rule: FilterRule): FormFilterRule {
    return {
      isOpen: false,
      minStats: rule.minStats?.toString() || "0",
      minRating: rule.minRating?.toString() || "0",
      minBlessingRarity: rule.minBlessingRarity?.toString() || "0",
      minPerkRarity: rule.minPerkRarity?.toString() || "0",
      character: ruleValueToString(rule.character),
      item: ruleValueToString(rule.item),
      blessing: ruleValueToString(rule.blessing),
      perk: ruleValueToString(rule.perk),
      store: ruleValueToString(rule.store)
    }
  })
}

export function rulesToJson(rulesData: FilterRule[]): string {
  return JSON.stringify(rulesData, null, 4)
}

function ruleStringToValue(ruleString: string): string[] | undefined {
  if (!ruleString.length) return
  const splitAtCommas: string[] = ruleString.split(',')
  return splitAtCommas.map(function (item: string) { return item.trim() })
}

function ruleValueToString(value: any): string {
  if (typeof value === "string") {
    return value
  }
  if (Array.isArray(value) && value.length) {
    return value.join(", ")
  }
  return ""
}
