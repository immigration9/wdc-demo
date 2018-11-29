"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStyle = createStyle;
exports.styleHidden = styleHidden;
exports.drawTooltipCircle = drawTooltipCircle;
var style = 'border: none; display: block; float: left; width: 6px; height: 6x; margin-right: 5px; margin-top: 0px;';

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
    'font-size': '12px'
  };
  var output = '';

  for (var key in innerStyle) {
    if (innerStyle.hasOwnProperty(key)) {
      output += "".concat(key, ":").concat(innerStyle[key], ";");
    }
  }

  return output;
}

function styleHidden() {
  return "visibility:hidden;";
}

function drawTooltipCircle(color) {
  var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : style;
  var circle = '<span style="' + style + '"><svg height="8" width="8">';
  circle += '<circle cx="4" cy="4" r="4" fill="' + color + '" />';
  circle += '</svg></span>';
  return circle;
}