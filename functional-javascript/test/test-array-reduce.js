var chai = require('chai');
var assert = chai.assert;
var countWords = require('../basic-reduce.js');

describe('when function countWords is given a valid input', function () {

  it('should return an object containing the frequency of each word when an array of words is given as input', function () {
    var inputArray = ['apple', 'banana', 'apple', 'durian', 'durian', 'durian'];
    var expectedResult = { apple: 2, banana: 1, durian: 3 };
    var obtainedResult = countWords(inputArray);
    assert.deepEqual(obtainedResult, expectedResult);
  });

  it('should return an object containing the frequency of each word when an array of words including empty strings is given as input', function () {
    var expectedResult = { apple: 2, '': 1, banana: 1, durian: 3 };
    var inputArray = ['apple', 'banana', 'apple', 'durian', 'durian', 'durian'];
    inputArray.push('');
    var obtainedResult = countWords(inputArray);
    assert.deepEqual(obtainedResult, expectedResult);
  });

  it('should return an object containing the frequency of each word when an array of words with no repeated strings is input', function () {
    var inputArray = ['apple', 'banana', 'durian'];
    var expectedResult = { apple: 1, durian: 1, banana: 1 };
    var obtainedResult = countWords(inputArray);
    assert.deepEqual(obtainedResult, expectedResult);
  });

  it('should return an empty object when an empty array is input', function () {
    var inputArray = [];
    var expectedResult = {};
    var obtainedResult = countWords(inputArray);
    assert.deepEqual(obtainedResult, expectedResult);
  });

  it('should return an object containing the frequency of each word when an array of words including uppercase words and lowercase words is given as input', function () {
    var inputArray = ['apple', 'banana', 'apple', 'durian', 'durian', 'durian'];
    inputArray.push('APPLE');
    inputArray.push('mango');
    inputArray.push('APpLE');
    var expectedResult = { apple: 4, banana: 1, durian: 3, mango: 1 };
    var obtainedResult = countWords(inputArray);
    assert.deepEqual(obtainedResult, expectedResult);
  });
});

describe('when function countWords is given invalid input', function () {

  it('should return an appropriate error message when a string is given as input', function () {
    var inputWord = 'abcdef';
    var errorMessage = 'The input given is invalid. The function needs to be given an array of strings.' + ' You have entered a ' + (typeof inputWord);
    assert.equal(countWords(inputWord), errorMessage);
  });

  it('should return an appropriate error message when a number is given as input', function () {
    var inputNumber = 123;
    var errorMessage = 'The input given is invalid. The function needs to be given an array of strings.' + ' You have entered a ' + (typeof inputNumber);
    assert.equal(countWords(inputNumber), errorMessage);
  });

  it('should return an appropriate error message when an object is given as input', function () {
    var inputObject = { key: 'value' };
    var errorMessage = 'The input given is invalid. The function needs to be given an array of strings.' + ' You have entered a ' + (typeof inputObject);
    assert.equal(countWords(inputObject), errorMessage);
  });

  it('should return an appropriate error message when a NULL is given as input', function () {
    var errorMessage = 'The input given is invalid. The function needs to be given an array of strings.' + ' You have entered a ' + (typeof null);
    assert.equal(countWords(null), errorMessage);
  });

  it('should return an appropriate error message when an UNDEFINED is given as input', function () {
    var errorMessage = 'The input given is invalid. The function needs to be given an array of strings.' + ' You have entered a ' + (typeof undefined);
    assert.equal(countWords(undefined), errorMessage);
  });

  it('should return an appropriate error message when a array with a few invalid entries is given as input', function () {
    var inputArray = ['apple', 'banana', 'apple', [], 'durian', 'durian', {}];
    var errorMessage = 'The input given is invalid. The elements at the following indices are invalid - 3, 6';
    assert.equal(countWords(inputArray), errorMessage);
  });

  it('should return an appropriate error message when no arguments are provided to the function', function () {
    var errorMessage = 'The input given is invalid. The function needs to be given an array of strings.' + ' You have entered a ' + (typeof undefined);
    assert.equal(countWords(), errorMessage);
  });
});