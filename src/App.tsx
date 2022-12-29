import type { ReactElement } from "react"
import { SWRConfig } from "../node_modules/swr/core/dist/index"
import { FetchProvider } from "./FetchProvider"
import { Layout } from "./Layout"
import { Loading } from "./Loading"
import { Title } from "./Title"
import { useUser } from "./useUser"

export function App(): ReactElement {
	let user = useUser()

	if (!user) {
		return (
			<>
				<Title>Armoury Exchange</Title>
				<Loading />
			</>
		)
	}

	return (
		<FetchProvider user={user}>
			<SWRConfig>
				<Layout />
			</SWRConfig>
		</FetchProvider>
	)
}
