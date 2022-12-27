import { Buffer } from "buffer/"

export function tryParseJSON<T>(jsonString: string): T | undefined {
  let parsed: T | undefined

  try {
    parsed = JSON.parse(jsonString)
  } catch (_) {
    parsed = undefined
  }

  return parsed
}

export function getLocalStorage<T>(key: string): T | undefined {
  const encoded = localStorage.getItem(key)
  const decoded = encoded
    ? tryParseJSON<T>(Buffer.from(encoded, "base64").toString())
    : undefined

  return decoded
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function log(msg: string) {
  console.log(`++[ ${msg} ]++`)
}

export async function waitFor<T>(
  fn: () => T | undefined,
  timeout = 1000,
  times = 30
): Promise<T | undefined> {
  for (let i = 0; i <= times; i++) {
    let val = fn()
    if (val) {
      return val
    }
    await sleep(timeout)
  }
  throw new Error("never found")
}
