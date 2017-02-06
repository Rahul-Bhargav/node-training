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

app.post('/write/', function (request, response) {
  const textInput = '\n' + request.body.text

  appendFileAsync(inputPath, textInput)
    .then(() => {
      response.send(`Succesfully added ${textInput} to the file`)
    })
    .catch((error) => {
      console.error(error)
    })
})

app.delete('/destroy/', urlEncoder, function (request, response) {
  const lineNumber = request.body.lineNumber
  let fileContent
  readFileAsync(inputPath)
    .then((buffer) => {
      fileContent = deleteLine(buffer.toString(), lineNumber)
      if (!fileContent) {
        response.sendStatus(500)
        return 'Error'
      }
      return writeFileAsync(inputPath, fileContent)
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

app.put('/update/', urlEncoder, function (request, response) {
  if (!request.body) response.sendStatus(500)
  const data = request.body.data
  const lineNumber = request.body.lineNumber
  let fileContent
  readFileAsync(inputPath)
    .then((buffer) => {
      fileContent = modfiyFileContent(buffer.toString(), lineNumber, data)
      if (!fileContent) {
        response.sendStatus(500)
        return 'Error'
      }
      return writeFileAsync(inputPath, fileContent)
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

function modfiyFileContent (fileContent, lineNumber, data) {
  const lines = fileContent.split('\n')
  if (lineNumber >= lines.length) {
    return false
  } else {
    lines[lineNumber] = data
    fileContent = lines.join('\n')
    return fileContent
  }
}

function deleteLine (fileContent, lineNumber) {
  let lines = fileContent.split('\n')
  if (lineNumber >= lines.length) {
    return false
  } else {
    lines.splice(lineNumber, 1)
    fileContent = lines.join('\n')
    return fileContent
  }
}
app.listen(8080)
