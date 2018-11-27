"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HeapSort", {
  enumerable: true,
  get: function get() {
    return _HeapSort.default;
  }
});
Object.defineProperty(exports, "QuickSort", {
  enumerable: true,
  get: function get() {
    return _QuickSort.default;
  }
});
Object.defineProperty(exports, "LinkedMap", {
  enumerable: true,
  get: function get() {
    return _LinkedMap.default;
  }
});
exports.LSHandler = exports.CoreFunc = void 0;

var _HeapSort = _interopRequireDefault(require("./HeapSort"));

var _QuickSort = _interopRequireDefault(require("./QuickSort"));

var CoreFunc = _interopRequireWildcard(require("./core"));

exports.CoreFunc = CoreFunc;

var LSHandler = _interopRequireWildcard(require("./LocalStorageHandler"));

exports.LSHandler = LSHandler;

var _LinkedMap = _interopRequireDefault(require("./LinkedMap/LinkedMap"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }