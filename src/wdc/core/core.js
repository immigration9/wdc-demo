"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMinValueIndexFromArray = getMinValueIndexFromArray;
exports.formatRgb = formatRgb;

function getMinValueIndexFromArray(array) {
  if (!Array.isArray(array) && array.length === 0) {
    throw new Error("Provide a valid array to compare");
  }

  var min = array[0];
  var index = 0;
  array.map(function (item, idx) {
    if (Number(item) < min) {
      min = item;
      index = idx;
    }
  });
  return {
    min: min,
    index: index
  };
}

function formatRgb(rgb, alpha) {
  if (!Array.isArray(rgb) && rgb.length < 3) {
    throw new Error("Invalid array value");
  }

  if (alpha) {
    return "rgba(".concat(rgb[0], ",").concat(rgb[1], ",").concat(rgb[2], ",").concat(alpha, ")");
  } else {
    return "rgb(".concat(rgb[0], ",").concat(rgb[1], ",").concat(rgb[2], ")");
  }
}