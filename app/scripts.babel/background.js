'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

chrome.webRequest.onCompleted.addListener(function(details) {
  console.dir(details);
}, {
  urls: [
    'https://wwws.mint.com/app/getJsonData.xevent*'
  ]
});
