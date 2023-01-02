"use strict";
(() => {
  // src/background.ts
  var ext = chrome || browser;
  var dashboardUrl = "https://accounts.atoma.cloud/dashboard";
  ext.browserAction.onClicked.addListener(() => {
    window.open(dashboardUrl, "_blank");
  });
})();
