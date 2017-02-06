const axios = require('axios')

const http = require('http')
var portNumber = 8080

const getGoogle = () => axios.get('https://www.google.co.in/')

function initializeServer () {
  const server = http.createServer((request, response) => {
    getGoogle()
      .then((result) => {
        response.writeHeader(200)
        response.end(result.data)
      })
      .catch((error) => {
        response.writeHeader(200)
        response.end(`<html><h1>404<br>${error}</h1></html>`)
      })
  })
  server.listen(portNumber)
}
initializeServer()
