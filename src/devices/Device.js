"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var debug = (0, _debug.default)('cbio.Device');

var _sockets = new WeakMap();

var _presence = new WeakMap();

var _field = new WeakMap();

var _handleEvent = new WeakMap();

var _getSocketToken = new WeakMap();

var _syncPresence = new WeakMap();

var Device = /*#__PURE__*/function (_RESTResource) {
  _inherits(Device, _RESTResource);

  var _super = _createSuper(Device);

  function Device(api, sockets) {
    var _this;

    var _resource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Device);

    _this = _super.call(this, api, _resource);

    _sockets.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _presence.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _field.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(key) {
        return _this[_protected.default].field(key);
      }
    });

    _handleEvent.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value(event, resource) {
        if (event === 'device' && resource.id === _this.id) {
          _this[_protected.default].updateResource(resource);
        }

        if (event === 'presence' && resource.id === _this.id) {
          _classPrivateFieldSet(_assertThisInitialized(_this), _presence, resource);

          _this.emit('updated', _assertThisInitialized(_this));
        }
      }
    });

    _getSocketToken.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        return _classPrivateFieldGet(_assertThisInitialized(_this), _field).call(_assertThisInitialized(_this), 'notification_token');
      }
    });

    _syncPresence.set(_assertThisInitialized(_this), {
      writable: true,
      value: function value() {
        _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).send('sync-presence', _this.id);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "subscribe", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).subscribe(_classPrivateFieldGet(_assertThisInitialized(_this), _getSocketToken));

              _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).off('event', _classPrivateFieldGet(_assertThisInitialized(_this), _handleEvent));

              _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).on('event', _classPrivateFieldGet(_assertThisInitialized(_this), _handleEvent)); // sync presence state, and every time the socket opens


              _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).off('open', _classPrivateFieldGet(_assertThisInitialized(_this), _syncPresence));

              _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).on('open', _classPrivateFieldGet(_assertThisInitialized(_this), _syncPresence));

              _classPrivateFieldGet(_assertThisInitialized(_this), _syncPresence).call(_assertThisInitialized(_this));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "unsubscribe", function () {
      _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).unsubscribe(_classPrivateFieldGet(_assertThisInitialized(_this), _getSocketToken));

      _classPrivateFieldGet(_assertThisInitialized(_this), _sockets).off('event', _classPrivateFieldGet(_assertThisInitialized(_this), _handleEvent));
    });

    _defineProperty(_assertThisInitialized(_this), "toJSON", function () {
      return {
        id: _this.id,
        device: _this.device,
        custom_data: _this.custom_data,
        connectable: _this.connectable,
        online: _this.online,
        last_active: _this.last_active
      };
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _sockets, sockets);

    debug('constructed Device');
    return _this;
  }

  _createClass(Device, [{
    key: "last_active",
    // eslint-disable-next-line
    get: function get() {
      var lastSeen = new Date(_classPrivateFieldGet(this, _presence) && _classPrivateFieldGet(this, _presence).last_seen || 0).getTime();
      var lastActive = new Date(_classPrivateFieldGet(this, _field).call(this, 'last_active')).getTime();
      return new Date(Math.max(lastSeen, lastActive));
    }
  }, {
    key: "online",
    get: function get() {
      return !!(_classPrivateFieldGet(this, _presence) && _classPrivateFieldGet(this, _presence).present);
    }
  }, {
    key: "connectable",
    get: function get() {
      // some devices are never connectable (e.g. if account settings disallow)
      if (!_classPrivateFieldGet(this, _field).call(this, 'connectable')) return false; // for devices should have a socket connection, check the presence state

      if (_classPrivateFieldGet(this, _getSocketToken).call(this)) return this.online; // otherwise we'll assume they're connectable via native push

      return true;
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
  }], [{
    key: "url",
    value: function url() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return "/api/1/devices/".concat(state.id || '');
    }
  }]);

  return Device;
}(_RESTResource2.default);

exports.default = Device;