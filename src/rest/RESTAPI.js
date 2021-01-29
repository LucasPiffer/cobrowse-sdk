"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _qs = _interopRequireDefault(require("qs"));

var _TokenExpiredError = _interopRequireDefault(require("./TokenExpiredError"));

var _HTTPError = _interopRequireDefault(require("./HTTPError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _baseurl = new WeakMap();

var _headers = new WeakMap();

var _url = new WeakMap();

var _handleErrors = new WeakMap();

var RESTAPI = /*#__PURE__*/function () {
  function RESTAPI(baseurl) {
    var _this = this;

    _classCallCheck(this, RESTAPI);

    _baseurl.set(this, {
      writable: true,
      value: void 0
    });

    _headers.set(this, {
      writable: true,
      value: {
        'Content-Type': 'application/json'
      }
    });

    _defineProperty(this, "setHeader", function (key, value) {
      _classPrivateFieldGet(_this, _headers)[key] = value;
    });

    _defineProperty(this, "getHeader", function (key) {
      return _classPrivateFieldGet(_this, _headers)[key];
    });

    _defineProperty(this, "removeHeader", function (key) {
      delete _classPrivateFieldGet(_this, _headers)[key];
    });

    _url.set(this, {
      writable: true,
      value: function value(url, query) {
        // ensure relative URLs are resolved from baseurl
        var absolute = new URL(url, _classPrivateFieldGet(_this, _baseurl)); // always set query params

        absolute.search = _qs.default.stringify(query, {
          arrayFormat: 'brackets'
        }); // strip trailing slashes

        if (/\/$/.test(absolute.pathname)) absolute.pathname = absolute.pathname.slice(0, -1);
        return absolute.toString();
      }
    });

    _defineProperty(this, "create", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, state) {
        var query,
            options,
            res,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
                _context.next = 4;
                return fetch(_classPrivateFieldGet(_this, _url).call(_this, url, query), _objectSpread({
                  method: 'POST',
                  headers: _classPrivateFieldGet(_this, _headers),
                  body: JSON.stringify(state)
                }, options));

              case 4:
                res = _context.sent;
                _context.next = 7;
                return _classPrivateFieldGet(_this, _handleErrors).call(_this, res);

              case 7:
                return _context.abrupt("return", res.json());

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "list", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
        var query,
            options,
            res,
            json,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                _context2.next = 4;
                return fetch(_classPrivateFieldGet(_this, _url).call(_this, url, query), _objectSpread({
                  method: 'GET',
                  headers: _classPrivateFieldGet(_this, _headers)
                }, options));

              case 4:
                res = _context2.sent;
                _context2.next = 7;
                return _classPrivateFieldGet(_this, _handleErrors).call(_this, res);

              case 7:
                _context2.next = 9;
                return res.json();

              case 9:
                json = _context2.sent;

                if (Array.isArray(json)) {
                  _context2.next = 12;
                  break;
                }

                throw new Error('expected array');

              case 12:
                return _context2.abrupt("return", json);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "fetch", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url, state) {
        var query,
            options,
            res,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                options = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                _context3.next = 4;
                return fetch(_classPrivateFieldGet(_this, _url).call(_this, url, query), _objectSpread({
                  method: 'GET',
                  headers: _classPrivateFieldGet(_this, _headers)
                }, options));

              case 4:
                res = _context3.sent;
                _context3.next = 7;
                return _classPrivateFieldGet(_this, _handleErrors).call(_this, res);

              case 7:
                return _context3.abrupt("return", res.json());

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "update", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url, state) {
        var query,
            options,
            res,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                _context4.next = 4;
                return fetch(_classPrivateFieldGet(_this, _url).call(_this, url, query), _objectSpread({
                  method: 'PUT',
                  headers: _classPrivateFieldGet(_this, _headers),
                  body: JSON.stringify(state)
                }, options));

              case 4:
                res = _context4.sent;
                _context4.next = 7;
                return _classPrivateFieldGet(_this, _handleErrors).call(_this, res);

              case 7:
                return _context4.abrupt("return", res.json());

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(this, "destroy", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url, state) {
        var query,
            options,
            res,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                query = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                options = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                _context5.next = 4;
                return fetch(_classPrivateFieldGet(_this, _url).call(_this, url, query), _objectSpread({
                  method: 'DELETE',
                  headers: _classPrivateFieldGet(_this, _headers)
                }, options));

              case 4:
                res = _context5.sent;
                _context5.next = 7;
                return _classPrivateFieldGet(_this, _handleErrors).call(_this, res);

              case 7:
                return _context5.abrupt("return", {});

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
      };
    }());

    _handleErrors.set(this, {
      writable: true,
      value: function () {
        var _value = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(res) {
          var err;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!(res.status >= 400)) {
                    _context6.next = 9;
                    break;
                  }

                  _context6.next = 3;
                  return res.json();

                case 3:
                  err = _context6.sent;

                  if (!(err.message === 'jwt expired')) {
                    _context6.next = 8;
                    break;
                  }

                  throw new _TokenExpiredError.default(err.message, res.status);

                case 8:
                  throw new _HTTPError.default(err.message, res.status);

                case 9:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        function value(_x10) {
          return _value.apply(this, arguments);
        }

        return value;
      }()
    });

    _classPrivateFieldSet(this, _baseurl, baseurl);
  }

  _createClass(RESTAPI, [{
    key: "baseurl",
    get: function get() {
      return _classPrivateFieldGet(this, _baseurl);
    }
  }]);

  return RESTAPI;
}();

exports.default = RESTAPI;