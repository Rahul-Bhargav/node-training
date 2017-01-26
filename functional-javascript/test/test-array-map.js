chai = require('chai');
assert = chai.assert;

// EXCERCISE - 1
var doubleAll = require('../array-map.js');

describe('doubleAll when given valid input', function () {
  it('should return an empty array when the input is an empty array', function () {
    assert.deepEqual(doubleAll([]), []);
  });
  it('should return an array with elements that are double of the original elements ', function () {
    assert.deepEqual(doubleAll([1, 2, 3]), [2, 4, 6]);
  });
  it('should return an array with elements that are double of the original elements ', function () {
    assert.deepEqual(doubleAll(['1', '2', '3']), [2, 4, 6]);
  });
});

describe('doubleAll when provided invalid array', function () {

  it('should return an error message if string is passed', function () {
    assert.equal(doubleAll('abc'), 'Please provide a valid input');
  });
  it('should return an error message if an array of strings are passed', function () {
    assert.equal(doubleAll(['12', '1234', 'bhg']), 'Please provide a valid input');
  });
  it('should return an error message if an array of strings are passed', function () {
    assert.equal(doubleAll([{},{},'bhg']), 'Please provide a valid input');
  });
  it('should return an error message if object is passed', function () {
    assert.equal(doubleAll({}), 'Please provide a valid input');
  });
  it('should return an error message if no arguments are passed', function () {
    assert.equal(doubleAll(), 'Please provide a valid input');
  });
  it('should return an error message if null is passed', function () {
    assert.equal(doubleAll(null), 'Please provide a valid input');
  });
});
