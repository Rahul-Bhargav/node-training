function formErrorMessage(errorIndices, userType) {
  var errorMessage = 'The input given is invalid. The elements at the following indices in ' + userType + ' are invalid -';
  errorIndices.forEach(function (errorIndex) {
    errorMessage += ' ' + errorIndex.toString() + ',';
  });
  errorMessage = errorMessage.slice(0, -1);
  return errorMessage;
}

function checkUsersValid(goodUsers) {
  if (goodUsers instanceof Array) {
    return function (submittedUsers) {
      var isValid = true;
      var errorIndices = [];
      goodUsers.forEach(function hasIDproperty(goodUser, index) {
        if (goodUser instanceof Object) {
          if (!Object.prototype.hasOwnProperty.call(goodUser, 'id')) {
            isValid = false;
            errorIndices.push(index);
          }
        } else {
          isValid = false;
          errorIndices.push(index);
        }
      });
      if (isValid) {
        return allValidUsers(goodUsers, submittedUsers);
      } else {
        return formErrorMessage(errorIndices, 'goodUsers');
      }
    }
  } else {
    return function (submittedUsers) {
      var errorMessage = 'The input ' + (typeof goodUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
      return errorMessage;
    }
  }
}

function allValidUsers(goodUsers, submittedUsers) {
  if (submittedUsers instanceof Array) {
    var isValid = true;
    var errorIndices = [];
    submittedUsers.forEach(function hasIDproperty(submittedUser, index) {
      if (submittedUser instanceof Object) {
        if (!Object.prototype.hasOwnProperty.call(submittedUser, 'id')) {
          isValid = false;
          errorIndices.push(index);
        }
      } else {
        isValid = false;
        errorIndices.push(index);
      }
    });
    if (isValid) {
      var isValid = submittedUsers.every(function (submittedUser) {
        return checkGoodUsers(submittedUser, goodUsers);
      });
      return isValid;
    } else {
      return formErrorMessage(errorIndices, 'submittedUsers');
    }
  } else {
    var errorMessage = 'The input ' + (typeof submittedUsers) + ', provided is not a valid one. Please provide an array of objects with an attribute id. ';
    return errorMessage;
  }
}

function checkGoodUsers(submittedUser, goodUsers) {
  var isValid = goodUsers.some(function (goodUser) {
    return checkValidity(submittedUser, goodUser);
  });
  return isValid
}

function checkValidity(submittedUser, goodUser) {
  submittedUserID = parseInt(submittedUser.id);
  goodUserID = parseInt(goodUser.id);
  return submittedUserID === goodUserID;
}

module.exports = checkUsersValid