import type { User } from "./types";
import { createFetcher } from "./utils";

let ext = chrome || browser
let dashboardUrl = "https://accounts.atoma.cloud/dashboard"
let authData: User | null = null;
const urlRegex = /accounts\.atoma\.cloud/g

ext.browserAction.onClicked.addListener(() => {
	window.open(dashboardUrl, "_blank")
});

const createTimer = (delayInMinutes: number) => ext.alarms.create("user-auth-refresh", { delayInMinutes })

ext.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message && message.type == "user-auth") {
		authData = message.user;
	}
	sendResponse();
});

ext.alarms.onAlarm.addListener((alarm) => {
	if(alarm.name == "user-auth-refresh") {
		if (authData) {
			const fetcher = createFetcher(authData, true);
			fetcher("https://bsp-auth-prod.atoma.cloud/queue/refresh").then((result) => {
				// Leave some time for error in the refresh
				const expiresInMinutes = Math.floor((result.ExpiresIn ?? 1800) / 60) - 5;
				createTimer(expiresInMinutes);
				authData = result;
				chrome.tabs.query({}, (tabs) => {
					tabs.forEach((tab) => {
						if (tab.url && tab.id && tab.url.match(urlRegex)) {
							chrome.tabs.sendMessage(tab.id, { type: "user-auth-update", user: result })
						}
					});
				});
			}).catch((error) => {
				// Default to 10 minute refresh
				createTimer(10);
			});
		}
	}
});

createTimer(1);