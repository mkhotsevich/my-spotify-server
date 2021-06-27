const { Sequelize } = require('sequelize')
const config = require('config')

const { name, username, password, dialect, host, port } = config.get('database')

module.exports = new Sequelize(name, username, password, {
  dialect,
  host,
  port
})
