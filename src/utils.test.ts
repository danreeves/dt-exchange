import test from "ava"
import { Buffer } from "buffer/"
import { safeUserParse } from "./utils"

let userNames = [
  `【パンツ】Pantsu`,
  `🎃 ASH  П (◣_◢) П  🎃`,
  `七曜曜`,
  `Dunesca ʕ•͡ᴥ•ʔ`,
]

function toB64(str: string): string {
  return Buffer.from(str, "ascii").toString("base64")
}

function fromB64(str: string): string {
  return Buffer.from(str, "base64").toString()
}

function encode(obj: Record<string, unknown>): string {
  return fromB64(toB64(JSON.stringify(obj)))
}

for (let user of userNames) {
  test(`safeUserParse can decode special user names: ${user}`, (t) => {
    const TestAccessToken = "This Should Be Returned"
    let userString = encode({ AccessToken: TestAccessToken, AccountName: user })
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
  const user = userNames[0]
  let strings = [
    encode({ AccountName: user }),
    encode({ AccessToken: TestAccessToken, AccountName: user }),
    encode({ AccountName: user, AccessToken: TestAccessToken }),
    encode({ AccessToken: TestAccessToken, AccountName: user, RefreshToken: TestAccessToken }),
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
})
