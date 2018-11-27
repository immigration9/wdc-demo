"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
  isClone: false,
  item: ''
};

var QuickSort =
/*#__PURE__*/
function () {
  function QuickSort() {
    _classCallCheck(this, QuickSort);
  }

  _createClass(QuickSort, [{
    key: "sort",
    value: function sort(array, options) {
      if (!Array.isArray(array)) throw new Error("Must provide valid array");

      if (options) {
        options = Object.assign({}, defaultOptions, options);
      }

      if (options.isClone) {
        array = _toConsumableArray(array);
      }

      var end = array.length - 1;
      this.qs(array, 0, end, options.item);
      return array;
    }
  }, {
    key: "qs",
    value: function qs(array, low, high, item) {
      if (low >= high) return;
      var mid = parseInt(low + (high - low) / 2);
      var pivot = array[mid];

      if (item.length !== 0) {
        pivot = pivot[item];
      }

      var i = low;
      var j = high;

      while (i < j) {
        var low_array = array[i];
        var high_array = array[j];
        var compare_value = false;

        if (item.length !== 0) {
          low_array = low_array[item];
          high_array = high_array[item];
          compare_value = true;
        }

        while (low_array < pivot) {
          i += 1;
          low_array = array[i];
          if (compare_value) low_array = low_array[item];
        }

        while (high_array > pivot) {
          j -= 1;
          high_array = array[j];
          if (compare_value) high_array = high_array[item];
        }

        if (i <= j) {
          var swap = array[i];
          array[i] = array[j];
          array[j] = swap;
          i += 1;
          j -= 1;
        }
      }

      if (low < j) this.qs(array, low, j, item);
      if (high > i) this.qs(array, i, high, item);
    }
  }]);

  return QuickSort;
}();

exports.default = QuickSort;