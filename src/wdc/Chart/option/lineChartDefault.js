"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var UNIX_TIMESTAMP = 1000;
var MINUTE_IN_SECONDS = 60;
var defaultOptions = {
  xAxis: {
    maxPlot: 60,
    interval: 60,
    axisLine: {
      display: true,
      color: '#000000'
    },
    plotLine: {
      display: true,
      color: '#d9e2eb'
    },
    tick: {
      display: true,
      color: '#000000'
    },
    isFixed: false,
    startTime: new Date().getTime() - UNIX_TIMESTAMP * MINUTE_IN_SECONDS * 10,
    endTime: new Date().getTime()
  },
  yAxis: {
    tickFormat: function tickFormat(d) {
      return d;
    },
    plots: 4,
    maxValue: 100,
    minValue: 0,
    axisLine: {
      display: true,
      color: '#000000'
    },
    plotLine: {
      display: true,
      color: '#d9e2eb'
    },
    tick: {
      display: true,
      color: '#000000'
    }
  },
  common: {
    disconnectThreshold: 20 * UNIX_TIMESTAMP
  }
};
var _default = defaultOptions;
exports.default = _default;