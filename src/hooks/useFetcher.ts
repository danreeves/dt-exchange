import { useMemo } from "react"
import { createFetcher, getFatSharkUser } from "../utils"
import { useUser } from "../components/context/UserContextProvider"

type Fetcher = <T>(path: string) => Promise<T>

export function useFetcher(): Fetcher {
  // Fall back to local storage
  const user = useUser() || getFatSharkUser();

	let fetcher = useMemo(() => {
		if (user) {
			return createFetcher(user)
		}
		return async () => {
			throw new Error("User Auth not found...")
		}
	}, [user]);

  return fetcher
}
