"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _WChart = _interopRequireDefault(require("../WChart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChartMediator = function ChartMediator() {
  var _this = this;

  _classCallCheck(this, ChartMediator);

  _defineProperty(this, "subscribe", function (chart) {
    if (chart instanceof _WChart.default) {
      _this.charts.push(chart);

      console.log("subscribed");
    } else {
      throw new Error("Please provide an instance of WChart");
    }
  });

  _defineProperty(this, "unsubscribe", function (chart) {
    var charts = _this.charts;
    var length = charts.length;

    for (var i = 0; i < length; i++) {
      if (charts[i] === chart) {
        charts.splice(i, 1);
      }
    }
  });

  _defineProperty(this, "unsubscribeAll", function () {
    _this.charts = [];
  });

  _defineProperty(this, "clicked", function (data) {
    var charts = _this.charts;
    var length = charts.length;

    for (var i = 0; i < length; i++) {
      charts[i].drawSelected(data);
    }
  });

  if (this.instance) {
    return this.instance;
  }

  this.hash = Math.random() * 1000;
  this.instance = this;
  this.charts = [];
};

var instance = new ChartMediator();
Object.freeze(instance);
var _default = instance;
exports.default = _default;