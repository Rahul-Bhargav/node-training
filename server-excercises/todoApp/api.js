const postgreDB = require('./postgresInterface')

const api = {}

api.readTasks = function () {
  return postgreDB.read()
}

api.writeTask = function (task) {
  if (typeof task !== 'string') return `description-${task} is not a string`
  return postgreDB.insert(task)
}

api.destroyTask = function (id) {
  if (isNaN(parseInt(id))) return `id-${id} is not a valid number`
  return postgreDB.destroy(id)
}

api.destroyCompleted = function () {
  return postgreDB.destroyCompleted()
}

api.updateAll = function (status) {
  if (typeof status !== 'boolean') return `status given is not a boolean`
  return postgreDB.updateAll(status)
}

api.updateTask = function (id, task, status) {
  const isValid = checkValidity(id, task, status)
  if (isValid !== true) return isValid
  return postgreDB.update(task, id, status)
}

const checkValidity = function (id, description, status) {
  if (isFloat(id)) return `id-${id} is not a valid number`
  if (isNaN(parseInt(id))) return `id-${id} is not a valid number`

  if (typeof description !== 'string') return `description-${description} is not a string`

  if (typeof status !== 'boolean') return `status given is not a boolean`

  return true
}

function isFloat (n) {
  return Number(n) === n && n % 1 !== 0
}

module.exports = api
