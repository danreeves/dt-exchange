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

export function getFatSharkUser(): User | undefined {
  // This key is set by FatShark, so it's not in our namespace.
  let userEncoded = localStorage.getItem('user')
  if (!userEncoded) {
    warn("No user present in localstorage")
    return undefined
  }

  // The user is a base64 encoded version of the response to /queue/refresh
  let userDecoded = Buffer.from(userEncoded, 'base64').toString()

  // FS currently have a bug where non-ASCII characters are utterly mangled by their
  // backend, and the "AccountName" field of the user JSON can contain very weird
  // characters. It may contain unescaped double quotes, control characters, or
  // even bonkers unicode characters like \uFFFD.
  try {
    // Most users will work first time, so lets try that first
    return JSON.parse(userDecoded)
  } catch (error) {
    try {
      // If the user contains a special character, lets just rip that out, since there's
      // no logic I could figure out to repair the AccountName from the resulting mess
      let accountNameRegex = /"AccountName":"(.*)"[,}]/g

      let matches = accountNameRegex.exec(userDecoded)
      let accountName: string
      // Make sure the response actually included an AccountName field
      if (matches && matches[1]) {
        accountName = matches[1]
      } else {
        // If it didn't, and it failed the first parse, give up here.
        warn("User could not be decoded, unable to repair accountName")
        return undefined
      }

      // Remove all non-alphanumerics, plus hyphen and hash. We don't show this field anyway.
      let safeAccountName = accountName.replace(/[^\w-#]/g, "?")
      // Replace the crazy characters with something safe
      userDecoded = userDecoded.replace(accountName, safeAccountName)

      return JSON.parse(userDecoded)
    } catch (error) {
      warn("User could not be decoded")
      return undefined
    }
  }
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
