import useSWR from "swr"
import { useFetcher } from "./FetchProvider"
import type { Summary } from "./types"

let key = "/web/:sub/summary"

export function useAccount(): Summary | undefined {
  let fetcher = useFetcher()
  let { data } = useSWR<Summary>(key, fetcher)
  return data
}
