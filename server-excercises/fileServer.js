const readFileAsync = require('./readFileAsync.js');
const appendFileAsync = require('./appendFileAsync.js');

const inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/server-excercises/TestFolder/sample.txt';
var express = require('express');
var app = express();

app.get('/read', function (request, response) {
  readFileAsync(inputPath)
    .then((buffer) => {
      response.send(buffer.toString());
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post('/write/:text', function (request, response) {
  const textInput = request.params.text;

  appendFileAsync(inputPath, textInput)
    .then(() => {
      response.send(`Succesfully added ${textInput} to the file`);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(8080);