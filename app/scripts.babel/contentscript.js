'use strict';

console.log('Mint transaction exporter extension running');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.dir(request.getJsonDataRequest);
  }
);
