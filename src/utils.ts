import { Buffer } from "buffer/"
import type { User } from "./types"

export function createFetcher(user: User) {
  return async function fetchApi(path: string) {
    let url = path.startsWith("https")
      ? path
      : `https://bsp-td-prod.atoma.cloud${path}`

    if (url.includes(":sub")) {
      url = url.replace(":sub", user.Sub)
    }

    let res = await fetch(url, {
      headers: {
        authorization: `Bearer ${user.AccessToken}`,
      },
    })

    if (res.ok) {
      try {
        let json = await res.clone().json()
        return json
      } catch {
        return await res.text()
      }
    }
  }
}

export function safeParseJSON<T>(jsonString: string): T | undefined {
  let input = jsonString
  let parsed: T | undefined

  let accountNameRe =
    /"AccountName":".*",|,"AccountName":".*"|"AccountName":".*"/

  try {
    parsed = JSON.parse(input)
  } catch {
    try {
      parsed = JSON.parse(input.replace(accountNameRe, ""))
    } catch {
      warn("User could not be decoded")
      parsed = undefined
    }
  }

  return parsed
}

export function getLocalStorage<T>(key: string): T | undefined {
  const encoded = localStorage.getItem(key)
  const decoded = encoded
    ? safeParseJSON<T>(Buffer.from(encoded, "base64").toString())
    : undefined

  return decoded
}

export function log(msg: string) {
  console.log(`++[ ${msg} ]++`)
}

export function warn(msg: string) {
  console.warn(`++! ${msg} !++`)
}

export function camelToSentence(str: string): string {
  let parts = str.split(/(?=[A-Z])/)
  return parts
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ")
}
