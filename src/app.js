const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))

module.exports = app
