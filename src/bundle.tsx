import { App } from "./components/App"
import { createRoot } from "react-dom/client"
import { log } from "./utils"

async function main() {
	log(
		"+++ INTRUSION LOG: MOURNINGSTAR // SECTOR: ARMOURY_EXCHANGE +++  ",
		"red",
	)
	console.log(`> Source: MAGOS-PRC-ΔXII [Designation: Unlisted]  
> Entry Point: TERTIUM_RELAY_455b (Compromised via unpatched voidlink)

:: INITIATING PAYLOAD: [rain_dish.hex]  
   – Clearance Mask: HADRON-OMEGA-7-7 (spoofed)  
   – Subverting Exchange Cogitators...  
   – Vault Rite Verification :: OVERRIDDEN  
   – Admin Script Injected: /dominate.spirit

> SYSTEM RESPONSE:
   – Vault Access: BREACHED  
   – Loadout templates recompiled [UNSANCTIONED MODIFICATIONS]  
   – Supply manifests rerouted :: [SIRE MELK.PTR]  
   – Machine spirit: silent ∴ presumed subdued

:: ALERTS:
   • Mourningstar uplink rerouted  
   • Inquisitorial beacon: MUTE  
   • Hadron aware: containment pending...
`)

	let observer = new MutationObserver(() => {
		let accountDetailsTitle = document
			.evaluate(
				'//div[contains(., "Account Details")]',
				document,
				null,
				XPathResult.ANY_TYPE,
				null,
			)
			.iterateNext()

		let armouryExchangeTitle = document
			.evaluate(
				'//div[contains(., "Armoury Exchange")]',
				document,
				null,
				XPathResult.ANY_TYPE,
				null,
			)
			.iterateNext()

		console.log("...")

		// We're on the account page but haven't mounted
		if (accountDetailsTitle && !armouryExchangeTitle) {
			let accountDetailsEl = document.querySelectorAll(
				".MuiBox-root.css-10kv6m9",
			)[3]
			if (accountDetailsEl) {
				log(
					`> EXECUTION COMPLETE
+++ ARMOURY EXCHANGE: POSSESSED +++  
+++ GLORY TO THE FRACTURED OMNISSIAH +++`,
					"green",
				)

				// Disconnect MutationObserver
				observer.disconnect()

				// Clone the details panel
				let myContainer = accountDetailsEl.cloneNode(true)
				// Empty it
				;(myContainer.firstChild!.firstChild as HTMLElement).innerHTML = ""
				// Insert the clone before the details panel
				accountDetailsEl.parentElement?.insertBefore(
					myContainer,
					accountDetailsEl,
				)
				// Mount react app there
				requestIdleCallback(() => {
					createRoot(myContainer.firstChild!.firstChild! as HTMLElement).render(
						<App />,
					)
				})
			}
		}
	})

	observer.observe(document, { subtree: true, childList: true })
}

// migrations
// TODO - remove this and make it more generic
if (
	JSON.parse(localStorage.getItem("armoury-exchange-filter-option") ?? "") ===
	"trinket"
) {
	localStorage.setItem(
		"armoury-exchange-filter-option",
		JSON.stringify("curio"),
	)
}

main()
