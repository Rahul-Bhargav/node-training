var inputNumbers = process.argv.slice(2);
var errorIndices = [];

var isValid = true;
inputNumbers.forEach((inputNumber, index) => {
  if (isNaN(parseFloat(inputNumber,10))) {
    errorIndices.push(index + 1);
    isValid = false;
  }
});
if (isValid) {
  var sumOfNumbers = 0;
  sumOfNumbers = inputNumbers.reduce((sumOfNumbers, currNumber) => sumOfNumbers + parseInt(currNumber), 0);
  console.log(sumOfNumbers);
}
else {
  console.log(`The following elements of the input array are not numbers :`);
  errorIndices.forEach((errorIndex) => {
    console.log(`${errorIndex} - ${typeof inputNumbers[errorIndex - 1]}`);
  });
}

