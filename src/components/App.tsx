import { ReactElement } from "react"
import { SWRConfig } from "swr"
import { Layout } from "./Layout"
import { UserContextProvider } from "./context/UserContextProvider"

export function App(): ReactElement {
	return (
		<SWRConfig>
			<UserContextProvider>
				<Layout />
			</UserContextProvider>
		</SWRConfig>
	)
}
