chai = require('chai');
assert = chai.assert;

var CheckValidUsers = require('../every-some.js');

describe('CheckValidUsers when given valid input', function () {

  it('should return a function that returns true when both valid users and users to test are empty', function () {
    var goodUsers = [];
    var submittedUsers = [];
    var allValidUsers = CheckValidUsers(goodUsers);
    assert.equal(allValidUsers(submittedUsers), true);
  });

  it('should return a function that returns true when given valid submitted users and good users', function () {
    var goodUsers = [{ id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }, { id: 10 }];
    var submittedUsers = [{ id: 2 }, { id: 5 }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    assert.equal(allValidUsers(submittedUsers), true);
  });

  it('should return a function that returns false when given submitted users array not present in good users', function () {
    var goodUsers = [{ id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }, { id: 10 }];
    var submittedUsers = [{ id: 1 }, { id: 5 }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    assert.equal(allValidUsers(submittedUsers), false);
  });

  it('should return a function that returns true when given valid submitted users with multiple similar entries', function () {
    var goodUsers = [{ id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }, { id: 10 }];
    var submittedUsers = [{ id: 2 }, { id: 5 }, { id: 3 }, { id: 2 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    assert.equal(allValidUsers(submittedUsers), true);
  });

  it('should return false if the list of submitted users is more number of unique ids than the list of valid users', function () {
    var goodUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
    var submittedUsers = [{ id: 2 }, { id: 4 }, { id: 6 }, { id: 7 }, { id: 9 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    assert.equal(allValidUsers(submittedUsers), false);
  });

  it('should return a function that returns true when given valid submitted users with ids\'s as string', function () {
    var goodUsers = [{ id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }, { id: 10 }];
    var submittedUsers = [{ id: 2 }, { id: '5' }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    assert.equal(allValidUsers(submittedUsers), true);
  });

  it('should return a function that returns true when given valid good users with ids\'s as string', function () {
    var goodUsers = [{ id: 2 }, { id: 3 }, { id: '5' }, { id: 6 }, { id: '10' }];
    var submittedUsers = [{ id: 2 }, { id: '5' }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    assert.equal(allValidUsers(submittedUsers), true);
  });
});

describe('when the input given to the CheckValidUsers is not valid', function () {
  it('should return an appropriate error message if a string is passed as argument to the CheckValidUsers function', function () {
    var goodUsers = 'Gooduser';
    var submittedUsers = [{ id: 2 }, { id: 5 }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof goodUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a string is passed as argument to allValidUsers function', function () {
    var goodUsers = [{ id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }, { id: 10 }];
    var submittedUsers = 'submitted users';
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof submittedUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a number is passed as argument to the CheckValidUsers function', function () {
    var goodUsers = 123456;
    var submittedUsers = [{ id: 2 }, { id: '5' }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof goodUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a number is passed as argument to allValidUsers function', function () {
    var goodUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
    var submittedUsers = 123456;
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof submittedUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a object is passed as argument to the CheckValidUsers function', function () {
    var goodUsers = {};
    var submittedUsers = [{ id: 2 }, { id: '5' }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof goodUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a object is passed as argument to allValidUsers function', function () {
    var goodUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
    var submittedUsers = {id : 2};
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof submittedUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a NULL is passed as argument to the CheckValidUsers function', function () {
    var goodUsers = null;
    var submittedUsers = [{ id: 2 }, { id: '5' }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof goodUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a NULL is passed as argument to allValidUsers function', function () {
    var goodUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
    var submittedUsers = null;
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof submittedUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a UNDEFINED is passed as argument to the CheckValidUsers function', function () {
    var goodUsers = undefined;
    var submittedUsers = [{ id: 2 }, { id: '5' }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof goodUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a UNDEFINED is passed as argument to allValidUsers function', function () {
    var goodUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
    var submittedUsers = undefined;
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof submittedUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if no argument is passed to the CheckValidUsers function', function () {
    var submittedUsers = [{ id: 2 }, { id: '5' }, { id: 3 }];
    var allValidUsers = CheckValidUsers();
    var errorMessage = 'The input ' + (typeof goodUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if no argument is passed to allValidUsers function', function () {
    var goodUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input ' + (typeof submittedUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    assert.equal(allValidUsers(), errorMessage);
  });

  it('should return an appropriate error message if a few objects of good users array do not have id property', function () {
    var goodUsers = [{ id: 2 }, { id: 3 }, { key: 5 }, { id: 6 }, { key: 10 }];
    var submittedUsers = [{ id: 2 }, { id: 5 }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input given is invalid. The elements at the following indices in goodUsers are invalid - 2, 4';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a few elements of good users array are not objects ', function () {
    var goodUsers = [{ id: 1 }, 123, { id: 3 }];
    var submittedUsers = [{ id: 2 }, { id: 5 }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input given is invalid. The elements at the following indices in goodUsers are invalid - 1';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

  it('should return an appropriate error message if a few elements of submitted users array are not objects ', function () {
    var goodUsers = [{ id: 1 }, { id: 5 }, { id: 3 }];
    var submittedUsers = [{ id: 2 }, 123, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input given is invalid. The elements at the following indices in submittedUsers are invalid - 1';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });

    it('should return an appropriate error message if a few objects of submitted users array do not have id property', function () {
    var goodUsers = [{ id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }, { id: 10 }];
    var submittedUsers = [{ id: 2 }, { key: 5 }, { id: 3 }];
    var allValidUsers = CheckValidUsers(goodUsers);
    var errorMessage = 'The input given is invalid. The elements at the following indices in submittedUsers are invalid - 1';
    assert.equal(allValidUsers(submittedUsers), errorMessage);
  });
})


















