'use strict';

console.log('Mint transaction exporter extension running');

var lastJsonDataRequest = undefined;

function resendLastRequest() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', lastJsonDataRequest.url);
    xhr.onload = (xhrEvent => resolve(JSON.parse(xhrEvent.target.response)));
    xhr.send();
  });
}

function exportResponse(response) {
  var transactionData = response.set[0].data;

  function reduceUniques(prev, cur) {
    return (prev.indexOf(cur) < 0) ? prev.concat([cur]) : prev;
  }

  function byAccountName(accountName) {
    return ((datum) => datum.account === accountName);
  }

  var mapTransaction = ((transaction) => ({
    id: 'TODO'
  }));

  function mapAccount(accountName) {
    return {
      accountName: accountName,
      transactions: transactionData.filter(byAccountName(accountName)).map(mapTransaction)
    };
  }

  var accounts = transactionData.map((transaction) => transaction.account).reduce(reduceUniques, []);

  var groupedTransactions = accounts.map(mapAccount);
  console.dir(groupedTransactions);
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
