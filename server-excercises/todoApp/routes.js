const express = require('express')
const api = require('./api')
const routes = express.Router()
const bodyParser = require('body-parser')
const jsonEncoder = bodyParser.json()

routes.get('/read', (request, response) => {
  api.readTasks()
    .then((result) => {
      response.json(result)
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

routes.post('/write/:task', (request, response) => {
  const task = request.params.task
  api.writeTask(task)
    .then((result) => {
      response.send(result)
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

routes.delete('/destroy/:id', jsonEncoder, (request, response) => {
  const id = request.params.id
  api.destroyTask(id)
    .then(() => {
      response.send('Deleted')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

routes.delete('/destroycompleted', jsonEncoder, (request, response) => {
  api.destroyCompleted()
    .then(() => {
      response.send('Delete completed')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

routes.put('/updateall', jsonEncoder, (request, response) => {
  if (!request.body) response.sendStatus(500)
  const status = request.body.status
  api.updateAll(status)
    .then(() => {
      response.send('Updated all')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

routes.put('/update/:id', jsonEncoder, (request, response) => {
  if (!request.body) response.sendStatus(500)
  const task = request.body.task
  const status = request.body.status
  const id = request.params.id
  api.updateTask(id, task, status)
    .then(() => {
      response.send('Updated')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
})

module.exports = routes
