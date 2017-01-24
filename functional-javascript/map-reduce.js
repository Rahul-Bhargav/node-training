function arrayMap(arr, fn) {
    var mappedArray = arr.reduce(function mapByReduce(initial,element){
        initial.push(fn(element));
        return initial;
    },[]);
    return mappedArray;
}

module.exports = arrayMap;