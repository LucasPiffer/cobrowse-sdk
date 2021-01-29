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

var _events = require("events");

var _sessions = require("../sessions");

var _protected = _interopRequireDefault(require("../util/protected.js"));

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

var debug = (0, _debug.default)('cbio.RemoteContext');

var _target = new WeakMap();

var _session = new WeakMap();

var _onPostMessage = new WeakMap();

var RemoteContext = /*#__PURE__*/function (_EventEmitter) {
  _inherits(RemoteContext, _EventEmitter);

  var _super = _createSuper(RemoteContext);

  function RemoteContext(target) {
    var _this;

    _classCallCheck(this, RemoteContext);

    _this = _super.call(this);

    _target.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _session.set(_assertThisInitialized(_this), {
      writable: true,
      value: new _sessions.Session()
    });

    _onPostMessage.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(e) {
        if (e.source !== _classPrivateFieldGet(_assertThisInitialized(_this), _target)) return;
        debug('got post message', e.data);
        var _e$data = e.data,
            event = _e$data.event,
            data = _e$data.data;

        if (event === 'session' && data) {
          _classPrivateFieldGet(_assertThisInitialized(_this), _session)[_protected.default].updateResource(data);

          _this.emit('session.updated', _classPrivateFieldGet(_assertThisInitialized(_this), _session));
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setTool", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tool) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                debug('set tool', tool);

                _classPrivateFieldGet(_assertThisInitialized(_this), _target).postMessage({
                  tool: tool
                }, '*');

                return _context.abrupt("return", true);

              case 3:
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

    _defineProperty(_assertThisInitialized(_this), "clearAnnotations", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              debug('clear annotations');

              _classPrivateFieldGet(_assertThisInitialized(_this), _target).postMessage({
                drawing: null
              }, '*');

              return _context2.abrupt("return", true);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "endSession", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              debug('end session');

              _classPrivateFieldGet(_assertThisInitialized(_this), _target).postMessage({
                session: {
                  state: 'ended'
                }
              }, '*');

              return _context3.abrupt("return", true);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    _defineProperty(_assertThisInitialized(_this), "destroy", function () {
      window.removeEventListener('message', _classPrivateFieldGet(_assertThisInitialized(_this), _onPostMessage));

      _this.removeAllListeners();

      _classPrivateFieldSet(_assertThisInitialized(_this), _target, null);
    });

    if (!target) throw new Error('context cannot be null');
    if (target instanceof window.HTMLIFrameElement) target = target.contentWindow;
    if (!target.postMessage) throw new Error('target must have postMessage interface');

    _classPrivateFieldSet(_assertThisInitialized(_this), _target, target);

    window.addEventListener('message', _classPrivateFieldGet(_assertThisInitialized(_this), _onPostMessage));
    return _this;
  }

  return RemoteContext;
}(_events.EventEmitter);

exports.default = RemoteContext;