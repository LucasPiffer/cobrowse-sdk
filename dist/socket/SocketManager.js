"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _events = require("events");

var _CBORSocket = _interopRequireDefault(require("./CBORSocket.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

var _subscriptions = new WeakMap();

var _headers = new WeakMap();

var _socket = new WeakMap();

var _delegate = new WeakMap();

var _generateUrl = new WeakMap();

var _onOpen = new WeakMap();

var _onEvent = new WeakMap();

var _onError = new WeakMap();

var SocketManager = /*#__PURE__*/function (_EventEmitter) {
  _inherits(SocketManager, _EventEmitter);

  var _super = _createSuper(SocketManager);

  function SocketManager(delegate) {
    var _this;

    _classCallCheck(this, SocketManager);

    _this = _super.call(this);

    _subscriptions.set(_assertThisInitialized(_this), {
      writable: true,
      value: new Set()
    });

    _headers.set(_assertThisInitialized(_this), {
      writable: true,
      value: {}
    });

    _socket.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _delegate.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _defineProperty(_assertThisInitialized(_this), "setHeader", function (key, value) {
      _classPrivateFieldGet(_assertThisInitialized(_this), _headers)[key] = value;
    });

    _defineProperty(_assertThisInitialized(_this), "connect", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // create the socket if not already created, the function passed in to
              // the socket consturctor will always use the latest auth token saved on
              // the instance on reconnects
              if (!_classPrivateFieldGet(_assertThisInitialized(_this), _socket)) {
                _classPrivateFieldSet(_assertThisInitialized(_this), _socket, new _CBORSocket.default({
                  getUrl: function () {
                    var _getUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.t0 = _classPrivateFieldGet(_assertThisInitialized(_this), _generateUrl);
                              _context.t1 = _assertThisInitialized(_this);
                              _context.next = 4;
                              return _classPrivateFieldGet(_assertThisInitialized(_this), _delegate).getSocketAuth();

                            case 4:
                              _context.t2 = _context.sent;
                              return _context.abrupt("return", _context.t0.call.call(_context.t0, _context.t1, _context.t2));

                            case 6:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    function getUrl() {
                      return _getUrl.apply(this, arguments);
                    }

                    return getUrl;
                  }()
                }));

                _classPrivateFieldGet(_assertThisInitialized(_this), _socket).setMaxReconnectDelay(10 * 60 * 1000);

                _classPrivateFieldGet(_assertThisInitialized(_this), _socket).on('open', _classPrivateFieldGet(_assertThisInitialized(_this), _onOpen));

                _classPrivateFieldGet(_assertThisInitialized(_this), _socket).on('event', _classPrivateFieldGet(_assertThisInitialized(_this), _onEvent));

                _classPrivateFieldGet(_assertThisInitialized(_this), _socket).on('error', _classPrivateFieldGet(_assertThisInitialized(_this), _onError));
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _generateUrl.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(_ref2) {
        var url = _ref2.url,
            token = _ref2.token;
        var headers = Object.keys(_classPrivateFieldGet(_assertThisInitialized(_this), _headers)).map(function (key) {
          return "".concat(key, "=").concat(_classPrivateFieldGet(_assertThisInitialized(_this), _headers)[key]);
        }).join('&');
        var wsUrl = url.replace('https://', 'wss://').replace('http://', 'ws://');
        return "".concat(wsUrl, "/sockets/1/ws?access_token=").concat(token, "&").concat(headers);
      }
    });

    _onOpen.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        // resubscribe tokens on successful (re)connections.
        _toConsumableArray(_classPrivateFieldGet(_assertThisInitialized(_this), _subscriptions)).forEach(function (tokenFn) {
          var token = tokenFn();
          if (token) _this.send('subscribe', token);
        });

        _this.emit('open');
      }
    });

    _onEvent.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(event, data) {
        _this.emit('event', event, data);
      }
    });

    _onError.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(e) {
        _this.emit('error', e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "send", function (event, data) {
      if (!_classPrivateFieldGet(_assertThisInitialized(_this), _socket)) return false;
      return _classPrivateFieldGet(_assertThisInitialized(_this), _socket).send(event, data);
    });

    _defineProperty(_assertThisInitialized(_this), "disconnect", function () {
      if (_classPrivateFieldGet(_assertThisInitialized(_this), _socket)) {
        _classPrivateFieldGet(_assertThisInitialized(_this), _socket).close();

        _classPrivateFieldSet(_assertThisInitialized(_this), _socket, null);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "subscribe", function (subscriptionTokenFn) {
      _classPrivateFieldGet(_assertThisInitialized(_this), _subscriptions).add(subscriptionTokenFn); // ensure a connection has been attempted


      _this.connect().catch(_classPrivateFieldGet(_assertThisInitialized(_this), _onError));

      if (_classPrivateFieldGet(_assertThisInitialized(_this), _socket) && subscriptionTokenFn()) {
        _this.send('subscribe', subscriptionTokenFn());
      }
    });

    _defineProperty(_assertThisInitialized(_this), "unsubscribe", function (tokenFn) {
      _classPrivateFieldGet(_assertThisInitialized(_this), _subscriptions).delete(tokenFn);

      if (_classPrivateFieldGet(_assertThisInitialized(_this), _subscriptions).size === 0) _this.disconnect();
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _delegate, delegate);

    _this.setMaxListeners(10000);

    return _this;
  }

  return SocketManager;
}(_events.EventEmitter);

exports.default = SocketManager;