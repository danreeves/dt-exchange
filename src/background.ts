let ext = chrome || browser

let domainMatch = "https://accounts.atoma.cloud/*"
let dashboardUrl = "https://accounts.atoma.cloud/dashboard"
let dontReloadList = ["/login", "/linking", "/dashboard"]

ext.browserAction.onClicked.addListener(() => {
	ext.tabs.query({ url: domainMatch }, (tabs) => {
		if (tabs.length) {
			ext.tabs.update(tabs[0].id, { active: true })
			let tabUrl = new URL(tabs[0].url)
			if (!dontReloadList.includes(tabUrl.pathname)) {
				ext.tabs.update(tabs[0].id, { url: dashboardUrl })
			}
		} else {
			ext.tabs.create({
				url: dashboardUrl,
				active: true,
			})
		}
	})
})
