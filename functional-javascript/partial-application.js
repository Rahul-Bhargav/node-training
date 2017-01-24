var slice = Array.prototype.slice

function logger(namespace) {
    var addLogType = function () {
        var logs = slice.call(arguments);
        console.log.apply(null, [namespace].concat(logs));
    }
    return addLogType;
}
module.exports = logger;