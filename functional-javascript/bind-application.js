var slice = Array.prototype.slice

function logger(namespace) {
    // return addLogType = function () {
    //     var logs = slice.call(arguments);
    //     var nameSpaceLogger = console.log.bind(console, namespace);
    //     nameSpaceLogger(logs.join(' '));
    // }

    return console.log.bind(console,namespace);
}

module.exports = logger;
