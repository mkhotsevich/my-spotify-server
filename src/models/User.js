const { DataTypes } = require('sequelize')
const database = require('../database')

module.exports = database.define('User', {
  spotifyId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})
