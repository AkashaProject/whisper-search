'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = runService;

var _services = require('./services');

var _indexModel = require('./indexModel');

var lvlDb = void 0;
var installFilter = function installFilter(web3) {
  var filter = web3.shh.filter({ topics: [_services.SEARCH_REQUEST], to: (0, _services.getIdentity)() });
  filter.watch(function (err, message) {
    var payload = web3.toUtf8(message.payload);
    var jsonPayload = void 0;
    try {
      jsonPayload = JSON.parse(payload);
    } catch (err) {
      console.log(err);
    }
    if (!jsonPayload || !jsonPayload.text) {
      return;
    }
    var response = new Set();
    lvlDb.totalHits({ query: { AND: { '*': [jsonPayload.text] } } }, function (err, count) {
      var pageSize = jsonPayload.pageSize ? jsonPayload.pageSize : 20;
      lvlDb.search({ query: { AND: { '*': [jsonPayload.text] } }, pageSize: pageSize, offset: jsonPayload.offset }).on('data', function (data) {
        response.add(data.document.entryId);
      }).on('end', function () {
        var results = JSON.stringify({ count: count, entries: Array.from(response) });
        var hexResult = web3.fromUtf8(results);
        web3.shh.post({
          from: identity,
          to: message.from,
          topics: [message.payload],
          payload: hexResult,
          ttl: web3.fromDecimal(10)
        }, function (error, sent) {
          if (sent) {
            console.log('search done for keyword', payload, ' with results ', results);
          } else {
            console.error('search error for keyword', payload, error);
          }
        });
        //
      });
    });
  });
  return null;
};

function runService() {
  var web3 = (0, _services.getWeb3)();

  if ((0, _services.getIdentity)()) {
    (0, _indexModel.getIndex)(function (err, resp) {
      lvlDb = resp;
    });
    return installFilter(web3);
  }

  web3.shh.newIdentity(function (err, address) {
    console.log('SERVICE IDENTITY ', address);
    (0, _services.setIdentity)(address);
    return installFilter(web3);
  });
}
//# sourceMappingURL=search.js.map