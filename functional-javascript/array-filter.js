function isShortMessage(object){
        return object.message.length < 50;
}

function getMessageElement (object){
    return object.message;
}

function getShortMessages(messages){
    var filteredMessages = messages.filter(isShortMessage);
    var messageArray = filteredMessages.map(getMessageElement);
    return messageArray;
}

module.exports = getShortMessages;