chai = require('chai');
assert = chai.assert;

//EXCERCISE - 2
var higherOrderFunction = require('../higher-order-functions');
var count = 0, maxcounts = 10;
var counter = function () {
  if (count < maxcounts) {
    count++;
  }
  else {
    count = 0;
  }
}

describe('Repeat Operation when provided valid function', function () {

  it('should run the passed function atleast once', function () {
    higherOrderFunction(counter, maxcounts);
    assert.isAbove(count, 0);
  });

  it('should run the passed function num times', function () {
    higherOrderFunction(counter, maxcounts);
    assert.equal(count, maxcounts - 1);
  });
});

describe('when provided invalid inputs', function () {

  it('should return error if passed invalid function', function () {

    assert.equal(higherOrderFunction('', maxcounts), 'Provide a valid function');
  });

  it('should return error if passed invalid number', function () {

    assert.equal(higherOrderFunction('', 'maxcounts'), 'Provide a valid function');
  });

  it('should return error if passed objects', function () {

    assert.equal(higherOrderFunction({}, {}), 'Provide a valid function');
  });

});
