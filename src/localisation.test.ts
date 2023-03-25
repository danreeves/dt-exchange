import { expect, test } from "@jest/globals"
import strings from "./localisation.json"

Object.entries(strings).forEach(
  ([name, strs]: [string, { display_name: string; description?: string }]) => {
    test(`strings json format: ${name}`, () => {
      expect(strs).toEqual({
        display_name: expect.toBeOneOf([expect.any(String), undefined]),
        description: expect.toBeOneOf([expect.any(String), undefined]),
      })
    })
  }
)
