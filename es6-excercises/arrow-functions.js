var inputs = process.argv.slice(2);
var result = inputs.map(word => word.substring(0,1))
  .reduce((accumulator,firstLetter) => accumulator += firstLetter,'');

console.log(`[${inputs}] becomes \"${result}\"`);