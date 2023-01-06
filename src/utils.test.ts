import test from "ava"
import { safeUserParse } from "./utils"

let userNames = [
  `【パンツ】Pantsu#1234`,
  `🎃 ASH  П (◣_◢) П  🎃#1234`,
  `七曜曜#1234`,
  `Dunesca ʕ•͡ᴥ•ʔ#1234`,
  `Deadsiesthe•̪̀●́#1234`,
  `Deadsiesthe"*�#1234`
]

for (let user of userNames) {
  test(`safeUserParse can parse special user names: ${user}`, (t) => {
    const TestAccessToken = "This Should Be Returned"
    let userString = `{\"AccessToken\": \"${TestAccessToken}\", \"AccountName\":\"${user}\"}`
    let decoded = safeUserParse(userString)
    t.not(decoded, undefined)
    t.is(decoded!.AccessToken, TestAccessToken)
    t.not(decoded?.AccountName, undefined)
    t.not(decoded?.AccountName, '')
    if (decoded?.AccountName) {
      t.is(/[\w-#]+/.test(decoded?.AccessToken), true)
    }
  })
}

test(" safely removes bad usernames anywhere in json", (t) => {
  const TestAccessToken = "This Should Be Returned"
  for (let user of userNames) {
    let strings = [
      `{\"AccountName\": \"${user}\"}`,
      `{\"AccessToken\":\"${TestAccessToken}\", \"AccountName\":\"${user}\"}`,
      `{\"AccountName\":\"${user}\", \"AccessToken\":\"${TestAccessToken}\"}`,
      `{\"RefreshToken\":\"${TestAccessToken}\", \"AccountName\":\"${user}\", \"AccessToken\":\"${TestAccessToken}\"}`
    ]
    for (let str of strings) {
      let decoded = safeUserParse(str)
      t.not(decoded, undefined)
      t.not(decoded?.AccountName, undefined)
      t.not(decoded?.AccountName, '')
      if (decoded?.AccountName) {
        t.is(/[\w-#]+/.test(decoded?.AccessToken), true)
      }
    }
  }
})
