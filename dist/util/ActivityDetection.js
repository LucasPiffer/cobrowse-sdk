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

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

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

var debug = require('debug')('cbio.ActivityDetection');

var _started = new WeakMap();

var _active = new WeakMap();

var _activeTimeout = new WeakMap();

var _inactiveTime = new WeakMap();

var _onActivity = new WeakMap();

var _makeActive = new WeakMap();

var _makeInactive = new WeakMap();

var ActivityDetection = /*#__PURE__*/function (_EventEmitter) {
  _inherits(ActivityDetection, _EventEmitter);

  var _super = _createSuper(ActivityDetection);

  function ActivityDetection() {
    var _this;

    _classCallCheck(this, ActivityDetection);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _started.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _active.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _activeTimeout.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    _inactiveTime.set(_assertThisInitialized(_this), {
      writable: true,
      value: 15 * 60 * 1000
    });

    _defineProperty(_assertThisInitialized(_this), "start", function () {
      if (_classPrivateFieldGet(_assertThisInitialized(_this), _started)) return;

      _classPrivateFieldSet(_assertThisInitialized(_this), _started, true);

      debug('started');
      document.addEventListener('mouseenter', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.addEventListener('mouseleave', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.addEventListener('mousemove', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.addEventListener('touchstart', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.addEventListener('touchend', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.addEventListener('touchmove', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.addEventListener('visibilitychange', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true
      }); // page load counts as possible activity

      _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity).call(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      _classPrivateFieldSet(_assertThisInitialized(_this), _active, false);

      _classPrivateFieldSet(_assertThisInitialized(_this), _started, false);

      debug('stopped');
      clearTimeout(_classPrivateFieldGet(_assertThisInitialized(_this), _activeTimeout));

      _this.removeAllListeners();

      document.removeEventListener('mouseenter', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.removeEventListener('mouseleave', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.removeEventListener('mousemove', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.removeEventListener('touchstart', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.removeEventListener('touchend', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.removeEventListener('touchmove', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true,
        passive: true
      });
      document.removeEventListener('visibilitychange', _classPrivateFieldGet(_assertThisInitialized(_this), _onActivity), {
        capture: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isActive", function () {
      return _classPrivateFieldGet(_assertThisInitialized(_this), _active);
    });

    _onActivity.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        _classPrivateFieldGet(_assertThisInitialized(_this), _makeActive).call(_assertThisInitialized(_this));

        clearTimeout(_classPrivateFieldGet(_assertThisInitialized(_this), _activeTimeout));

        _classPrivateFieldSet(_assertThisInitialized(_this), _activeTimeout, setTimeout(_classPrivateFieldGet(_assertThisInitialized(_this), _makeInactive), _classPrivateFieldGet(_assertThisInitialized(_this), _inactiveTime)));
      }
    });

    _makeActive.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        // skip if already active
        if (_classPrivateFieldGet(_assertThisInitialized(_this), _active)) return; // or if the browser thinks it's not visible

        if (document.hidden) {
          debug('window is hidden, not becoming active');
          return;
        } // then mark as active and emit event


        _classPrivateFieldSet(_assertThisInitialized(_this), _active, true);

        debug('became active');

        _this.emit('active');
      }
    });

    _makeInactive.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        if (_classPrivateFieldGet(_assertThisInitialized(_this), _active)) {
          _classPrivateFieldSet(_assertThisInitialized(_this), _active, false);

          debug('became inactive');

          _this.emit('inactive');
        }
      }
    });

    return _this;
  }

  return ActivityDetection;
}(_events.EventEmitter);

exports.default = ActivityDetection;