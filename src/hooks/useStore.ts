import useSWR from "swr"
import { useFetcher } from "./useFetcher"
import type { Character, Store } from "../types"
import { useEffect } from "react"

let key = (char?: Character) =>
	char
		? `/store/storefront/credits_store_${char.archetype}?accountId=:sub&personal=true&characterId=${char.id}`
		: null

export function useStore(char?: Character, poll = true): Store | undefined {
	let fetcher = useFetcher()
	let { data, mutate } = useSWR<Store>(key(char), fetcher)

	useEffect(() => {
		if (poll) {
			let intervalId = setInterval(() => {
				if (data?.currentRotationEnd && parseInt(data.currentRotationEnd, 10) <= Date.now()) {
					mutate()
				}
			}, 1000)
			return () => { clearInterval(intervalId) }
		}
		return () => { }
	})

	return data
}
