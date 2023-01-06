import { useMemo, useRef } from "react"
import { isEqual } from "lodash"
import { createFetcher, getFatSharkUser } from "../utils"
import type { User } from "../types"

type Fetcher = <T>(path: string) => Promise<T>

export function useFetcher(): Fetcher {
  let userRef = useRef<User>()
  let user = getFatSharkUser()

  if (!isEqual(user, userRef.current)) {
    userRef.current = user
  }

  let fetcher = useMemo(() => {
    if (userRef.current) {
      return createFetcher(userRef.current)
    }
    return async () => {
      throw new Error("User Auth not found...")
    }
  }, [userRef.current])

  return fetcher
}
