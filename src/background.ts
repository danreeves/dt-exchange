let ext = chrome || browser
let dashboardUrl = "https://accounts.atoma.cloud/dashboard"

ext.browserAction.onClicked.addListener(() => {
	window.open(dashboardUrl, "_blank")
})
