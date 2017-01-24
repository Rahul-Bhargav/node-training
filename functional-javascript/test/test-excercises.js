chai = require('chai');
assert = chai.assert;

// //EXCERCISE - 1
var toUpperCase = require('../uppercase-excercise.js');
describe('Excercise 1', function () {
    describe('when provided valid string', function () {
        it('should return a string', function () {
            assert.equal(toUpperCase(''), '');
        });
        it('should return an uppercase string', function () {
            var stringToTest = 're';
            assert.equal(toUpperCase(stringToTest), stringToTest.toUpperCase());
        });
    });

    describe('when provided invalid string', function () {

        it('should return an error if number is passed', function () {
            assert.equal(toUpperCase(1), 'Please provide a valid input');
        });
        it('should return an error if object is passed', function () {
            assert.equal(toUpperCase({}), 'Please provide a valid input');
        });
        it('should return an error if array is passed', function () {
            assert.equal(toUpperCase([]), 'Please provide a valid input');
        });
        it('should return an error if array of characters is passed', function () {
            assert.equal(toUpperCase(['a', 'b']), 'Please provide a valid input');
        });
    });

});

//EXCERCISE - 2
var higherOrderFunction = require('../higher-order-functions');

describe('Excercise 2', function () {
    var count = 0, maxcounts = 10;
    var counter = function () {
        if (count < maxcounts) {
            count++;
        }
        else {
            count = 0;
        }
    }

    describe('when provided valid function', function () {

        it('should run the passed function', function () {
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

    });
});
