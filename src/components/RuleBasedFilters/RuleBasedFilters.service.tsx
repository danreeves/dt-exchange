import type {
	ClassType,
	FilterRule,
	FormFilterRule,
	ItemCategory,
	StoreType,
} from "../../types"
import {
	CLASS_TYPES,
	defaultEmphasisColor,
	ITEM_CATEGORIES,
	STORE_TYPES,
} from "../../types"

export function formDataToRules(rulesFormData: FormFilterRule[]): FilterRule[] {
	return rulesFormData.map(function (formRule: FormFilterRule): FilterRule {
		const statRules = formRule.stats?.filter(
			(statRule) => !!statRule.name && statRule.min > 0,
		)
		return {
			minStats: parseFloat(formRule.minStats) || undefined,
			minRating: parseFloat(formRule.minRating) || undefined,
			minBlessingRarity: parseFloat(formRule.minBlessingRarity) || undefined,
			minPerkRarity: parseFloat(formRule.minPerkRarity) || undefined,
			character: ruleStringToArrayValue(
				formRule.character,
				CLASS_TYPES,
			) as ClassType[],
			item: ruleStringToArrayValue(formRule.item),
			type: ruleStringToStringValue(
				formRule.type,
				ITEM_CATEGORIES,
			) as ItemCategory,
			blessing: ruleStringToArrayValue(formRule.blessing),
			perk: ruleStringToArrayValue(formRule.perk),
			store: ruleStringToArrayValue(formRule.store, STORE_TYPES) as StoreType[],
			color:
				formRule.color && formRule.color !== defaultEmphasisColor.toLowerCase()
					? formRule.color
					: undefined,
			stats: statRules?.length ? statRules : undefined,
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
			character: ruleValueToString(rule.character, CLASS_TYPES, true),
			item: ruleValueToString(rule.item),
			type: ruleValueToString(rule.type, ITEM_CATEGORIES),
			blessing: ruleValueToString(rule.blessing),
			perk: ruleValueToString(rule.perk),
			store: ruleValueToString(rule.store, STORE_TYPES, true),
			color: rule.color || "",
			stats: rule.stats ? [...rule.stats] : [],
		}
	})
}

export function rulesToJson(rulesData: FilterRule[]): string {
	return JSON.stringify(rulesData, null, 4)
}

function ruleStringToStringValue(
	ruleString: string,
	options?: any,
): string | undefined {
	const trimmedRule = ruleString.trim()
	if (
		!trimmedRule.length ||
		(options?.length && options.indexOf(trimmedRule) === -1)
	) {
		return
	}
	return trimmedRule
}

function ruleStringToArrayValue(
	ruleString: string,
	options?: any,
): string[] | undefined {
	if (!ruleString.length) return
	const splitAtCommas: string[] = ruleString.split(",")
	return splitAtCommas.flatMap(function (item: string) {
		const trimmedItem: string = item.trim()
		if (options?.length && options.indexOf(trimmedItem) === -1) {
			return []
		}
		return trimmedItem
	})
}

function ruleValueToString(
	value: any,
	options?: any,
	mapAllToEmpty?: boolean,
): string {
	if (typeof value === "string") {
		if (options?.length && options.indexOf(value) === -1) return ""
		return value
	}
	if (Array.isArray(value) && value.length) {
		if (options?.length) {
			value = value.filter((item: string) => options.indexOf(item) !== -1)
			if (mapAllToEmpty && value.length === options.length) return ""
		}
		return value.join(", ")
	}
	return ""
}
