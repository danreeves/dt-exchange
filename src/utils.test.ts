import { expect, test } from "@jest/globals"
import { safeJsonParse } from "./utils"
import type { User } from "./types"

let userNames = [
  `【パンツ】Pantsu#1234`,
  `🎃 ASH  П (◣_◢) П  🎃#1234`,
  `七曜曜#1234`,
  `Dunesca ʕ•͡ᴥ•ʔ#1234`,
  `Deadsiesthe•̪̀●́#1234`,
  `F̶̍̋I̶̔̀Q#1234`,
]

for (let user of userNames) {
  test(`safeUserParse can parse special user names: ${user}`, () => {
    const TestAccessToken = "This Should Be Returned"
    let userString = JSON.stringify({
      AccessToken: TestAccessToken,
      AccountName: user,
    })
    let decoded = safeJsonParse<User>(userString)
    expect(decoded).not.toBe(undefined)
    expect(decoded!.AccessToken).toBe(TestAccessToken)
    expect(decoded?.AccountName).not.toBe(undefined)
    expect(decoded?.AccountName).not.toBe("")
    expect(/[\w-#]+/.test(decoded!.AccessToken)).toBe(true)
  })
}

test(" safely removes bad usernames anywhere in json", () => {
  const TestAccessToken = "This Should Be Returned"
  for (let user of userNames) {
    let objs = [
      { AccountName: user },
      { AccessToken: TestAccessToken, AccountName: user },
      { AccountName: user, AccessToken: TestAccessToken },
      {
        RefreshToken: TestAccessToken,
        AccountName: user,
        AccessToken: TestAccessToken,
      },
    ]
    for (let obj of objs) {
      let decoded = safeJsonParse<User>(JSON.stringify(obj))
      expect(decoded).not.toBe(undefined)
      expect(decoded?.AccountName).not.toBe(undefined)
      expect(decoded?.AccountName).not.toBe("")
      expect(/[\w-#]+/.test(decoded!.AccessToken)).toBe(true)
    }
  }
})
