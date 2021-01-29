"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _debug = _interopRequireDefault(require("debug"));

console.log("COBROWSER Piffer");
console.log(_debug);

var _RESTAPI = _interopRequireDefault(require("./rest/RESTAPI.js"));

var _SocketManager = _interopRequireDefault(require("./socket/SocketManager.js"));

var _RemoteContext = _interopRequireDefault(require("./remotecontext/RemoteContext.js"));

var _ActivityDetection = _interopRequireDefault(require("./util/ActivityDetection.js"));

var _TokenExpiredError = _interopRequireDefault(require("./rest/TokenExpiredError.js"));

var _devices = _interopRequireDefault(require("./devices"));

var _sessions = _interopRequireDefault(require("./sessions"));

var _package = _interopRequireDefault(require("../package.json"));

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

var debug = (0, _debug.default)('cbio.CobrowseAPI');

var _activity = new WeakMap();

var _sockets = new WeakMap();

var _api = new WeakMap();

var _getSocketAuth = new WeakMap();

var _handleError = new WeakMap();

var CobrowseAPI = /*#__PURE__*/function () {
  function CobrowseAPI(token) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CobrowseAPI);

    _activity.set(this, {
      writable: true,
      value: new _ActivityDetection.default()
    });

    _sockets.set(this, {
      writable: true,
      value: new _SocketManager.default({
        getSocketAuth: function getSocketAuth() {
          return _classPrivateFieldGet(_this, _getSocketAuth).call(_this);
        }
      })
    });

    _api.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "attachContext", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(target) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new _RemoteContext.default(target));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _getSocketAuth.set(this, {
      writable: true,
      value: (0, _throttle.default)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _classPrivateFieldGet(_this, _api).fetch('/api/1/users/me');

              case 2:
                user = _context2.sent;
                return _context2.abrupt("return", {
                  token: user.notification_token,
                  url: user.notification_url
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })), 60 * 60 * 1000)
    });

    _handleError.set(this, {
      writable: true,
      value: function value(e) {
        // if the JWT has expired, there's no point in keeping on trying
        // to connect the sockets, so kill the activity watching and socket
        // loop. We'll restart these if the token is updated
        if (e instanceof _TokenExpiredError.default) {
          // TODO: should we pass on these errors via an event emitter or similar?
          console.warn('The CobrowseIO token has expired. Please set a new token');

          _classPrivateFieldGet(_this, _activity).stop();

          _classPrivateFieldGet(_this, _sockets).disconnect();
        } else throw e;
      }
    });

    debug('constructed CobrowseAPI');

    _classPrivateFieldSet(this, _api, new _RESTAPI.default(options.api || 'https://cobrowse.io')); // headers for REST api calls


    _classPrivateFieldGet(this, _api).setHeader('X-CobrowsePlatform', 'agent-sdk');

    _classPrivateFieldGet(this, _api).setHeader('X-CobrowseSDKVersion', _package.default.version);

    _classPrivateFieldGet(this, _api).setHeader('X-CobrowseAPIVersion', '1.2.0'); // and some on sockets


    _classPrivateFieldGet(this, _sockets).setHeader('X-CobrowsePlatform', 'agent-sdk');

    _classPrivateFieldGet(this, _sockets).setHeader('X-CobrowseSDKVersion', _package.default.version);

    _classPrivateFieldGet(this, _sockets).on('error', _classPrivateFieldGet(this, _handleError));

    if (token) this.token = token; // watch for activity in the window, we only connect sockets when
    // windows are actually in use

    _classPrivateFieldGet(this, _activity).start();

    _classPrivateFieldGet(this, _activity).on('active', function () {
      return _classPrivateFieldGet(_this, _sockets).connect().catch(_classPrivateFieldGet(_this, _handleError));
    });

    _classPrivateFieldGet(this, _activity).on('inactive', _classPrivateFieldGet(this, _sockets).disconnect);
  }

  _createClass(CobrowseAPI, [{
    key: "token",
    get: function get() {
      var header = _classPrivateFieldGet(this, _api).getHeader('Authorization');

      if (!header) return null;
      return header.replace(/^Bearer /, '');
    },
    set: function set(token) {
      debug('updated token to', token);
      if (token) _classPrivateFieldGet(this, _api).setHeader('Authorization', "Bearer ".concat(token));else _classPrivateFieldGet(this, _api).removeHeader('Authorization'); // try to restart the activity loop if the token is updated
      // see the comment in #handleError for why this is

      _classPrivateFieldGet(this, _activity).start();
    }
  }, {
    key: "api",
    get: function get() {
      return _classPrivateFieldGet(this, _api).baseurl;
    }
  }, {
    key: "devices",
    get: function get() {
      return (0, _devices.default)(_classPrivateFieldGet(this, _api), _classPrivateFieldGet(this, _sockets));
    }
  }, {
    key: "sessions",
    get: function get() {
      return (0, _sessions.default)(_classPrivateFieldGet(this, _api), _classPrivateFieldGet(this, _sockets));
    }
  }]);

  return CobrowseAPI;
}();

exports.default = CobrowseAPI;