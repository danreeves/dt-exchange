import test from "ava"
import { safeUserParse } from "./utils"

let userNames = [
  `【パンツ】Pantsu#1234`,
  `🎃 ASH  П (◣_◢) П  🎃#1234`,
  `七曜曜#1234`,
  `Dunesca ʕ•͡ᴥ•ʔ#1234`,
  `Deadsiesthe•̪̀●́#1234`
]

function toB64(str: string): string {
  return Buffer.from(str, "ascii").toString("base64")
}

function fromB64(str: string): string {
  return Buffer.from(str, "base64").toString()
}

// @danreeves did a great job of figuring out how FS are mangling these strings,
// so we're replicating the process here. In particular, some elements like
// Deadsiesthe•̪̀●́#1234 get mangled to Deadsiesthe"*�#1234
function mangle(obj: Record<string, unknown>): string {
  return fromB64(toB64(JSON.stringify(obj)))
}

for (let user of userNames) {
  test(`safeUserParse can parse special user names: ${user}`, (t) => {
    const TestAccessToken = "This Should Be Returned"
    let userString = mangle({AccessToken: TestAccessToken, AccountName:user})
    let decoded = safeUserParse(userString)
    t.not(decoded, undefined)
    t.is(decoded!.AccessToken, TestAccessToken)
    t.not(decoded?.AccountName, undefined)
    t.not(decoded?.AccountName, '')
    t.is(/[\w-#]+/.test(decoded!.AccessToken), true)
  })
}

test(" safely removes bad usernames anywhere in json", (t) => {
  const TestAccessToken = "This Should Be Returned"
  for (let user of userNames) {
    let objs = [
      {AccountName: user},
      {AccessToken: TestAccessToken, AccountName: user},
      {AccountName: user, AccessToken: TestAccessToken},
      {RefreshToken: TestAccessToken, AccountName: user, AccessToken: TestAccessToken}
    ]
    for (let obj of objs) {
      let decoded = safeUserParse(mangle(obj))
      t.not(decoded, undefined)
      t.not(decoded?.AccountName, undefined)
      t.not(decoded?.AccountName, '')
      t.is(/[\w-#]+/.test(decoded!.AccessToken), true)
    }
  }
})
