var qif = require('qif');
// var fs = require('fs');
//
// qifFile = fs.readFile('./test-transactions.json', 'utf8', function (err, transactionJson) {
//   var transactionData = JSON.parse(transactionJson);
//   console.dir(transactionData);
//   var qifData = qif.write(transactionData);
//   console.log(qifData);
// });

// var transactionData = {
//   "cash": [
//     {
//       "date": "3/7/2014",
//       "amount": -213.39,
//       "payee": "Kroger",
//       "memo": "this is a memo",
//       "category": "Groceries",
//       "checknumber": 123
//     },
//     {
//       "date": "3/6/2014",
//       "amount": -8.16,
//       "payee": "Starbucks",
//       "category": "Dining Out:Coffee",
//       "checknumber": 456
//     }
//   ]
// };


var transactionData = {
    "cash": [
      {
        "date": "3/26",
        "amount": 40,
        "payee": "Us Shared Branch",
        "memo": "USShared Branch Dep: #264776",
        "category": "Income"
      },
      {
        "date": "2/29",
        "amount": 0.16,
        "payee": "Div Dep Dividend",
        "memo": "Dividend PostDiv Dep: Dividend Post",
        "category": "Investments"
      }
    ]
  };
var qifData = qif.write(transactionData);
console.log(qifData);
