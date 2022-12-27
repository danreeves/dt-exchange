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
