Person = require('./Constructor-example.js')

var King = function (name, age){
  var kingObject = Person(name,age);
  kingObject.giveIntroduction = () =>{
    console.log(`I am king ${name}, ruler of the kingdom`);
  }
  return kingObject;
}

var Knight = function (name, age){
  var knightObject = Person(name,age);
  knightObject.giveIntroduction = () =>{
    console.log(`I am ser ${name}`);
  }
  return knightObject;
}

var duke = new King('Duke',40);
duke.giveIntroduction();
