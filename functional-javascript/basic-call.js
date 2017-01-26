
// function duckCount(){
//     var arrayOfDucks = Array.prototype.filter.call(arguments,function isDuck(object){

//         return Object.prototype.hasOwnProperty.call(object,'quack');
//     });
//     return arrayOfDucks.length;
// }

function duckCount() {
  var arrayOfKeys = Object.keys(arguments);
  var outerArguments = arguments;
  var arrayOfDucks = arrayOfKeys.filter(function isDuck(key) {
    // console.log(outerArguments[key]);
    return {}.hasOwnProperty.call(outerArguments[key], 'quack');
  })
  return arrayOfDucks.length;
}




module.exports = duckCount;