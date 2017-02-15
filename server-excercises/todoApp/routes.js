const express = require('express')
const api = require('./api')
const routes = express.Router()
const bodyParser = require('body-parser')
const jsonEncoder = bodyParser.json()

routes.get('/read', api.readTasks)

routes.post('/write/:task', api.writeTask)

routes.delete('/destroy/:id', jsonEncoder, api.destroyTask)

routes.delete('/destroycompleted', jsonEncoder, api.destroyCompleted)

routes.put('/updateall', jsonEncoder, api.updateAll)

routes.put('/update/:id', jsonEncoder, api.updateTask)

module.exports = routes
