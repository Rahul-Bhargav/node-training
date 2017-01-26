function doubleNumber(x) {
  return x * 2;
}

function isNotANumber(x) {
  return isNaN(x);
}

function doubleAll(numbers) {
  var isNotValid = false;
  
  if (numbers instanceof Array) {
    
    var isNotValid = numbers.some(isNotANumber);
    if (!isNotValid) {
      var result = numbers.map(doubleNumber);
      return result;
    }
    
  } else {
    isNotValid = true;
  }

  if(isNotValid)
    return 'Please provide a valid input';
}

module.exports = doubleAll;