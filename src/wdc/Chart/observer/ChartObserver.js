"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _WChart = _interopRequireDefault(require("../WChart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChartObserver =
/*#__PURE__*/
function () {
  function ChartObserver() {
    _classCallCheck(this, ChartObserver);

    this.subscribers = [];
  }

  _createClass(ChartObserver, [{
    key: "subscribe",
    value: function subscribe(chart) {
      if (chart instanceof _WChart.default) {
        this.subscribers.push(chart);
      }
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(id) {
      this.subscribers.filter(function (chart) {
        return chart.chartId !== id;
      });
    }
  }, {
    key: "notify",
    value: function notify(fn) {
      if (typeof fn === 'function') {
        this.subscribers.forEach(function (subscriber) {
          subscriber[fn]();
        });
      } else {
        throw new Error("You must provide a valid function to execute");
      }
    }
  }]);

  return ChartObserver;
}();

var _default = ChartObserver;
exports.default = _default;