const express = require('express')
const app = express()
const routes = require('./routes')
app.use(express.static('public'))

app.use(routes)

app.listen(8080)
