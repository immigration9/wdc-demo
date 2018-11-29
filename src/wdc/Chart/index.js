"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LineChart", {
  enumerable: true,
  get: function get() {
    return _LineChart.default;
  }
});
Object.defineProperty(exports, "ChartMediator", {
  enumerable: true,
  get: function get() {
    return _ChartMediator.default;
  }
});
Object.defineProperty(exports, "PublicLegend", {
  enumerable: true,
  get: function get() {
    return _PublicLegend.default;
  }
});
exports.ChartCollection = void 0;

var _LineChart = _interopRequireDefault(require("./LineChart"));

var _ChartMediator = _interopRequireDefault(require("./mediator/ChartMediator"));

var _PublicLegend = _interopRequireDefault(require("./legend/PublicLegend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartCollection = {
  "LineChart": _LineChart.default
};
exports.ChartCollection = ChartCollection;