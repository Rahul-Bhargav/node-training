function upperCaser(lowerCaseWord) {
    if ((typeof lowerCaseWord).toLowerCase() === 'string') {
        var upperCaseWord = lowerCaseWord.toUpperCase();
        return upperCaseWord;
    } else {
        return 'Please provide a valid input';
    }
}

module.exports = upperCaser;