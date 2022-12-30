import type { ReactElement } from "react"
import { SWRConfig } from "swr"
import { Layout } from "./Layout"

export function App(): ReactElement {
	return (
		<SWRConfig>
			<Layout />
		</SWRConfig>
	)
}
