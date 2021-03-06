"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Session", {
  enumerable: true,
  get: function get() {
    return _Session.default;
  }
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _debug = _interopRequireDefault(require("debug"));

var _Session = _interopRequireDefault(require("./Session"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

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

var debug = (0, _debug.default)('cbio.sessions');

var _default = function _default(api, sockets) {
  return {
    create: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                debug('create()', query);
                _context.t0 = _Session.default;
                _context.t1 = api;
                _context.t2 = sockets;
                _context.next = 6;
                return api.create(_Session.default.url(), {}, query);

              case 6:
                _context.t3 = _context.sent;
                return _context.abrupt("return", new _context.t0(_context.t1, _context.t2, _context.t3));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }(),
    get: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(idOrCode, query) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                debug('get()', idOrCode, query);
                _context2.t0 = _Session.default;
                _context2.t1 = api;
                _context2.t2 = sockets;
                _context2.next = 6;
                return api.fetch(_Session.default.url({
                  id: idOrCode
                }), query);

              case 6:
                _context2.t3 = _context2.sent;
                return _context2.abrupt("return", new _context2.t0(_context2.t1, _context2.t2, _context2.t3));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function get(_x2, _x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }(),
    list: function () {
      var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
        var sessions;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                debug('list()', query);
                _context3.next = 3;
                return api.list(_Session.default.url(), query);

              case 3:
                sessions = _context3.sent;
                return _context3.abrupt("return", sessions.map(function (session) {
                  return new _Session.default(api, sockets, session);
                }));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function list(_x4) {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  };
};

exports.default = _default;