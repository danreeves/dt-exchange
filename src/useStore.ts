import useSWR from "swr"
import { useFetcher } from "./FetchProvider"
import type { Character, Store } from "./types"

let key = (char?: Character) =>
  char
    ? `/store/storefront/credits_store_${char.archetype}?accountId=:sub&personal=true&characterId=${char.id}`
    : null

export function useStore(char?: Character): Store | undefined {
  let fetcher = useFetcher()
  let { data } = useSWR<Store>(key(char), fetcher)
  return data
}
