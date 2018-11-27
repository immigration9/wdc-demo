"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

var _this2 = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PaletteColor = function PaletteColor(id, _rgb, _oid, _nextColor) {
  var _this = this;

  _classCallCheck(this, PaletteColor);

  _defineProperty(this, "setThisColor", function (rgb) {
    _this.rgb = rgb;
  });

  _defineProperty(this, "setNextColor", function (oid) {
    var minIndex = _core.CoreFunc.getMinValueIndexFromArray(_this.rgb).index;

    var newColor = _this.rgb.map(function (el, idx) {
      if (idx === minIndex) return (el + 10) % 256;else return el;
    });

    var nextColor = new PaletteColor(_this.id + 1, newColor, oid);
    _this.nextColor = nextColor;
  });

  _defineProperty(this, "getNextColor", function () {
    return _this.nextColor;
  });

  this.id = id;
  this.oid = _oid || 0;
  this.rgb = _rgb || [0, 0, 0];
  this.nextColor = _nextColor || undefined;
  this.rootHasChild = false;
  this.numOfChildren = 0;
};

exports.default = PaletteColor;

_defineProperty(PaletteColor, "printRgb", function (rgb) {
  return "rgb(".concat(rgb[0], ",").concat(rgb[1], ",").concat(rgb[2], ")");
});

_defineProperty(PaletteColor, "printRgbWithAlpha", function (alpha) {
  if (typeof alpha !== 'number') return;
  return "rgba(".concat(_this2.rgb[0], ",").concat(_this2.rgb[1], ",").concat(_this2.rgb[2], ",").concat(alpha, ")");
});