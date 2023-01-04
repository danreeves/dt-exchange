import useSWR from "swr"
import { useFetcher } from "./useFetcher"
import type { Character, Store, StoreType } from "../types"
import { useEffect } from "react"

let key = (char: Character | undefined, storeType: StoreType) =>
  char
    ? `/store/storefront/${storeType}_store_${char.archetype}?accountId=:sub&personal=true&characterId=${char.id}`
    : null

export function useStore(
  char: Character | undefined,
  storeType: StoreType,
  poll = true
): Store | undefined {
  let fetcher = useFetcher()
  let { data, mutate } = useSWR<Store>(key(char, storeType), fetcher)

  useEffect(() => {
    if (poll) {
      let intervalId = setInterval(() => {
        if (
          data?.currentRotationEnd &&
          parseInt(data.currentRotationEnd, 10) <= Date.now()
        ) {
          mutate()
        }
      }, 1000)
      return () => {
        clearInterval(intervalId)
      }
    }
    return () => {}
  })

  return data
}
