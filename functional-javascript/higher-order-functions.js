function repeatOperation(operationToPerform,number){
    if(number>0){
        operationToPerform();
        number--;
        repeatOperation(operationToPerform,number);
    }
}
/*
function loggerFunction()
{
    console.log('test');
}

repeatOperation(loggerFunction,10);
*/

module.exports = repeatOperation;