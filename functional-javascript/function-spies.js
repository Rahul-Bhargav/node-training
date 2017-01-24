function Spy(target, method) {
    
    var spy  = {
        count : 0
    }

    var originalMethod = target[method];

    target[method] = function () {
        spy.count++;
       return originalMethod.apply(target,[].slice.call(arguments));
    }
    return spy;
}

module.exports = Spy