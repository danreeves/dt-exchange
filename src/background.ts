import type { User } from "./types";
import { createFetcher } from "./utils";

let ext = chrome || browser
let dashboardUrl = "https://accounts.atoma.cloud/dashboard"
let authData: User | null = null;

ext.browserAction.onClicked.addListener(() => {
	window.open(dashboardUrl, "_blank")
});

const createTimer = () => ext.alarms.create("user-auth-refresh", { delayInMinutes: 1 })
let atomaTabs: number[] = [];

ext.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message && message.type == "user-auth") {
		if (sender.tab && sender.tab.id)
			atomaTabs.push(sender.tab.id)
		console.dir(message);
		authData = message.user;
	}
	sendResponse();
});

ext.tabs.onRemoved.addListener((tabId) => {
	atomaTabs = atomaTabs.filter((tab) => tab != tabId)
});

ext.alarms.onAlarm.addListener((alarm) => {
	if(alarm.name == "user-auth-refresh") {
		createTimer();
		if (authData) {
			const fetcher = createFetcher(authData, true);
			fetcher("https://bsp-auth-prod.atoma.cloud/queue/refresh").then((result) => {
				atomaTabs.forEach((tabId) => {
					chrome.tabs.sendMessage(tabId, { type: "user-auth-update", user: result })
				});
			});
		}
	}
});

createTimer();