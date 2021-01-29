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

var _RESTResource2 = _interopRequireDefault(require("../rest/RESTResource.js"));

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

var debug = (0, _debug.default)('cbio.Session');

var _sockets = new WeakMap();

var _field = new WeakMap();

var _handleEvent = new WeakMap();

var _getSocketToken = new WeakMap();

var Session = /*#__PURE__*/function (_RESTResource) {
  _inherits(Session, _RESTResource);

  var _super = _createSuper(Session);

  function Session(api, sockets) {
    var _this;

    var _resource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Session);

    _this = _super.call(this, api, _resource);

    _sockets.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _field.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(key) {
        return _this[_protected.default].field(key);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "end", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _this.update({
                state: 'ended'
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "isActive", function () {
      return _this.state === 'active';
    });

    _defineProperty(_assertThisInitialized(_this), "isAuthorizing", function () {
      return _this.state === 'authorizing';
    });

    _defineProperty(_assertThisInitialized(_this), "isPending", function () {
      return _this.state === 'pending';
    });

    _defineProperty(_assertThisInitialized(_this), "isEnded", function () {
      return _this.state === 'ended';
    });

    _handleEvent.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(event, resource) {
        if (event === 'session' && resource.id === _this.id) {
          _this[_protected.default].updateResource(resource);
        }
      }
    });

    _getSocketToken.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        return _classPrivateFieldGet(_assertThisInitialized(_this), _field).call(_assertThisInitialized(_this), 'control_token');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "subscribe", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_classPrivateFieldGet(_assertThisInitialized(_this), _sockets)) {
                _context2.next = 6;
                break;
              }

              _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).subscribe(_classPrivateFieldGet(_assertThisInitialized(_this), _getSocketToken));

              _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).off('event', _classPrivateFieldGet(_assertThisInitialized(_this), _handleEvent));

              _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).on('event', _classPrivateFieldGet(_assertThisInitialized(_this), _handleEvent));

              _context2.next = 7;
              break;

            case 6:
              throw new Error('cannot subscribe to session without authorization');

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "unsubscribe", function () {
      if (_classPrivateFieldGet(_assertThisInitialized(_this), _sockets)) {
        _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).unsubscribe(_classPrivateFieldGet(_assertThisInitialized(_this), _getSocketToken));

        _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).off('event', _classPrivateFieldGet(_assertThisInitialized(_this), _handleEvent));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toJSON", function () {
      return {
        id: _this.id,
        device: _this.device,
        custom_data: _this.custom_data,
        agent: _this.agent,
        created: _this.created,
        updated: _this.updated,
        activated: _this.activated,
        ended: _this.ended,
        full_device: _this.full_device,
        remote_control: _this.remote_control,
        state: _this.state,
        recorded: _this.recorded
      };
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _sockets, sockets);

    debug('constructed Session'); // detect ended events and forward them on as their own event

    var superUpdateResource = _this[_protected.default].updateResource;

    _this[_protected.default].updateResource = function (state) {
      var wasEnded = _this.isEnded();

      superUpdateResource(state);

      if (_this.isEnded() && !wasEnded) {
        _this.emit('ended', _assertThisInitialized(_this));

        _this.unsubscribe();
      }
    };

    return _this;
  }

  _createClass(Session, [{
    key: "code",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'code');
    }
  }, {
    key: "state",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'state');
    }
  }, {
    key: "recorded",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'recorded');
    }
  }, {
    key: "agent",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'agent') || false;
    } // eslint-disable-next-line

  }, {
    key: "custom_data",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'custom_data');
    }
  }, {
    key: "device",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'device');
    }
  }, {
    key: "created",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'updated') ? new Date(_classPrivateFieldGet(this, _field).call(this, 'created')) : null;
    }
  }, {
    key: "updated",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'updated') ? new Date(_classPrivateFieldGet(this, _field).call(this, 'updated')) : null;
    }
  }, {
    key: "activated",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'activated') ? new Date(_classPrivateFieldGet(this, _field).call(this, 'activated')) : null;
    }
  }, {
    key: "ended",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'ended') ? new Date(_classPrivateFieldGet(this, _field).call(this, 'ended')) : null;
    } // eslint-disable-next-line

  }, {
    key: "full_device",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'full_device');
    } // eslint-disable-next-line

  }, {
    key: "remote_control",
    get: function get() {
      return _classPrivateFieldGet(this, _field).call(this, 'remote_control');
    }
  }], [{
    key: "url",
    value: function url() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return "/api/1/sessions/".concat(state.id || '');
    }
  }]);

  return Session;
}(_RESTResource2.default);

exports.default = Session;