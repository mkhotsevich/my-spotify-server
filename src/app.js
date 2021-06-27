const express = require('express')

const app = express()

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))

module.exports = app
