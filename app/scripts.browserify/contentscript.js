'use strict';

var qif = require('qif');
var JSZip = require('jszip');
var filesaver = require('filesaverjs');

console.log('Mint transaction exporter extension running');

var lastJsonDataRequest = undefined;;

function resendLastRequest() {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', lastJsonDataRequest.url);
    xhr.onload = function (xhrEvent) {
      return resolve(JSON.parse(xhrEvent.target.response));
    };
    xhr.send();;
  });
}

function formatDate(dateStr) {
  if (dateStr.includes('/')) {
    return dateStr;
  }
  var date = new Date(dateStr + ' ' + new Date().getFullYear());
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

function exportResponse(response) {
  var transactionData = response.set[0].data;

  function filterPending(transaction) {
    return !transaction.isPending;
  }

  var mapTransaction = function (transaction) {
    return {
      date: formatDate(transaction.date),
      amount: parseFloat(transaction.amount.replace(/[$,]/g, '')) * (transaction.isDebit ? -1 : 1),
      payee: transaction.merchant,
      memo: transaction.omerchant,
      category: transaction.category,
      fullTransaction: transaction
    };
  };

  var mapAccount = function (accountName) {
    return {
      accountName: accountName,
      transactions: transactionData.filter(function (datum) {
        return datum.account === accountName;
      }).filter(filterPending).map(mapTransaction)
    };
  };

  var reduceUniques = function reduceUniques(prev, cur) {
    return prev.indexOf(cur) < 0 ? prev.concat([cur]) : prev;
  };

  var accounts = transactionData.map(function (transaction) {
    return transaction.account;
  }).reduce(reduceUniques, []);

  var qifFiles = accounts.map(mapAccount).map(convertToQif);

  filesaver.saveAs(createZip(qifFiles).generate({ type: 'blob' }), 'mint-transactions.zip');
}

function createZip(qifFiles) {
  var zip = new JSZip();
  qifFiles.forEach(qifFile => {
    var blobFilename = qifFile.accountName + '.qif';
    zip.file(blobFilename, qifFile.qifContent);
  });
  return zip;
}

function convertToQif(account) {
  return {
    accountName: account.accountName,
    qifContent: qif.write({ cash: account.transactions })
  };
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.doExport) {
    console.log('User requested export');
    resendLastRequest().then(function (response) {
      exportResponse(response);
    });
    return;
  }
  if (message.getJsonDataRequest) {
    lastJsonDataRequest = message.getJsonDataRequest.url.includes('task=transaction') ? message.getJsonDataRequest : lastJsonDataRequest;
  }
});
