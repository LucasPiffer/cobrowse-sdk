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

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _debug = _interopRequireDefault(require("debug"));

var _cborJs = _interopRequireDefault(require("@arduino/cbor-js"));

var _events = require("events");

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

var debug = (0, _debug.default)('cbio.CBORSocket');

var _delegate = new WeakMap();

var _closed = new WeakMap();

var _socket = new WeakMap();

var _attempts = new WeakMap();

var _maxDelay = new WeakMap();

var _minDelay = new WeakMap();

var _pingInterval = new WeakMap();

var _openSuccessTimeout = new WeakMap();

var _reconnectTimeout = new WeakMap();

var _messageId = new WeakMap();

var _lastMessageAck = new WeakMap();

var _createSocket = new WeakMap();

var _handleOpen = new WeakMap();

var _handleAck = new WeakMap();

var _handleMessage = new WeakMap();

var _reconnectDelay = new WeakMap();

var _reconnect = new WeakMap();

var _handleClose = new WeakMap();

var _handleError = new WeakMap();

var _sendPing = new WeakMap();

var CBORSocket = /*#__PURE__*/function (_EventEmitter) {
  _inherits(CBORSocket, _EventEmitter);

  var _super = _createSuper(CBORSocket); // message IDs for flow control


  function CBORSocket(delegate) {
    var _this;

    _classCallCheck(this, CBORSocket);

    _this = _super.call(this);

    _delegate.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _closed.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _socket.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _attempts.set(_assertThisInitialized(_this), {
      writable: true,
      value: 0
    });

    _maxDelay.set(_assertThisInitialized(_this), {
      writable: true,
      value: 60 * 1000
    });

    _minDelay.set(_assertThisInitialized(_this), {
      writable: true,
      value: 1000 + Math.floor(1000 * Math.random())
    });

    _pingInterval.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _openSuccessTimeout.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _reconnectTimeout.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _messageId.set(_assertThisInitialized(_this), {
      writable: true,
      value: 0
    });

    _lastMessageAck.set(_assertThisInitialized(_this), {
      writable: true,
      value: 0
    });

    _createSocket.set(_assertThisInitialized(_this), {
      writable: true,
      value: function () {
        var _value = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var url, socket;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!_classPrivateFieldGet(_assertThisInitialized(_this), _socket)) {
                    _context.next = 3;
                    break;
                  }

                  console.error('Socket already exists');
                  return _context.abrupt("return");

                case 3:
                  debug('creating ws'); // Generate the URL. Important: this might be an
                  // asynchronous operation (e.g. getting the server
                  // to generate a token). So we need to be careful
                  // to re-check the intended state of the socket
                  // after a successful url generation

                  _context.next = 6;
                  return _classPrivateFieldGet(_assertThisInitialized(_this), _delegate).getUrl();

                case 6:
                  url = _context.sent;

                  if (!_classPrivateFieldGet(_assertThisInitialized(_this), _closed)) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return");

                case 9:
                  if (!_classPrivateFieldGet(_assertThisInitialized(_this), _socket)) {
                    _context.next = 11;
                    break;
                  }

                  return _context.abrupt("return");

                case 11:
                  // otherwise we have the URL so create the underlying
                  // WebSocket instance
                  socket = new WebSocket(url);
                  socket.binaryType = 'arraybuffer';
                  socket.addEventListener('open', _classPrivateFieldGet(_assertThisInitialized(_this), _handleOpen));
                  socket.addEventListener('message', _classPrivateFieldGet(_assertThisInitialized(_this), _handleMessage));
                  socket.addEventListener('close', _classPrivateFieldGet(_assertThisInitialized(_this), _handleClose));
                  socket.addEventListener('error', _classPrivateFieldGet(_assertThisInitialized(_this), _handleError)); // save the socket on the instance

                  _classPrivateFieldSet(_assertThisInitialized(_this), _socket, socket);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function value() {
          return _value.apply(this, arguments);
        }

        return value;
      }()
    });

    _handleOpen.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        debug('ws opened');

        _this.emit('open');

        clearTimeout(_classPrivateFieldGet(_assertThisInitialized(_this), _openSuccessTimeout)); // require socket to be held opne for a little time before
        // resetting the backoff algorithm

        _classPrivateFieldSet(_assertThisInitialized(_this), _openSuccessTimeout, setTimeout(function () {
          debug('counting open as success');

          _classPrivateFieldSet(_assertThisInitialized(_this), _attempts, 0);
        }, 5 * 1000));
      }
    });

    _handleAck.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(ack) {
        _classPrivateFieldSet(_assertThisInitialized(_this), _lastMessageAck, ack);
      }
    });

    _handleMessage.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(message) {
        try {
          var _CBOR$decode = _cborJs.default.decode(message.data),
              event = _CBOR$decode.event,
              data = _CBOR$decode.data,
              ack = _CBOR$decode.ack;

          if (ack) return _classPrivateFieldGet(_assertThisInitialized(_this), _handleAck).call(_assertThisInitialized(_this), ack);
          if (!event) return console.error('Socket received message without event', message);
          return _this.emit('event', event, data);
        } catch (e) {
          return console.error('Error processing message', message.data, e.stack);
        }
      }
    });

    _reconnectDelay.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(attempt) {
        var randomFactor = 1 + 0.5 * Math.random();
        var delay = Math.floor(Math.pow(300 * attempt, 1.2) * randomFactor);
        return Math.min(Math.max(_classPrivateFieldGet(_assertThisInitialized(_this), _minDelay), delay), _classPrivateFieldGet(_assertThisInitialized(_this), _maxDelay));
      }
    });

    _reconnect.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        // if the socket was destroyed then don't try to reconnect
        if (_classPrivateFieldGet(_assertThisInitialized(_this), _closed)) {
          debug('reconnect skipped as socket was closed');
          return;
        } // never try to schedule multiple reconnects


        if (_classPrivateFieldGet(_assertThisInitialized(_this), _reconnectTimeout)) {
          debug('reconnect skipped as reconnect already scheduled');
          return;
        } // if we're offline then don't try to reconnect yet, just wait a bit
        // and try again


        if (navigator.onLine === false) {
          debug('navigator offline');

          _classPrivateFieldSet(_assertThisInitialized(_this), _reconnectTimeout, setTimeout(function () {
            _classPrivateFieldSet(_assertThisInitialized(_this), _reconnectTimeout, null);

            _classPrivateFieldGet(_assertThisInitialized(_this), _reconnect).call(_assertThisInitialized(_this));
          }, 1000));

          return;
        } // otherwise work out the backoff delay and schedule reconnection


        var delay = _classPrivateFieldGet(_assertThisInitialized(_this), _reconnectDelay).call(_assertThisInitialized(_this), _classPrivateFieldGet(_assertThisInitialized(_this), _attempts));

        debug('reconnecting in', delay, 'attempts', _classPrivateFieldGet(_assertThisInitialized(_this), _attempts));

        _classPrivateFieldSet(_assertThisInitialized(_this), _reconnectTimeout, setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _classPrivateFieldSet(_assertThisInitialized(_this), _reconnectTimeout, null);

                  if (!_classPrivateFieldGet(_assertThisInitialized(_this), _closed)) {
                    _context2.next = 5;
                    break;
                  }

                  console.warn('tried to reconnect after close');
                  _context2.next = 8;
                  break;

                case 5:
                  _classPrivateFieldSet(_assertThisInitialized(_this), _socket, null);

                  _context2.next = 8;
                  return _classPrivateFieldGet(_assertThisInitialized(_this), _createSocket).call(_assertThisInitialized(_this)).catch(_classPrivateFieldGet(_assertThisInitialized(_this), _handleError));

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })), delay));

        _classPrivateFieldSet(_assertThisInitialized(_this), _attempts, _classPrivateFieldGet(_assertThisInitialized(_this), _attempts) + 1);
      }
    });

    _handleClose.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        debug('ws closed');

        _this.emit('close');

        debug('resetting message acks');

        _classPrivateFieldSet(_assertThisInitialized(_this), _messageId, 0);

        _classPrivateFieldSet(_assertThisInitialized(_this), _lastMessageAck, 0); // backoff reconnection


        if (!_classPrivateFieldGet(_assertThisInitialized(_this), _closed)) _classPrivateFieldGet(_assertThisInitialized(_this), _reconnect).call(_assertThisInitialized(_this)); // cancel pending success timeout

        clearTimeout(_classPrivateFieldGet(_assertThisInitialized(_this), _openSuccessTimeout));
      }
    });

    _handleError.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(error) {
        _this.emit('error', error);
      }
    });

    _sendPing.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        _this.send('ping');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "messageLag", function () {
      // if no ack received at all, then don't count as lagging
      // could mean server doesn't support acks or something
      if (!_classPrivateFieldGet(_assertThisInitialized(_this), _lastMessageAck)) return 0;
      return _classPrivateFieldGet(_assertThisInitialized(_this), _messageId) - _classPrivateFieldGet(_assertThisInitialized(_this), _lastMessageAck);
    });

    _defineProperty(_assertThisInitialized(_this), "setMaxReconnectDelay", function (delay) {
      debug('set max delay', delay);

      _classPrivateFieldSet(_assertThisInitialized(_this), _maxDelay, delay);
    });

    _defineProperty(_assertThisInitialized(_this), "setMinReconnectDelay", function (delay) {
      debug('set min delay', delay);

      _classPrivateFieldSet(_assertThisInitialized(_this), _minDelay, delay);
    });

    _defineProperty(_assertThisInitialized(_this), "send", function (event, data) {
      if (!_this.connected) return false;

      _classPrivateFieldSet(_assertThisInitialized(_this), _messageId, _classPrivateFieldGet(_assertThisInitialized(_this), _messageId) + 1);

      _classPrivateFieldGet(_assertThisInitialized(_this), _socket).send(_cborJs.default.encode(data ? {
        event: event,
        data: data,
        id: _classPrivateFieldGet(_assertThisInitialized(_this), _messageId)
      } : {
        event: event
      }));

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      debug('close');

      _classPrivateFieldSet(_assertThisInitialized(_this), _closed, true);

      if (_classPrivateFieldGet(_assertThisInitialized(_this), _socket)) try {
        var _classPrivateFieldGet2;

        (_classPrivateFieldGet2 = _classPrivateFieldGet(_assertThisInitialized(_this), _socket)).close.apply(_classPrivateFieldGet2, arguments);
      } catch (e) {
        debug('error closing socket', e);
      }

      _classPrivateFieldSet(_assertThisInitialized(_this), _socket, null);

      _this.removeAllListeners();

      clearTimeout(_classPrivateFieldGet(_assertThisInitialized(_this), _reconnectTimeout));
      clearInterval(_classPrivateFieldGet(_assertThisInitialized(_this), _pingInterval));
      window.removeEventListener('unload', _this.close);
    });

    debug('created cbor socket');

    _classPrivateFieldSet(_assertThisInitialized(_this), _delegate, delegate);

    _classPrivateFieldSet(_assertThisInitialized(_this), _pingInterval, setInterval(_classPrivateFieldGet(_assertThisInitialized(_this), _sendPing), 60 * 1000));

    window.addEventListener('unload', _this.close);

    _this.on('error', function (e) {
      return debug('ws errored', e);
    });

    _classPrivateFieldGet(_assertThisInitialized(_this), _createSocket).call(_assertThisInitialized(_this)).catch(_classPrivateFieldGet(_assertThisInitialized(_this), _handleError));

    return _this;
  }

  _createClass(CBORSocket, [{
    key: "bufferedAmount",
    get: function get() {
      if (!_classPrivateFieldGet(this, _socket)) return Infinity;
      return _classPrivateFieldGet(this, _socket).bufferedAmount;
    }
  }, {
    key: "connected",
    get: function get() {
      if (_classPrivateFieldGet(this, _socket)) return _classPrivateFieldGet(this, _socket).readyState === _classPrivateFieldGet(this, _socket).OPEN;else return false;
    }
  }]);

  return CBORSocket;
}(_events.EventEmitter);

exports.default = CBORSocket;