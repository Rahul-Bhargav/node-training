function isLessThan50(object){
        return object.message.length < 50;
}

function getMessageElement (object){
    return object.message;
}

function getShortMessages(messages){
    var filteredMessages = messages.filter(isLessThan50);
    var messageArray = filteredMessages.map(getMessageElement);
    return messageArray;
}

module.exports = getShortMessages;