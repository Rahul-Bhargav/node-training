axios = require('axios');
//const url = process.argv[2];

const getGoogle = () => axios.get('https://www.google.co.in/');
const getFaceBook = () => axios.get('https://www.facebook.com/');


function processRequest() {
  getGoogle()
    .then((response) => {
      console.log('1 ', response.headers);
      return getFaceBook();
    })
    .then((response) => {
      console.log('2 ', response.headers);
    })
    .catch((error) => {
      console.log(error);
    });
}

processRequest();