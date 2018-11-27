"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMousePos = getMousePos;

function getMousePos(rect, evt) {
  return {
    mx: evt.clientX - rect.left,
    my: evt.clientY - rect.top
  };
}