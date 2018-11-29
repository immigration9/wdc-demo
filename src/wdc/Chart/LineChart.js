"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _WChart2 = _interopRequireDefault(require("./WChart"));

var _mouseEvt = require("./helper/mouseEvt");

var _drawTooltip = require("./helper/drawTooltip");

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

var LineChart =
/*#__PURE__*/
function (_WChart) {
  _inherits(LineChart, _WChart);

  function LineChart(bindId, colorId, options) {
    var _this;

    _classCallCheck(this, LineChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LineChart).call(this, bindId, colorId, options));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "notifyMediator", function (action, arg) {
      if (typeof _this.mediator[action] !== 'undefined') {
        _this.mediator[action](arg);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initListener", function () {
      _this.canvas.addEventListener('mousemove', _this.handleMouseMove);

      _this.canvas.addEventListener('click', _this.handleMouseClick);

      _this.canvas.addEventListener('mouseout', _this.handleMouseOut);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseMove", function (evt) {
      var that = _assertThisInitialized(_assertThisInitialized(_this));

      var ctx = _this.ctx;
      var mousePos = (0, _mouseEvt.getMousePos)(_this.overrideClientRect(), evt);
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
          var colorLabel = (0, _drawTooltip.drawTooltipCircle)(ttl.color);
          var tooltip = "<span>".concat(colorLabel, " ").concat(ttl.oname, ": ").concat(ttl.value.toFixed(1), "<br/></span>");

          if (idx === 0) {
            var timestamp = "<span>".concat(_moment.default.unix(ttl.time / 1000), "</span><br/>");
            return timestamp + tooltip;
          }

          return tooltip;
        });
        _this.tooltip.style.cssText = (0, _drawTooltip.createStyle)(mx, my);
        _this.tooltip.innerHTML = "";
        list.map(function (ttl, idx) {
          that.tooltip.innerHTML += ttl;
        });
        _this.tooltipOn = true;
      } else {
        _this.tooltip.style.cssText = (0, _drawTooltip.styleHidden)();
      } // notifyMediator("moved", data);

    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseClick", function (evt) {
      var mousePos = (0, _mouseEvt.getMousePos)(_this.overrideClientRect(), evt);
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseOut", function (evt) {
      _this.tooltip.style.cssText = (0, _drawTooltip.styleHidden)();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "drawSelected", function (dot) {
      _this.focused = dot;

      _this.drawChart();
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

        that.heapSort.sort(ds.data, false, 0);
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
      console.log(dataset);
      if (!dataset) return;

      var that = _assertThisInitialized(_assertThisInitialized(_this));

      var maxPlot = _this.config.xAxis.maxPlot;
      dataset.map(function (ds, idx) {
        if (that.data.containsKey(ds.oid)) {
          var cData = that.data.get(ds.oid);
          ds.data.map(function (datum) {
            cData.data.push(datum);
          });
          that.heapSort.sort(cData.data, false, 0);
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
      _this.drawPreBackground();

      _this._drawData();

      _this.drawPostBackground();
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

    _this.initListener();

    _this.focused = undefined;
    _this.mediator = _ChartMediator.default;
    return _this;
  }

  return LineChart;
}(_WChart2.default);

var _default = LineChart;
exports.default = _default;