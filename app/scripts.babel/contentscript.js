'use strict';

console.log('Mint transaction exporter extension running');

var lastJsonDataRequest = undefined;

function resendLastRequest() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', lastJsonDataRequest.url);
    xhr.onload = (xhrEvent => resolve(xhrEvent.target.response));
    xhr.send();
  });
}

function exportResponse(response) {
  console.dir(response);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.doExport) {
    console.log('User requested export');
    resendLastRequest().then(response => {
      exportResponse(response);
    })
    return;
  }
  lastJsonDataRequest = message.getJsonDataRequest ? message.getJsonDataRequest : lastJsonDataRequest;
});
