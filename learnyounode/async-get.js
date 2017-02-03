http = require('http');
var urls = process.argv.slice(2);

function processRequest() {
  var callbackCount = 0;
  var responseData = []
  function doneRequest() {
    callbackCount++;
    if (callbackCount === 3) printResult();
  }
  urls.forEach((url, index) => {
    http.get(url, (response) => {
      response.setEncoding('utf8')
      var rawData = '';
      response.on('data', (chunk) => {
        rawData += chunk
      });
      response.on('error', (err) => {
        console.log(err);
      });
      response.on('end', () => {
        responseData[index] = rawData;
        doneRequest();
      });
    });
  });

  function printResult(){
   responseData.forEach((data)=>console.log(data));
  }
}

processRequest();