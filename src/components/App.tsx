import type { ReactElement } from "react"
import { SWRConfig } from "swr"
import { Layout } from "./Layout"
import { useAuth } from "../hooks/useAuth"

export function App(): ReactElement {
	useAuth();
	return (
		<SWRConfig>
			<Layout />
		</SWRConfig>
	)
}
