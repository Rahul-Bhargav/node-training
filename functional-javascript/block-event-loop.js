function repeat(operation, num) {
    if (num <= 0) return;

    operation();

    if (num % 10 === 0) {
        setTimeout(function () {
            return repeat(operation, --num);
        });
    }
    else {
        return repeat(operation, --num);
    }

}

module.exports = repeat