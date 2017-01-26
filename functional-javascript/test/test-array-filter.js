chai = require('chai');
assert = chai.assert;

// EXCERCISE - 1
var getShortMessages = require('../array-filter.js');

var messagesObject = [
  {message : 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem'},
  {message : 'accusantium doloremque laudaium, totam rem aperia' },
  {message : 'xercitation ullamco laboris nisi ut aliquip ex ea commodo consequats'},
  {message : 'eaque ipsa quae ab illo inventore vertati et quas'}
]
var shortMessages = [
  'accusantium doloremque laudaium, totam rem aperia' ,
  'eaque ipsa quae ab illo inventore vertati et quas'
]
var longMessages = [
  {message : 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem'},
  {message : 'xercitation ullamco laboris nisi ut aliquip ex ea commodo consequats'}
]


describe('getShortMessages when given valid input', function () {
  it('should return an empty array when the input is an empty array', function () {
    assert.deepEqual(getShortMessages([]), []);
  });

  it('should return an array of message strings whose length is less than 50 ', function () {
    assert.deepEqual(getShortMessages(messagesObject),shortMessages );
  });

  it('should return an empty array if all input messages strings have length more than 50', function () {
    assert.deepEqual(getShortMessages(longMessages),[] );
  });
});

describe('getShortMessages when provided invalid array', function () {

  it('should return an error message if string is passed', function () {
    assert.equal(getShortMessages('abc'), 'Please provide a valid input');
  });
  it('should return an error message if an array of strings,objects are passed', function () {
    assert.equal(getShortMessages([{},{},'bhg']), 'Please provide a valid input');
  });
  it('should return an error message if object is passed', function () {
    assert.equal(getShortMessages({}), 'Please provide a valid input');
  });
  it('should return an error message if no arguments are passed', function () {
    assert.equal(getShortMessages(), 'Please provide a valid input');
  });
  it('should return an error message if null is passed', function () {
    assert.equal(getShortMessages(null), 'Please provide a valid input');
  });
});
