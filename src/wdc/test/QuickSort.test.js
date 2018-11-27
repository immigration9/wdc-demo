"use strict";

var assert = require('assert');

var QuickSort = require('../core').QuickSort;

var qs = new QuickSort();
var testArray1 = [3, 5, 7, 4, 2, 1, 0];
var testArray2 = [1, 11, 6, 2, 4, 5, 3];
var testArray_test = [1, 11, 6, 2, 4, 5, 3];

var testArrayLong = require('./longarray').testArrayLong;

console.log("QuickSort Test");
console.log("#. isEqual test");
assert.strictEqual(qs.sort(testArray1, {
  isClone: true
}).toString(), [0, 1, 2, 3, 4, 5, 7].toString());
assert.strictEqual(qs.sort(testArray2, {
  isClone: true
}).toString(), [1, 2, 3, 4, 5, 6, 11].toString());
assert.strictEqual(qs.sort(testArray_test, {
  isClone: false
}).toString(), testArray_test.toString());
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
assert.strictEqual(JSON.stringify(qs.sort(testArray3, {
  isClone: true,
  item: 'value'
})), JSON.stringify([{
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
console.log("#. `QuickSort` isEqual test on long array");
console.log(testArrayLong.length);
console.time("QuickSort");
qs.sort(testArrayLong, {
  isClone: false
});
console.timeEnd("QuickSort");
console.log("** Test Complete **");