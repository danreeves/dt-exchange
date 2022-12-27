import { App } from "./App"
import { createRoot } from "react-dom/client"
import { log, waitFor } from "./utils"
import { getLatestUser } from "./useUser"

async function main() {
	log("Armoury Exchange booting")

	// Wait until we have an authenticated user
	// await getLatestUser()

	// Wait for accounts app to mount
	await waitFor(
		() =>
			document
				.evaluate(
					'//p[contains(., "Account Details")]',
					document,
					null,
					XPathResult.ANY_TYPE,
					null
				)
				.iterateNext(),
		250,
		40
	)

	let accountDetailsEl = document.querySelector(".MuiBox-root.css-1yafv85")

	if (accountDetailsEl) {
		// Clone the details panel
		let myContainer = accountDetailsEl.cloneNode(true)
			// Empty it
			; (myContainer.firstChild!.firstChild as HTMLElement).innerHTML = ""
		// Insert the clone before the details panel
		accountDetailsEl.parentElement?.insertBefore(myContainer, accountDetailsEl)
		// Mount react app there
		requestIdleCallback(() => {
			createRoot(myContainer.firstChild!.firstChild! as HTMLElement).render(
				<App />
			)
		})
	}
}

main()
