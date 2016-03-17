'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.hide(tabId);
});

function onGetJsonData(requestInfo) {
  chrome.tabs.sendMessage(requestInfo.tabId, {getJsonDataRequest: requestInfo});
  chrome.pageAction.show(requestInfo.tabId);
}

chrome.webRequest.onCompleted.addListener(onGetJsonData, { urls: ['https://wwws.mint.com/app/getJsonData.xevent*']});
