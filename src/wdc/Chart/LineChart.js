"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

var _Palette = require("../Palette");

var _moment = _interopRequireDefault(require("moment"));

var _WChart2 = _interopRequireDefault(require("./WChart"));

var _mouseEvt = require("./helper/mouseEvt");

var _mergeDeep = require("./helper/mergeDeep");

var _drawTick = require("./helper/drawTick");

var _drawBorder = require("./helper/drawBorder");

var _ChartMediator = _interopRequireDefault(require("./mediator/ChartMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function createStyle(mx, my) {
  var innerStyle = {
    'position': 'absolute',
    'float': 'left',
    'left': "".concat(mx + 15, "px"),
    'top': "".concat(my, "px"),
    'z-index': 10000,
    'visibility': 'visible',
    'background-color': '#000000',
    'border-radius': '6px',
    'padding': '3px',
    'color': '#ffffff',
    'font-size': '8px'
  };
  var output = '';

  for (var key in innerStyle) {
    if (innerStyle.hasOwnProperty(key)) {
      output += "".concat(key, ":").concat(innerStyle[key], ";");
    }
  }

  return output;
}

var heapSort = new _core.HeapSort();

var LineChart =
/*#__PURE__*/
function (_WChart) {
  _inherits(LineChart, _WChart);

  function LineChart(_bindId, colorId, _options) {
    var _this;

    _classCallCheck(this, LineChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LineChart).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "notifyMediator", function (action, arg) {
      if (typeof _this.mediator[action] !== 'undefined') {
        _this.mediator[action](arg);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseMove", function (evt) {
      var that = _assertThisInitialized(_assertThisInitialized(_this));

      var ctx = _this.ctx;
      var mousePos = (0, _mouseEvt.getMousePos)(_this.wGetBoundingClientRect(), evt);
      var mx = mousePos.mx,
          my = mousePos.my;
      var posX = evt.clientX;
      var posY = evt.clientY;

      if (_this.tooltipOn) {
        _this.drawChart();
      }

      _this.tooltipOn = false;
      var tooltipList = [];

      for (var i = 0; i < _this.dots.length; i++) {
        var dot = _this.dots[i];

        if (dot.x > mx - dot.offset && dot.x < mx + dot.offset) {
          tooltipList.push(dot);
        }
      }

      if (tooltipList.length !== 0) {
        var list = tooltipList.map(function (ttl, idx) {
          var colorLabel = drawTooltipCircle(ttl.color, style);
          var tooltip = "<span>".concat(colorLabel, " ").concat(ttl.oname, ": ").concat(ttl.value.toFixed(1), "<br/></span>");

          if (idx === 0) {
            var timestamp = "<span>".concat(_moment.default.unix(ttl.time / 1000), "</span><br/>");
            return timestamp + tooltip;
          }

          return tooltip;
        });
        _this.tooltip.style.cssText = createStyle(posX, posY);
        _this.tooltip.innerHTML = "";
        list.map(function (ttl, idx) {
          that.tooltip.innerHTML += ttl;
        });
        _this.tooltipOn = true;
      } else {
        _this.tooltip.style.cssText = "visibility:hidden";
      } // notifyMediator("moved", data);

    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseClick", function (evt) {
      var mousePos = (0, _mouseEvt.getMousePos)(_this.wGetBoundingClientRect(), evt);
      var mx = mousePos.mx,
          my = mousePos.my;
      var max = _this.dots.length;
      var selectedDot;

      for (var i = 0; i < max; i++) {
        var dot = _this.dots[i];

        if (dot.x > mx - dot.offset && dot.x < mx + dot.offset && dot.y > my - dot.offset && dot.y < my + dot.offset) {
          selectedDot = dot;
          break;
        }
      }

      _this.drawSelected(selectedDot);

      _this.notifyMediator("clicked", selectedDot);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "drawSelected", function (dot) {
      _this.focused = dot;

      _this.drawChart();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseOut", function (evt) {
      _this.tooltip.style.cssText = "visibility:hidden";
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "init", function (bindId) {
      _this.chartId = bindId;
      _this.canvas = document.getElementById(bindId);
      _this.ctx = _this.canvas.getContext("2d");
      _this.data = new _core.LinkedMap();
      _this.chartAttr = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };
      _this.dots = [];
      _this.tooltipOn = false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initOptions", function (options) {
      _this.config = (0, _mergeDeep.mergeDeep)(defaultOptions, options);
      _this.startTime = _this.config.xAxis.startTime;
      _this.endTime = _this.config.xAxis.endTime;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initCanvas", function () {
      _this.wGetBoundingClientRect(_this.canvas);

      _this.wGetScreenRatio();

      _this.canvas.addEventListener('mousemove', _this.handleMouseMove);

      _this.canvas.addEventListener('click', _this.handleMouseClick);

      _this.canvas.addEventListener('mouseout', _this.handleMouseOut);

      var width = _this.bcRect.width;
      var height = _this.bcRect.height;
      _this.canvas.width = width * _this.ratio;
      _this.canvas.height = height * _this.ratio;
      _this.canvas.style.width = width + "px";
      _this.canvas.style.height = height + "px";

      _this.ctx.scale(_this.ratio, _this.ratio);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadData", function (dataset) {
      if (!dataset) return;

      var that = _assertThisInitialized(_assertThisInitialized(_this));

      var config = _this.config;
      dataset.map(function (ds, idx) {
        var colorValue = that.palette.getColorFromOid(ds.oid);
        /**
         * Sorts the inner data in ascending order.
         */

        heapSort.sort(ds.data, false, 0);
        that.data.put(ds.oid, {
          oname: ds.oname,
          data: ds.data,
          color: colorValue
        });
        /**
         * Only get the initial start time when the option is set to `isFixed=false`
         */

        if (!config.xAxis.isFixed) {
          that.setTimeStandard(ds.data, idx);
        }
      });

      _this.drawChart();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setTimeStandard", function (data, idx) {
      if (idx === 0) {
        _this.startTime = data[0][0];
        _this.endTime = data[0][0];
      }

      var length = data.length;

      for (var i = 0; i < length; i++) {
        if (_this.startTime > data[i][0]) {
          _this.startTime = data[i][0];
        }

        if (_this.endTime < data[i][0]) {
          _this.endTime = data[i][0];
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateData", function (dataset) {
      if (!dataset) return;

      var that = _assertThisInitialized(_assertThisInitialized(_this));

      var maxPlot = _this.config.xAxis.maxPlot;
      dataset.map(function (ds, idx) {
        if (that.data.containsKey(ds.oid)) {
          var cData = that.data.get(ds.oid);
          ds.data.map(function (datum) {
            cData.data.push(datum);
          });
          heapSort.sort(cData.data, false, 0);
        } else {
          var colorValue = that.palette.getColorFromOid(ds.oid);
          that.data.put(ds.oid, {
            oname: ds.oname,
            data: ds.data,
            color: colorValue
          });
        }
      });

      var en = _this.data.keys();

      var idx = 0;

      for (var _idx = 0; en.hasMoreElements(); _idx++) {
        var key = en.nextElement();

        var value = _this.data.get(key);

        if (value.data.length > maxPlot) {
          var overflow = value.data.length - maxPlot;
          value.data = value.data.slice(overflow);
          that.setTimeStandard(value.data, _idx);
        }
      }

      _this.drawChart();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resetData", function () {
      _this.data.clear();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "drawChart", function () {
      _this._drawBackground();

      _this._drawAxis();

      _this._drawData();

      _this._drawLabel();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_drawBackground", function () {
      var that = _assertThisInitialized(_assertThisInitialized(_this));

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_drawAxis", function () {
      var that = _assertThisInitialized(_assertThisInitialized(_this));

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_drawData", function () {
      var that = _assertThisInitialized(_assertThisInitialized(_this));

      var ctx = _this.ctx;
      var startTime = _this.startTime;
      var endTime = _this.endTime;
      var _this$config$yAxis = _this.config.yAxis,
          minValue = _this$config$yAxis.minValue,
          maxValue = _this$config$yAxis.maxValue;
      var disconnectThreshold = _this.config.common.disconnectThreshold;
      var _this$chartAttr = _this.chartAttr,
          x = _this$chartAttr.x,
          y = _this$chartAttr.y,
          w = _this$chartAttr.w,
          h = _this$chartAttr.h;
      var _dots = [];

      var en = _this.data.keys();

      var _loop = function _loop() {
        var key = en.nextElement();

        var value = _this.data.get(key);

        var prevTimestamp = 0;
        value.data.map(function (datum, idx) {
          if (datum[0] < startTime || datum[0] > endTime) return;
          /**
           * TODO: STARTTIME에 문제가 있음.
           */

          var xPos = (datum[0] - startTime) / (endTime - startTime);
          var xCoord = x + w * xPos;
          var yPos = 1;

          if (datum[1] > minValue) {
            if (datum[1] > maxValue) {
              yPos = 0;
            } else {
              yPos = 1 - (datum[1] - minValue) / (maxValue - minValue);
            }
          }

          var yCoord = y + h * yPos;
          /**
           * plot과 plot을 이어주는 line
           */
          // ctx.save();

          if (idx === 0) {
            ctx.beginPath();
            ctx.strokeStyle = value.color;

            if (_this.focused && _this.focused.oid !== key) {
              ctx.strokeStyle = "rgba(245,245,245,0.5)";
            }

            ctx.moveTo(xCoord, yCoord);
          } else {
            if (datum[0] - prevTimestamp < disconnectThreshold) {
              ctx.lineTo(xCoord, yCoord);
              ctx.stroke();
            } else {
              console.log("testing prevtimestamp");
              console.log(prevTimestamp);
              console.log(datum[0]);
              ctx.closePath();
            }

            ctx.beginPath();
            ctx.moveTo(xCoord, yCoord);
          }

          _dots.push({
            oid: key,
            oname: value.oname,
            color: value.color,
            x: xCoord,
            y: yCoord,
            r: 5,
            offset: 2,
            time: datum[0],
            value: datum[1]
          });

          prevTimestamp = datum[0];
        });
      };

      while (en.hasMoreElements()) {
        _loop();
      }

      _this.dots = _dots;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_drawLabel", function () {
      if (typeof _this.tooltip === 'undefined') {
        _this.tooltip = document.createElement('div');
        document.body.appendChild(_this.tooltip);
      }
    });

    _this.init(_bindId);

    _this.initOptions(_options);

    _this.initCanvas();

    _this.palette = new _Palette.Palette(colorId);
    _this.focused = undefined;
    _this.mediator = _ChartMediator.default;
    return _this;
  }

  return LineChart;
}(_WChart2.default);

var style = 'border: none; display: block; float: left; width: 6px; height: 6x; margin-right: 5px; margin-top: 0px;';

function drawTooltipCircle(color, style) {
  var circle = '<span style="' + style + '"><svg height="8" width="8">';
  circle += '<circle cx="4" cy="4" r="4" fill="' + color + '" />';
  circle += '</svg></span>';
  return circle;
}

var _default = LineChart;
exports.default = _default;