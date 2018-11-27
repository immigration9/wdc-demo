"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LinkedEntry = function LinkedEntry(key, _value, next) {
  var _this = this;

  _classCallCheck(this, LinkedEntry);

  _defineProperty(this, "getKey", function () {
    return _this.key;
  });

  _defineProperty(this, "getValue", function () {
    return _this.value;
  });

  _defineProperty(this, "setValue", function (value) {
    var oldValue = _this.value;
    _this.value = value;
    return oldValue;
  });

  _defineProperty(this, "toString", function () {
    return _this.key + "=" + _this.value;
  });

  this.key = key;
  this.value = _value;
  this.next = next;
  this.link_next = null;
  this.link_prev = null;
};

var _default = LinkedEntry;
exports.default = _default;