'use strict';

console.log('Mint transaction exporter extension running');

var lastJsonDataRequest = undefined;

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.doExport) {
      console.log('User requested export');
      return;
    }
    lastJsonDataRequest = message.getJsonDataRequest ? message.getJsonDataRequest : lastJsonDataRequest;
  }
);
