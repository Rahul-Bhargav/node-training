function countWords(inputWords) {
  var errorIndices = [];
  if (inputWords instanceof Array) {
    var isValid = true;
    inputWords.forEach(function isString(word, index) {
      if ((typeof word) != 'string') {
        errorIndices.push(index);
        isValid = false;
        return false;
      }
    });
    if (isValid) {
      var countResult = inputWords.reduce(function frequency(allNames, name) {
        lowerCaseName = name.toLowerCase();
        allNames[lowerCaseName] = (lowerCaseName in allNames) ? allNames[lowerCaseName] + 1 : 1;
        return allNames;
      }, {});
      return countResult;
    } else {
      var errorMessage = 'The input given is invalid. The elements at the following indices are invalid -';
      errorIndices.forEach(function (errorIndex) {
        errorMessage += ' ' + errorIndex.toString() + ',';
      });
      errorMessage = errorMessage.slice(0, -1);
      return errorMessage;
    }
  }
  else {
    var errorMessage = 'The input given is invalid. The function needs to be given an array of strings.' + ' You have entered a ' + (typeof inputWords);
    return errorMessage;
  }
}

module.exports = countWords;