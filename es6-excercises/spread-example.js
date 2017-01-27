var numberArray = process.argv.slice(2);

var minOfNumberArray = Math.min(...numberArray);

console.log(`The minimum of [${numberArray}] is ${minOfNumberArray}`);