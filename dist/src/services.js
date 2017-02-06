'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BLOCK_INTERVAL = exports.SEARCH_REQUEST = exports.HANDSHAKE_RESPONSE = exports.HANDSHAKE_REQUEST = exports.getIdentity = exports.setIdentity = exports.getIpfs = exports.getWeb3 = undefined;

var _web3ApiConnection = require('./web3-api-connection');

var _web3ApiConnection2 = _interopRequireDefault(_web3ApiConnection);

var _ipfsApiConnection = require('./ipfs-api-connection');

var _ipfsApiConnection2 = _interopRequireDefault(_ipfsApiConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var services = {
  web3: null,
  ipfs: null,
  whisperIdentity: process.env.WHISPER_IDENTITY
};

var getWeb3 = exports.getWeb3 = function getWeb3() {
  if (!services.web3) {
    services.web3 = (0, _web3ApiConnection2.default)();
  }
  return services.web3;
};

var getIpfs = exports.getIpfs = function getIpfs() {
  if (!services.ipfs) {
    services.ipfs = (0, _ipfsApiConnection2.default)();
  }
  return services.ipfs;
};

var setIdentity = exports.setIdentity = function setIdentity(newIdentity) {
  services.whisperIdentity = newIdentity;
};

var getIdentity = exports.getIdentity = function getIdentity() {
  return services.whisperIdentity;
};
var HANDSHAKE_REQUEST = exports.HANDSHAKE_REQUEST = '0x68616e647368616b6552657175657374';
var HANDSHAKE_RESPONSE = exports.HANDSHAKE_RESPONSE = '0x68616e647368616b65526573706f6e7365';

var SEARCH_REQUEST = exports.SEARCH_REQUEST = '0x5345415243485f52455155455354';

var BLOCK_INTERVAL = exports.BLOCK_INTERVAL = 100;
//# sourceMappingURL=services.js.map