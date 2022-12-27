import { createContext, ReactElement, useContext, useMemo } from "react"
import { createFetcher } from "./createFetcher"
import type { User } from "./types"

type Fetcher = <T>(path: string) => Promise<T>

let FetchContext = createContext<Fetcher | null>(null)

export function useFetcher(): Fetcher {
  let fetcher = useContext(FetchContext)

  if (!fetcher) {
    throw new Error("Used outside of fetch context")
  }

  return fetcher
}

export function FetchProvider({
  children,
  user,
}: {
  children: ReactElement
  user: User
}) {
  let fetcher = useMemo(() => createFetcher(user), [user])
  return (
    <FetchContext.Provider value={fetcher}>{children}</FetchContext.Provider>
  )
}
