function wordCounter (allWords,word){
    if(word in allWords){
        allWords[word]++;
    }
    
    else{
        allWords[word] = 1;
    }
    return allWords;
}
function countWords(inputWords) {
    //console.log(inputWords);
    var wordCount = {};
    wordCount = inputWords.reduce(wordCounter,{});
    return wordCount;
}

module.exports = countWords