"use strict";

var assert = require('assert');

var ColorPicker = require('../ColorPicker').ColorPicker;

var HashString = require('../ColorPicker').HashString;

var whatap = new ColorPicker(); // console.log("1. Testing palette validity");
// assert.equal(whatap.fromPalette("periwinkle"), '#748ffc');
// assert.equal(whatap.fromPalette("paleGreen"), '#a1e5ac');
// assert.equal(whatap.fromPalette("royalBlue"), '#1565c0');
// console.log("** Completed **");

console.log("1. Testing string hash & integer");
assert.equal(whatap.fromInteger(HashString("Hello, World!")), whatap.fromString("Hello, World!"));
assert.equal(whatap.fromInteger(HashString("Thank you WhaTap")), whatap.fromString("Thank you WhaTap"));
console.log("** Completed **");
console.log("2. HEX to RGB Testing");
assert.equal(whatap.hexToRgb("#123456"), "rgb(18,52,86)");
assert.equal(whatap.hexToRgb("6F3DAA"), "rgb(111,61,170)");
assert.equal(whatap.hexToRgb("#FFFFFF"), "rgb(255,255,255)");
assert.equal(whatap.hexToRgb("806F3DAA"), "rgba(111,61,170,0.5)"); // console.log("6. RGBA to HEX Testing")
// assert.equal(
//   whatap.rgbToHex("rgb(0, 0, 0)"),
//   "#000000"
// )
// assert.equal(
//   whatap.rgbToHex("rgb(123, 63, 22)"),
//   "#7B3F16"
// )
// assert.equal(
//   whatap.rgbToHex("rgba(64, 24, 77, 0.5)"),
//   "#8040184D"
// )

console.log("** Completed **");