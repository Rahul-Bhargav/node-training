http = require('http');
var url = process.argv[2];

function processRequest() {
  http.get(url, (response) => {
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      console.log(chunk);
    });
    response.on('error', (err) =>{
     console.log(err);
    });
  });
}

processRequest(url);