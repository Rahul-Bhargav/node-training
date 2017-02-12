const postgreDB = require('./databaseInterface')
const bodyParser = require('body-parser')
var express = require('express')
var app = express()
const urlEncoder = bodyParser.json()

app.use(express.static('public'))

app.get('/', function (request, response) {
  response.send(`Use /read or / write`)
})

app.get('/read', function (request, response) {
  postgreDB.read()
    .then((result) => {
      response.json(result)
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

app.post('/write/:task', function (request, response) {
  const task = request.params.task
  task.trim()
  if (!task || task === '') {
    response.sendStatus(500)
    return
  }
  postgreDB.insert(task)
    .then((result) => {
      response.send(result)
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

app.delete('/destroy/:id', urlEncoder, function (request, response) {
  const id = request.params.id
  if (!id) {
    response.sendStatus(500)
    return
  }
  postgreDB.destroy(id)
    .then(() => {
      response.send('Deleted')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

app.delete('/destroycompleted', urlEncoder, function (request, response) {
  postgreDB.destroyCompleted()
    .then(() => {
      response.send('Deleted')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

app.put('/updateall', urlEncoder, function (request, response) {
  if (!request.body) response.sendStatus(500)
  const status = request.body.status

  if ((status === null || status === undefined)) {
    response.sendStatus(500)
    return
  }
  postgreDB.updateAll(status)
    .then(() => {
      response.send('Updated')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

app.put('/update/:id', urlEncoder, function (request, response) {
  if (!request.body) response.sendStatus(500)
  const task = request.body.task
  const status = request.body.status
  const id = request.params.id
  if (!id || !task && (status === null)) {
    response.sendStatus(500)
    return
  }
  postgreDB.update(task, id, status)
    .then(() => {
      response.send('Updated')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

app.listen(8080)
