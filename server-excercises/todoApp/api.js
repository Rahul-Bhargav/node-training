const postgreDB = require('./databaseInterface')

const api = {}

api.readTasks = function (request, response) {
  return postgreDB.read()
    .then((result) => {
      response.json(result)
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
}

api.writeTask = function (request, response) {
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
}

api.destroyTask = function (request, response) {
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
}

api.destroyCompleted = function (request, response) {
  postgreDB.destroyCompleted()
    .then(() => {
      response.send('Delete completed')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
}

api.updateAll = function (request, response) {
  if (!request.body) response.sendStatus(500)
  const status = request.body.status

  if ((status === null || status === undefined)) {
    response.sendStatus(500)
    return
  }
  postgreDB.updateAll(status)
    .then(() => {
      response.send('Updated all')
    })
    .catch((error) => {
      response.sendStatus(500)
      console.error(error)
    })
}

api.updateTask = function (request, response) {
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
}

module.exports = api
