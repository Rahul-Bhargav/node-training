axios = require('axios');
//const url = process.argv[2];

const getGoogle = () => axios.get('https://www.google.co.in/');
const getFaceBook = () => axios.get('https://www.facebook.com/');


function processRequest() {
  var result = [];
  return getGoogle()
    .then((response1) => {
      result.push(response1.headers);
      return Promise.all([getFaceBook() , response1]);
    })
    .then((arrayOfResults) => {
      console.log('2 ', arrayOfResults[0].headers);
      console.log('1 ', arrayOfResults[1].headers);
    })
    .catch((error) => {
      console.log(error);
    });
}

processRequest();