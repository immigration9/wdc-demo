"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Chart = require("../Chart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// ChartWrapper.propTypes = {
//   id: PropTypes.number.isRequired,
//   type: PropTypes.oneOf(['LineChart']),
//   showLegend: PropTypes.bool,
// }
// ChartWrapper.defaultProps = {
//   type: 'LineChart',
//   showLegend: false
// }
function objectCompare(object1, object2) {
  // Return if value is not an object
  if (_typeof(object1) !== 'object' || _typeof(object2) !== 'object') return;
  return JSON.stringify(object1) === JSON.stringify(object2);
}

var ChartWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits(ChartWrapper, _Component);

  function ChartWrapper(props) {
    var _this;

    _classCallCheck(this, ChartWrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChartWrapper).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resizeCanvas", function () {
      _this.chart.resizeCanvas(_this.mainDiv);

      _this.chart.drawChart();
    });

    _this.setDiv = function (element) {
      _this.mainDiv = element;
    };

    return _this;
  }

  _createClass(ChartWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var that = this;
      var _this$props = this.props,
          type = _this$props.type,
          id = _this$props.id,
          colorId = _this$props.colorId,
          mediator = _this$props.mediator;
      this.chart = new _Chart.ChartCollection[type](id, colorId);

      if (mediator) {
        console.log(mediator);
        mediator.subscribe(this.chart);
      }

      if (this.props.data) {
        this.chart.loadData(this.props.data);
      }

      window.addEventListener("resize", that.resizeCanvas, false);
      this.resizeCanvas();
      this.chart.drawChart();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (typeof nextProps.data !== 'undefined' && !objectCompare(this.props.data, nextProps.data)) {
        console.log("으잉?");
        this.chart.loadData(nextProps.data);
      }

      if (typeof nextProps.updateData !== 'undefined' && nextProps.updateData.length > 0 && !objectCompare(this.props.updateData, nextProps.updateData)) {
        console.log(nextProps.updateData);
        this.chart.updateData(nextProps.updateData);
      }
    } // shouldComponentUpdate(nextProps) {
    // }

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          showLegend = _this$props2.showLegend;
      return _react.default.createElement("div", {
        ref: this.setDiv,
        style: {
          width: '100%'
        }
      }, _react.default.createElement("canvas", {
        id: id
      }), showLegend ? _react.default.createElement("div", null, "Hello, World!") : undefined);
    }
  }]);

  return ChartWrapper;
}(_react.Component);

var _default = ChartWrapper;
exports.default = _default;