const postgreDB = require('./dabataseInterface')
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
    .then(() => {
      response.send(`Succesfully added ${task} to the database`)
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
    .then((result) => {
      if (result.rowCount === 0) {
        response.sendStatus(500)
        console.log(`Delete Index does not exist`)
      }
      response.send(`Succesfully deleted ID:${id} from the database`)
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

app.put('/update/:id', urlEncoder, function (request, response) {
  console.log(request.body)
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
      response.send(`Succesfully updated ID:${id} in the database`)
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

app.listen(8080)
