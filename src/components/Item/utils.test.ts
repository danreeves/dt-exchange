import { expect, test } from "vitest"
import { getProjectedBaseStats } from "./utils"
import type { BaseStat } from "../../types"

function baseStats(values: number[]): BaseStat[] {
	return values.map((value, index) => {
		return {
			name: `stat_${index}`,
			value: value / 100,
		}
	})
}

test("projects base stats with uneven final distribution across all stats", () => {
	expect(getProjectedBaseStats(baseStats([61, 58, 55, 61, 58]))).toEqual([79, 76, 72, 78, 75])
})

test("projects base stats through multiple cap steps", () => {
	expect(getProjectedBaseStats(baseStats([74, 73, 74, 17, 30]))).toEqual([80, 80, 80, 64, 76])
})

test("does not lower stats when target total is already reached", () => {
	expect(getProjectedBaseStats(baseStats([80, 80, 80, 80, 60]))).toEqual([80, 80, 80, 80, 60])
})
