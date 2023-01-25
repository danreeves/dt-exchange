import { App } from "./components/App"
import { createRoot } from "react-dom/client"
import { log } from "./utils"

async function main() {
  log("Armoury Exchange booting")

  let observer = new MutationObserver(() => {
    let accountDetailsTitle = document
      .evaluate(
        '//p[contains(., "Account Details")]',
        document,
        null,
        XPathResult.ANY_TYPE,
        null
      )
      .iterateNext()

    let armouryExchangeTitle = document
      .evaluate(
        '//p[contains(., "Armoury Exchange")]',
        document,
        null,
        XPathResult.ANY_TYPE,
        null
      )
      .iterateNext()

    // We're on the account page but haven't mounted
    if (accountDetailsTitle && !armouryExchangeTitle) {
      let accountDetailsEl = document.querySelector(".MuiBox-root.css-1yafv85")
      if (accountDetailsEl) {
        log("Vendor Mounting")

        // Disconnect MutationObserver
        observer.disconnect()

        // Clone the details panel
        let myContainer = accountDetailsEl.cloneNode(true)
        // Empty it
        ;(myContainer.firstChild!.firstChild as HTMLElement).innerHTML = ""
        // Insert the clone before the details panel
        accountDetailsEl.parentElement?.insertBefore(
          myContainer,
          accountDetailsEl
        )
        // Mount react app there
        requestIdleCallback(() => {
          createRoot(myContainer.firstChild!.firstChild! as HTMLElement).render(
            <App />
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
  JSON.parse(localStorage.getItem("armoury-exchange-filter-option")) ===
  "trinket"
) {
  localStorage.setItem(
    "armoury-exchange-filter-option",
    JSON.stringify("curio")
  )
}

main()
