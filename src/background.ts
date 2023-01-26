import type { User } from "./types"
import { createFetcher } from "./utils"

let ext = chrome || browser
let dashboardUrl = "https://accounts.atoma.cloud/dashboard"
export let authData: User | null = null
const urlRegex = /accounts\.atoma\.cloud/g

ext.browserAction.onClicked.addListener(() => {
  ext.tabs.create({ url: dashboardUrl })
})

export const createTimer = (delayInMinutes: number) => {
  ext.alarms.create("user-auth-refresh", { delayInMinutes })
}

export const handleMessage = (
  message: any,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  if (message && message.type == "user-auth") {
    authData = message.user
  }
  sendResponse(authData)
}

export const handleTabs = (tabs: chrome.tabs.Tab[], authResult: User) => {
  tabs.forEach((tab) => {
    if (tab.url && tab.id && tab.url.match(urlRegex)) {
      chrome.tabs.sendMessage(tab.id, {
        type: "user-auth-update",
        user: authResult,
      })
    }
  })
}

export const handleAlarm = async (
  alarm: chrome.alarms.Alarm
): Promise<void> => {
  if (alarm.name == "user-auth-refresh") {
    if (authData) {
      try {
        const fetcher = createFetcher(authData, true)
        const result = await fetcher(
          "https://bsp-auth-prod.atoma.cloud/queue/refresh"
        )

        // Leave some time for error in the refresh
        const expiresInMinutes = Math.floor((result.ExpiresIn ?? 1800) / 60) - 5
        createTimer(expiresInMinutes)
        //createTimer(expiresInMinutes)
        authData = result
        chrome.tabs.query({}, (tabs) => handleTabs(tabs, result))
      } catch (_error) {
        // Default to 10 minute refresh
        console.log(_error)
        createTimer(10)
      }
    }
  }
}

ext.runtime.onMessage.addListener(handleMessage)

ext.alarms.onAlarm.addListener(handleAlarm)

createTimer(1)
