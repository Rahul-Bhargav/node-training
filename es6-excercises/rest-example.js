module.exports = (...numbers) => {
  var sum = numbers.reduce((sum,number) => sum+number)
  return sum/numbers.length
};
