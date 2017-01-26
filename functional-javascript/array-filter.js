function isShortMessage(object) {
  return object.message.length < 50;
}

function getMessageElement(object) {
  return object.message;
}

function isString(object) {
  return Object.prototype.hasOwnProperty.call(object,'message') && typeof object.message === 'string';
}

function getShortMessages(messages) {
  var isValidInput = true;
  if (messages instanceof Array) {
    
    isValidInput = messages.every(isString);
    if (isValidInput) {
      var filteredMessages = messages.filter(isShortMessage);
      var messageArray = filteredMessages.map(getMessageElement);
      return messageArray;
    } 
  }
  else {
    isValidInput = false;
  }

  if(!isValidInput) return 'Please provide a valid input'
}

module.exports = getShortMessages;