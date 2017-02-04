axios = require('axios');
//const url = process.argv[2];

const getGoogle = () => axios.get('https://www.google.co.in/');
const getFaceBook = () => axios.get('https://www.facebook.com/');


function processRequest() {
  return getGoogle()
    .then((response1) => {
      result.push(response1.headers);
      return Promise.all([getFaceBook() , response1]);
    })
    .then((arrayOfResults) => {
      return arrayOfResults;
    })
    .catch((error) => {
      console.log(error);
    });
}

processRequest();