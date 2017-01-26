function repeatOperation(operationToPerform, number) {
  if (operationToPerform instanceof Function) {
    if (isNaN(number)) {
      return 'Provide a valid function';
    } else {
      if (number > 0) {
        operationToPerform();
        number--;
        repeatOperation(operationToPerform, number);
      }
    }
  } else {
    return 'Provide a valid function';
  }
}

module.exports = repeatOperation;