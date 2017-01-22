function doubleAll(numbers) {
    var roots = numbers.map(function doubleNumber(x){
    return x * 2;
    });
    return roots;
}

module.exports = doubleAll;
