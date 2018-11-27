"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PaletteColor = _interopRequireDefault(require("./PaletteColor"));

var _defaults = require("./defaults");

var _core = require("../core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Palette stores the color information for usages within components.
 * You can save / load palette info within your local storage based on the id.
 */
var Palette =
/**
 * @param {Integer} id: Identifier for each palette
 * @param {Boolean} load: Defaults to `true`, if set to false, palette will not retrieve data from local storage
 * @param {Array} addColor: Additional colors to add to the palette
 */
function Palette(id) {
  var _this = this;

  var load = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var save = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var addColor = arguments.length > 3 ? arguments[3] : undefined;

  _classCallCheck(this, Palette);

  _defineProperty(this, "initList", function () {
    var that = _this;

    _this.paletteSet.map(function (color) {
      that.list.push(new _PaletteColor.default(0, color.rgb));
    });
  });

  _defineProperty(this, "getColorFromOid", function (value) {
    var toString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var cacheLength = _this.cache.length;
    var listLength = _this.list.length;
    /**
     * Search through the List to find if the oid has already been assigned.
     * If so, return that color and return 
     */

    for (var i = 0; i < cacheLength; i++) {
      var cachedColor = _this.cache[i];

      if (cachedColor.oid === value) {
        return _this.returnColor(cachedColor.rgb, toString);
      }
    }

    for (var _i = 0; _i < listLength; _i++) {
      var pColor = _this.list[_i];
      var _currentColor = pColor;

      while (_currentColor) {
        if (_currentColor.oid === value) {
          if (!_this.cache.includes(_currentColor)) {
            _this.cache.push(_currentColor);
          }

          return _this.returnColor(_currentColor.rgb, toString);
        }

        _currentColor = _currentColor.getNextColor();
      }
    }
    /**
     * Colors will loop through the base palette array
     * Return the color which is not taken.
     * If all elements within the array is taken,
     * It will find the color node with the lowest number of children.
     */


    var minChildIdx = 0;

    for (var j = 0; j < listLength; j++) {
      var _pColor = _this.list[j];

      if (!_pColor.rootHasChild) {
        _pColor.rootHasChild = true;
        _pColor.numOfChildren += 1;
        _pColor.oid = value;

        _this.savePalette();

        return _this.returnColor(_pColor.rgb, toString);
      }

      if (_pColor.numOfChildren < _this.list[minChildIdx].numOfChildren) {
        minChildIdx = j;
      }
    }
    /**
     * After getting the color node with the lowest number of children,
     * It will loop within the node, returning the last heir.
     */


    var minPaletteColor = _this.list[minChildIdx];
    var currentColor = minPaletteColor;
    minPaletteColor.numOfChildren += 1;

    while (currentColor.getNextColor()) {
      currentColor = currentColor.getNextColor();
    }

    currentColor.setNextColor(value);

    _this.savePalette();

    return _this.returnColor(currentColor.getNextColor().rgb, toString);
  });

  _defineProperty(this, "getOidFromColor", function (rgb) {
    var rgbStr = rgb;

    if (Array.isArray(rgb) && rgb.length == 3) {
      rgbStr = _PaletteColor.default.printRgb(rgb);
    }

    rgbStr = rgbStr.replace(" ", "");
    var oid = 0;

    for (var i = 0; i < _this.list.length; i++) {
      var pointer = _this.list[i];

      while (typeof pointer.nextColor !== 'undefined' && _PaletteColor.default.printRgb(pointer.rgb) !== rgbStr) {
        pointer = pointer.getNextColor();
      }

      if (_PaletteColor.default.printRgb(pointer.rgb) === rgbStr) {
        oid = pointer.oid;
        break;
      }
    }

    return oid;
  });

  _defineProperty(this, "savePalette", function () {
    if (_this.save) {
      var currentList = JSON.stringify(_this.list);

      _core.LSHandler.saveToStorage("palette_".concat(_this.id), currentList);
    }
  });

  _defineProperty(this, "loadSavedList", function () {
    try {
      var that = _this;
      var savedList = JSON.parse(_core.LSHandler.loadFromStorage("palette_".concat(_this.id)));
      savedList && savedList.map(function (color) {
        that.list.push(new _PaletteColor.default(color.id, color.rgb, color.oid, color.nextColor));
      });

      _this.list.map(function (item) {
        var inner = item;

        while (inner) {
          if (inner.getNextColor()) {
            inner.nextColor = new _PaletteColor.default(inner.nextColor.id, inner.nextColor.rgb, inner.nextColor.oid, inner.nextColor.nextColor);
          }

          inner = inner.getNextColor();
        }
      });
    } catch (e) {
      console.error("JSON parse error. Cannot load data from localStorage");
    }
  });

  _defineProperty(this, "returnColor", function (rgb, toString) {
    if (toString) {
      return _core.CoreFunc.formatRgb(rgb);
    } else {
      return rgb;
    }
  });

  _defineProperty(this, "removePalette", function () {
    _core.LSHandler.removeFromStorage("palette_".concat(_this.id));
  });

  this.id = id;
  this.list = [];
  this.cache = [];
  this.save = save;

  if (load) {
    this.loadSavedList();
  }

  if (this.list.length === 0) {
    if (addColor) {
      this.paletteSet = _toConsumableArray(_defaults.defaultPalette).concat(_toConsumableArray(addColor));
    } else {
      this.paletteSet = _toConsumableArray(_defaults.defaultPalette);
    }

    this.initList();
  }
}
/**
 * @private
 * Change Default Palette to RGB
 */
;

exports.default = Palette;