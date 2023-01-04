import test from "ava"
import { safeParseJSON } from "./utils"
import { Buffer } from "buffer/"

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
  test(`safeParseJSON can decode special user names: ${user}`, (t) => {
    const TestValue = "This Should Be Returned"
    let userString = encode({ TestValue, AccountName: user })
    let decoded = safeParseJSON<{ AccountName: string; TestValue: string }>(
      userString
    )
    t.not(decoded, undefined)
    t.is(decoded!.TestValue, TestValue)
  })
}

test(" safely removes bad usernames anywhere in json", (t) => {
  const TestValue = "This Should Be Returned"
  const user = userNames[0]
  let strings = [
    encode({ AccountName: user }),
    encode({ TestValue, AccountName: user }),
    encode({ AccountName: user, TestValue }),
    encode({ TestValue, AccountName: user, TestValue2: TestValue }),
  ]
  for (let str of strings) {
    let decoded = safeParseJSON<{ AccountName: string; TestValue: string }>(str)
    t.not(decoded, undefined)
  }
})
