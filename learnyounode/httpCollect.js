http = require('http');
var url = process.argv[2];

function processRequest() {
  http.get(url, (response) => {
    response.setEncoding('utf8')
    var rawData = '';
    response.on('data', (chunk) => {
      rawData += chunk;
    });
    response.on('error', (err) => {
      console.log(err);
    });
    response.on('end', () => {
      console.log(`${rawData.length}`);
      console.log(`${rawData}`);
    });
  });
}

processRequest(url);