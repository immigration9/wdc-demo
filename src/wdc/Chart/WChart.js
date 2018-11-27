"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WChart = function WChart() {
  var _this = this;

  _classCallCheck(this, WChart);

  _defineProperty(this, "wGetBoundingClientRect", function (element) {
    if (_this.bcRect === null) {
      _this.bcRect = element.getBoundingClientRect();
    }

    return _this.bcRect;
  });

  _defineProperty(this, "wGetScreenRatio", function () {
    if (_this.ratio === null) {
      _this.ratio = window.devicePixelRatio;
    }

    if (_this.ratio < 2) {
      _this.ratio = 2;
    }
  });

  _defineProperty(this, "clearClientRect", function () {
    _this.bcRect = null;
  });

  _defineProperty(this, "clearScreenRatio", function () {
    _this.ratio = null;
  });

  this.bcRect = null;
  this.ratio = null;
};

exports.default = WChart;