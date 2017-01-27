let userArray = process.argv.slice(2);

let conciseUser = {username :'', email : ''};
[, conciseUser.username, conciseUser.email] = userArray;

console.log(conciseUser); 
