import { App } from "./components/App"
import { createRoot } from "react-dom/client"
import { getFatSharkUser, log, setLocalStorage } from "./utils"

let ext = chrome || browser

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

        // Handle user updates from the background page
        ext.runtime.onMessage.addListener((message, _sender, sendResponse) => {
          if (message && message.type == "user-auth-update") {
            // Update the user info we have, and set it in local storage
            const getExpirationTimeInMs =
              ((message.user.ExpiresIn ?? 1800) - 300) * 1000 // Taken from account dashboard code
            const newUser = {
              ...message.user,
              RefreshAt: new Date(
                new Date().getTime() + getExpirationTimeInMs
              ).getTime(),
            }
            setLocalStorage("user", newUser)
          }
          sendResponse()
        })

        console.log("Send auth")
        // Send auth
        ext.runtime.sendMessage({ type: "user-auth", user: getFatSharkUser() })

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
