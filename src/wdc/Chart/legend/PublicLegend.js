"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChartMediator = _interopRequireDefault(require("../mediator/ChartMediator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PublicLegend = function PublicLegend() {
  var _this = this;

  _classCallCheck(this, PublicLegend);

  _defineProperty(this, "notifyMediator", function (action, arg) {
    if (typeof _this.mediator[action] !== 'undefined') {
      _this.mediator[action](arg);
    }
  });

  _defineProperty(this, "loadData", function (dataset) {
    var length = dataset.length;

    var _loop = function _loop(i) {
      var data = dataset[i];

      var exists = _this.dataset.find(function (ds) {
        return ds.oid === data.oid;
      });

      if (typeof exists === 'undefined') {
        _this.dataset.push({
          oid: data.oid,
          oname: data.oname,
          focus: true
        });
      }
    };

    for (var i = 0; i < length; i++) {
      _loop(i);
    }
  });

  _defineProperty(this, "updateData", function (dataset) {
    var length = dataset.length;

    var _loop2 = function _loop2(i) {
      var data = dataset[i];

      var exists = _this.dataset.find(function (ds) {
        return ds.oid === data.oid;
      });

      if (typeof exists === 'undefined') {
        _this.dataset.push({
          oid: data.oid,
          oname: data.oname,
          focus: true
        });
      }
    };

    for (var i = 0; i < length; i++) {
      _loop2(i);
    }
  });

  _defineProperty(this, "handleClick", function (oid) {
    var data = _this.dataset.find(function (ds) {
      return ds.oid === oid;
    });

    _this.notifyMediator('clicked', data);
  });

  this.mediator = _ChartMediator.default;
  this.dataset = [];
};

var _default = PublicLegend;
exports.default = _default;