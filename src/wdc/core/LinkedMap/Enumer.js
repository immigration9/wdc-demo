"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TYPE = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TYPE = {
  KEYS: 0,
  VALUES: 1,
  ENTRIES: 2
};
exports.TYPE = TYPE;

var Enumer = function Enumer(map, type) {
  var _this = this;

  _classCallCheck(this, Enumer);

  _defineProperty(this, "hasMoreElements", function () {
    return _this.map.header !== _this.entry && _this.entry !== null;
  });

  _defineProperty(this, "nextElement", function () {
    if (_this.hasMoreElements()) {
      var e = _this.lastEnt = _this.entry;
      _this.entry = e.link_next;

      switch (_this.type) {
        case TYPE.KEYS:
          return e.key;

        case TYPE.VALUES:
          return e.value;

        default:
          return e;
      }
    }

    throw new Error("No more next value");
  });

  this.map = map;
  this.entry = map.header.link_next;
  this.lastEnt = null;
  this.type = type;
};

var _default = Enumer;
exports.default = _default;