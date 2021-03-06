"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAgentToken = getAgentToken;
exports.ApiUrl = void 0;

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var ApiUrl = 'https://api.staging.cobrowse.io';
exports.ApiUrl = ApiUrl;

function getAgentToken() {
  return _getAgentToken.apply(this, arguments);
}

function _getAgentToken() {
  _getAgentToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (getAgentToken.token) {
              _context.next = 8;
              break;
            }

            _context.next = 3;
            return fetch("".concat(ApiUrl, "/api/1/demo/token?cobrowseio_demo_id=unittest"));

          case 3:
            res = _context.sent;
            _context.next = 6;
            return res.json();

          case 6:
            token = _context.sent;
            getAgentToken.token = token.token;

          case 8:
            return _context.abrupt("return", getAgentToken.token);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getAgentToken.apply(this, arguments);
}