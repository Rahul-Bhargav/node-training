
const Person = function (name, age) {
   const giveIntroduction =() => {
     console.log(`Hi! I am ${name}`);
   }
   return { name, age, giveIntroduction };
}
module.exports = Person;


var rahul = new Person('Rahul',22);
// rahul.giveIntroduction();

