"use strict";
(() => {
  // src/background.ts
  var ext = chrome || browser;
  var dashboardUrl = "https://accounts.atoma.cloud/dashboard";
  ext.browserAction.onClicked.addListener(() => {
    ext.tabs.create({ url: dashboardUrl });
  });
})();
