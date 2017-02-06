const readFileAsync = require('./readFileAsync.js')
const appendFileAsync = require('./appendFileAsync.js')
const writeFileAsync = require('./writeFileAsync.js')
const bodyParser = require('body-parser')

const filePath = '/Users/rahulsurabhi/Documents/Training/node-training/server-excercises/TestFolder/sample.txt'
const htmlPath = '/Users/rahulsurabhi/Documents/Training/node-training/server-excercises/index.html'
var express = require('express')
var app = express()
const urlEncoder = bodyParser.urlencoded({ extended: false })

app.get('/', function (request, response) {
  response.redirect('/read')
})

app.get('/read', function (request, response) {
  let fileContent = ''
  let htmlContent = ''
  readFileAsync(filePath)
    .then((fileBuffer) => {
      fileContent = fileBuffer.toString()
      return readFileAsync(htmlPath)
    })
    .then((htmlBuffer) => {
      htmlContent = htmlBuffer.toString()
      htmlContent = updateHTML(htmlContent, fileContent)
      return writeFileAsync(htmlPath, htmlContent)
    })
    .then(() => {
      response.sendFile(htmlPath)
    })
    .catch((error) => {
      console.error(error)
      response.sendStatus(500)
    })
})

app.post('/write', urlEncoder, function (request, response) {
  const textInput = '\n' + request.body.data

  appendFileAsync(filePath, textInput)
    .then(() => {
      response.redirect('/read')
    })
    .catch((error) => {
      console.error(error)
      response.sendStatus(500)
    })
})

app.post('/destroy', urlEncoder, function (request, response) {
  const lineNumber = request.body.lineNumber
  let fileContent
  readFileAsync(filePath)
    .then((buffer) => {
      fileContent = deleteLine(buffer.toString(), lineNumber)
      if (!fileContent) {
        response.sendStatus(500)
        return 'Error'
      }
      return writeFileAsync(filePath, fileContent)
    })
    .then((err) => {
      if (err) {
        console.log(err)
        return
      }
      response.redirect('/read')
    })
    .catch((error) => {
      console.error(error)
      response.sendStatus(500)
    })
})

app.post('/update', urlEncoder, function (request, response) {
  if (!request.body) response.sendStatus(500)
  const data = request.body.data
  const lineNumber = request.body.lineNumber
  let fileContent
  readFileAsync(filePath)
    .then((buffer) => {
      fileContent = modfiyFileContent(buffer.toString(), lineNumber, data)
      if (!fileContent) {
        response.sendStatus(500)
        return 'Error'
      }
      return writeFileAsync(filePath, fileContent)
    })
    .then((err) => {
      if (err) {
        console.log(err)
        return
      }
      response.redirect('/read')
    })
    .catch((error) => {
      console.error(error)
      response.sendStatus(500)
    })
})

function updateHTML (htmlContent, fileContent) {
  let splitHtml = htmlContent.split('ol')
  let splitfile = fileContent.split('\n')
  let contentToAdd = ''
  splitfile.forEach((element) => {
    contentToAdd += `<li>${element}</li>`
  })
  splitHtml[1] = `>${contentToAdd}<`
  htmlContent = splitHtml.join('ol')
  return htmlContent
}

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
