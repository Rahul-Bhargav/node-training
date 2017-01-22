var currentIndex = 0;


function reduce(arr, fn, initial) {
    if(currentIndex <arr.length){
        fn(initial,arr[currentIndex],currentIndex++, arr);
        reduce(arr, fn, initial);
        return initial;
    }
    else
        return initial;
}

module.exports = reduce