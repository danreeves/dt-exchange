import { expect, test } from "vitest"
import strings from "./localisation.json"

Object.entries(strings).forEach(
	([name, strs]: [string, { display_name?: string; description?: string }]) => {
		test(`strings json format: ${name}`, () => {
			expect(typeof strs === "object").toBeTruthy()
			expect(
				typeof strs.display_name === "string" || typeof strs.display_name === "undefined",
			).toBeTruthy()
			expect(
				typeof strs.description === "string" || typeof strs.description === "undefined",
			).toBeTruthy()
		})
	},
)
