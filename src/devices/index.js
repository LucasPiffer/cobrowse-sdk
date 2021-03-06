"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Device", {
  enumerable: true,
  get: function get() {
    return _Device.default;
  }
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _debug = _interopRequireDefault(require("debug"));

var _Device = _interopRequireDefault(require("./Device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var debug = (0, _debug.default)('cbio.devices');

var _default = function _default(api, sockets) {
  return {
    get: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, query) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                debug('get()', query);
                _context.t0 = _Device.default;
                _context.t1 = api;
                _context.t2 = sockets;
                _context.next = 6;
                return api.fetch(_Device.default.url({
                  id: id
                }), query);

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

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }(),
    list: function () {
      var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
        var devices;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                debug('list()', query);
                _context2.next = 3;
                return api.list(_Device.default.url(), query);

              case 3:
                devices = _context2.sent;
                return _context2.abrupt("return", devices.map(function (device) {
                  return new _Device.default(api, sockets, device);
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function list(_x3) {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  };
};

exports.default = _default;