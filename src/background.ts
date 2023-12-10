let ext = chrome || browser
let dashboardUrl = "https://accounts.atoma.cloud/dashboard"

ext.action.onClicked.addListener(() => {
  ext.tabs.create({ url: dashboardUrl })
})
