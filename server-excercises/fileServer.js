const readFileAsync = require('./readFileAsync.js')
const appendFileAsync = require('./appendFileAsync.js')
const writeFileAsync = require('./writeFileAsync.js')
const bodyParser = require('body-parser')

const inputPath = '/Users/rahulsurabhi/Documents/Training/node-training/server-excercises/TestFolder/sample.txt'
var express = require('express')
var app = express()
const urlEncoder = bodyParser.urlencoded({ extended: false })

app.get('/', function (request, response) {
  response.send(`Use /read or / write`)
})

app.get('/read', function (request, response) {
  readFileAsync(inputPath)
    .then((buffer) => {
      response.sendFile(inputPath)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.post('/write/:text', function (request, response) {
  const textInput = '\n' + request.params.text

  appendFileAsync(inputPath, textInput)
    .then(() => {
      response.send(`Succesfully added ${textInput} to the file`)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.put('/update/:lineNumber', urlEncoder, function (request, response) {
  if (!request.body) response.sendStatus(500)
  const data = request.body.data
  console.log(data)
  const lineNumber = request.params.lineNumber
  let fileContent
  readFileAsync(inputPath)
    .then((buffer) => {
      fileContent = buffer.toString()
      const lines = fileContent.split('\n')
      if (lineNumber >= lines.length) {
        response.sendStatus(500)
      } else {
        lines[lineNumber] = data
        fileContent = lines.join('\n')
        return writeFileAsync(inputPath, fileContent)
      }
      return 'Error'
    })
    .then((err) => {
      if (err) {
        console.log(err)
        return
      }
      response.send(`Success`)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.listen(8080)
