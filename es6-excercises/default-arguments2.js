module.exports = function makeMessageImportant(message, numberOfTimes = message.length){
  return `${message}${'!'.repeat(numberOfTimes)}`
}