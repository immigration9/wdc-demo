"use strict";

var assert = require('assert');

var HeapSort = require('../core').HeapSort;

var hs = new HeapSort();
var testArray1 = [3, 5, 7, 4, 2, 1, 0];
var testArray2 = [1, 11, 6, 2, 4, 5, 3];
var testArray_test = [1, 11, 6, 2, 4, 5, 3];

var testArrayLong = require('./longarray').testArrayLong;

console.log("HeapSort Test");
console.log("#. isEqual test");
assert.strictEqual(hs.sort(testArray1, true).toString(), [0, 1, 2, 3, 4, 5, 7].toString());
assert.strictEqual(hs.sort(testArray2, true).toString(), [1, 2, 3, 4, 5, 6, 11].toString());
assert.strictEqual(hs.sort(testArray_test, false).toString(), testArray_test.toString());
console.log("#. isEqual test on object");
var testArray3 = [{
  name: 'tenth',
  value: 10
}, {
  name: 'second',
  value: 2
}, {
  name: 'ninth',
  value: 9
}, {
  name: 'fifth',
  value: 5
}, {
  name: 'fourth',
  value: 4
}, {
  name: 'eight',
  value: 8
}, {
  name: 'seventh',
  value: 7
}, {
  name: 'third',
  value: 3
}, {
  name: 'first',
  value: 1
}, {
  name: 'sixth',
  value: 6
}];
assert.strictEqual(JSON.stringify(hs.sort(testArray3, true, 'value')), JSON.stringify([{
  name: 'first',
  value: 1
}, {
  name: 'second',
  value: 2
}, {
  name: 'third',
  value: 3
}, {
  name: 'fourth',
  value: 4
}, {
  name: 'fifth',
  value: 5
}, {
  name: 'sixth',
  value: 6
}, {
  name: 'seventh',
  value: 7
}, {
  name: 'eight',
  value: 8
}, {
  name: 'ninth',
  value: 9
}, {
  name: 'tenth',
  value: 10
}]));
console.log("#. `HeapSort` isEqual test on long array");
console.log(testArrayLong.length);
console.time("HeapSort");
hs.sort(testArrayLong, false);
console.timeEnd("HeapSort");
console.log("** Test Complete **");