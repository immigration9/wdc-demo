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

/**
 * HeapSort used for various purposes within the components
 * @copyright WhaTap Labs @ 2018.11.07
 * @author immigration9
 */
var HeapSort =
/*#__PURE__*/
function () {
  function HeapSort() {
    _classCallCheck(this, HeapSort);
  }

  _createClass(HeapSort, [{
    key: "sort",

    /**
     * Sorting method. When passing an array with object as its element, be sure to pass `item` string to let the algorithm know which element to reference.
     * if `isClone` is set to true, this method will return a new array, thus not mutating the original.
     * @param {Array} array 
     * @param {Boolean} isClone 
     * @param {String} item 
     */
    value: function sort(array, isClone, item) {
      if (!Array.isArray(array)) throw new Error("Must provide valid array");

      if (isClone) {
        array = _toConsumableArray(array);
      }

      var n = array.length;
      var start = parseInt(n / 2 - 1);

      for (var i = start; i >= 0; i--) {
        this.heapify(array, n, i, item);
      }

      for (var j = n - 1; j >= 0; j--) {
        var temp = array[0];
        array[0] = array[j];
        array[j] = temp;
        this.heapify(array, j, 0, item);
      }

      return array;
    }
    /**
     * @private
     * @param {Array} arr 
     * @param {Number} n 
     * @param {Number} i 
     * @param {String} item 
     */

  }, {
    key: "heapify",
    value: function heapify(arr, n, i, item) {
      var largest = i;
      var left = 2 * i + 1;
      var right = 2 * i + 2;

      if (item) {
        var leftItem = arr[left];
        var rightItem = arr[right];
        var largestItem = arr[largest];

        if (left < n && leftItem[item] > largestItem[item]) {
          largest = left;
          largestItem = arr[largest];
        }

        if (right < n && rightItem[item] > largestItem[item]) {
          largest = right;
        }
      } else {
        if (left < n && arr[left] > arr[largest]) {
          largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
          largest = right;
        }
      }

      if (largest !== i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        this.heapify(arr, n, largest, item);
      }
    }
  }]);

  return HeapSort;
}();

exports.default = HeapSort;