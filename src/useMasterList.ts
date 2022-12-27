import useSWR from "swr"
import { useFetcher } from "./FetchProvider"
import type { Items, MasterData } from "./types"

export function useMasterList(): Items | undefined {
  let fetcher = useFetcher()
  let { data } = useSWR<MasterData>("/master-data/meta/items", fetcher)
  let masterListKey = data ? data.playerItems.href : null
  let { data: items } = useSWR<Items>(masterListKey, fetcher)
  return items
}
