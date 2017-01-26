chai = require('chai');
assert = chai.assert;

// EXCERCISE - 1
var upperCaser = require('../uppercase-excercise.js');

describe('upperCaser when given valid input', function () {
  it('should return an empty string when the input is an empty string', function () {
    assert.equal(upperCaser(''), '');
  });
  it('should return an uppercase when the input is in lowercase', function () {
    assert.equal(upperCaser('re'), 're'.toUpperCase());
  });
});

describe('upperCaser when provided invalid string', function () {

  it('should return an error if number is passed', function () {
    assert.equal(upperCaser(1), 'Please provide a valid input');
  });
  it('should return an error if object is passed', function () {
    assert.equal(upperCaser({}), 'Please provide a valid input');
  });
  it('should return an error if array is passed', function () {
    assert.equal(upperCaser([]), 'Please provide a valid input');
  });
  it('should return an error if array of characters is passed', function () {
    assert.equal(upperCaser(['a', 'b']), 'Please provide a valid input');
  });
  it('should return an error if no arguments are passed', function () {
    assert.equal(upperCaser(), 'Please provide a valid input');
  });
  it('should return an error if null is passed', function () {
    assert.equal(upperCaser(null), 'Please provide a valid input');
  });
});
