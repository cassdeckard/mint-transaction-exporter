'use strict';

function messageTab(tab, message, callback) {
  chrome.tabs.sendMessage(tab.id, message, callback);
}

function messageCurrentTab(message, callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => messageTab(tabs[0], message, callback));
}

function doExport() {
  messageCurrentTab({doExport: true}, function (x) {
    console.dir(x);
  })
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('export-confirm').addEventListener('click', doExport);
});
