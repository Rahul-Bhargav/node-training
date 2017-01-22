function repeatOperation(operationToPerform,number){
    if(number>0){
        operationToPerform();
        number--;
        repeatOperation(operationToPerform,number);
    }
}

module.exports = repeatOperation;