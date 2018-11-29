"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeDeep = require("./util/mergeDeep");

var _lineChartDefault = _interopRequireDefault(require("./option/lineChartDefault"));

var _Palette = require("../Palette");

var _core = require("../core");

var _drawBorder = require("./helper/drawBorder");

var _drawTick = require("./helper/drawTick");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WChart = function WChart(_bindId, _colorId, _options) {
  var _this = this;

  _classCallCheck(this, WChart);

  _defineProperty(this, "wGetBoundingClientRect", function (element) {
    if (_this.bcRect === null || typeof _this.bcRect === 'undefined') {
      _this.bcRect = element.getBoundingClientRect();
    }

    return _this.bcRect;
  });

  _defineProperty(this, "overrideClientRect", function () {
    _this.bcRect = _this.canvas.getBoundingClientRect();
    return _this.bcRect;
  });

  _defineProperty(this, "wGetScreenRatio", function () {
    if (_this.ratio === null || typeof _this.ratio === 'undefined') {
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

  _defineProperty(this, "init", function (bindId, colorId) {
    _this.chartId = bindId;
    _this.canvas = document.getElementById(bindId);
    _this.ctx = _this.canvas.getContext("2d");
    _this.data = new _core.LinkedMap();
    _this.palette = new _Palette.Palette(colorId);
    _this.chartAttr = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    _this.dots = [];
    _this.tooltipOn = false;
  });

  _defineProperty(this, "initOptions", function (options) {
    _this.config = (0, _mergeDeep.mergeDeep)(_lineChartDefault.default, options);
    _this.startTime = _this.config.xAxis.startTime;
    _this.endTime = _this.config.xAxis.endTime;
  });

  _defineProperty(this, "initCanvas", function () {
    _this.wGetBoundingClientRect(_this.canvas);

    _this.wGetScreenRatio();

    var width = _this.bcRect.width;
    var height = _this.bcRect.height;
    _this.canvas.width = width * _this.ratio;
    _this.canvas.height = height * _this.ratio;
    _this.canvas.style.width = width + "px";
    _this.canvas.style.height = height + "px";

    _this.ctx.scale(_this.ratio, _this.ratio);
  });

  _defineProperty(this, "initUtils", function () {
    _this.heapSort = new _core.HeapSort();
  });

  _defineProperty(this, "drawPreBackground", function () {
    _this._drawBackground();

    _this._drawPlot();
  });

  _defineProperty(this, "drawPostBackground", function () {
    _this._drawAxis();

    _this._drawLabel();
  });

  _defineProperty(this, "_drawBackground", function () {
    var that = _this;
    var ctx = _this.ctx;
    var width = _this.bcRect.width;
    var height = _this.bcRect.height;
    var plots = _this.plots;
    ctx.clearRect(0, 0, width, height);
    ctx.font = "8px Verdana";
    ctx.save();

    var yAxisMax = _this.config.yAxis.tickFormat(_this.config.yAxis.maxValue);

    _this.chartAttr.x = parseInt(ctx.measureText(yAxisMax).width) + 5;
    _this.chartAttr.y = 5;
    _this.chartAttr.w = width - _this.chartAttr.x;
    _this.chartAttr.h = height - _this.chartAttr.y - 20;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, width, height); // ctx.fillStyle = "rgb(50,100,100)";
    // ctx.fillRect(this.chartAttr.x, this.chartAttr.y, this.chartAttr.w, this.chartAttr.h);
  });

  _defineProperty(this, "_drawPlot", function () {
    var that = _this;
    var ctx = _this.ctx;
    var width = _this.bcRect.width;
    var height = _this.bcRect.height;
    var config = _this.config;
    var startTime = _this.startTime;
    var endTime = _this.endTime;
    var chartAttr = _this.chartAttr;
    var x = chartAttr.x,
        y = chartAttr.y,
        w = chartAttr.w,
        h = chartAttr.h;
    var _config$xAxis = config.xAxis,
        interval = _config$xAxis.interval,
        maxPlot = _config$xAxis.maxPlot,
        xPlotLine = _config$xAxis.plotLine,
        xAxisLine = _config$xAxis.axisLine;
    var _config$yAxis = config.yAxis,
        maxValue = _config$yAxis.maxValue,
        minValue = _config$yAxis.minValue,
        yPlotLine = _config$yAxis.plotLine,
        yAxisLine = _config$yAxis.axisLine;
    var xOptions = {
      format: "HH:mm:ss",
      minOffset: 3,
      chartAttr: chartAttr,
      startTime: startTime,
      endTime: endTime,
      xPlotLine: xPlotLine,
      xAxisLine: xAxisLine
    };
    var yOptions = {
      chartAttr: chartAttr,
      maxValue: maxValue,
      minValue: minValue,
      yPlotLine: yPlotLine,
      yAxisLine: yAxisLine,
      plots: config.yAxis.plots
      /**
       * Plot gridline
       */

    };
    if (config.xAxis.plotLine.display) (0, _drawBorder.drawXplot)(ctx, xOptions);
    if (config.yAxis.plotLine.display) (0, _drawBorder.drawYplot)(ctx, yOptions);
  });

  _defineProperty(this, "_drawAxis", function () {
    var that = _this;
    var ctx = _this.ctx;
    var width = _this.bcRect.width;
    var height = _this.bcRect.height;
    var config = _this.config;
    var startTime = _this.startTime;
    var endTime = _this.endTime;
    var chartAttr = _this.chartAttr;
    var x = chartAttr.x,
        y = chartAttr.y,
        w = chartAttr.w,
        h = chartAttr.h;
    var _config$xAxis2 = config.xAxis,
        interval = _config$xAxis2.interval,
        maxPlot = _config$xAxis2.maxPlot,
        xPlotLine = _config$xAxis2.plotLine,
        xAxisLine = _config$xAxis2.axisLine;
    var _config$yAxis2 = config.yAxis,
        maxValue = _config$yAxis2.maxValue,
        minValue = _config$yAxis2.minValue,
        yPlotLine = _config$yAxis2.plotLine,
        yAxisLine = _config$yAxis2.axisLine;
    var xOptions = {
      format: "HH:mm:ss",
      minOffset: 3,
      chartAttr: chartAttr,
      startTime: startTime,
      endTime: endTime,
      xPlotLine: xPlotLine,
      xAxisLine: xAxisLine
    };
    var yOptions = {
      chartAttr: chartAttr,
      maxValue: maxValue,
      minValue: minValue,
      yPlotLine: yPlotLine,
      yAxisLine: yAxisLine,
      plots: config.yAxis.plots
      /**
       * Plot gridline
       */

    };
    if (config.xAxis.plotLine.display) (0, _drawBorder.drawXplot)(ctx, xOptions);
    if (config.yAxis.plotLine.display) (0, _drawBorder.drawYplot)(ctx, yOptions);
    /**
     * Tick labels: xAxis & yAxis
     */

    if (config.xAxis.tick.display) (0, _drawTick.drawXtick)(ctx, xOptions);
    if (config.yAxis.tick.display) (0, _drawTick.drawYtick)(ctx, yOptions);
    /**
     * Outer gridline & Tick labels
     */

    if (config.xAxis.axisLine.display) (0, _drawBorder.drawXaxis)(ctx, xOptions);
    if (config.yAxis.axisLine.display) (0, _drawBorder.drawYaxis)(ctx, yOptions);
  });

  _defineProperty(this, "_drawLabel", function () {
    if (typeof _this.tooltip === 'undefined') {
      _this.tooltip = document.createElement('div');
      document.body.appendChild(_this.tooltip);
    }
  });

  _defineProperty(this, "resizeCanvas", function (element) {
    _this.bcRect = _objectSpread({}, _this.bcRect, {
      width: element.clientWidth - 10,
      height: element.clientHeight
    });

    _this.setDpiSupport();
  });

  _defineProperty(this, "setDpiSupport", function () {
    var canvas = _this.canvas;
    var ratio = _this.ratio;
    var ctx = _this.ctx;
    var _this$bcRect = _this.bcRect,
        width = _this$bcRect.width,
        height = _this$bcRect.height;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  });

  this.init(_bindId, _colorId);
  this.initOptions(_options);
  this.initCanvas();
  this.initUtils();
};

exports.default = WChart;