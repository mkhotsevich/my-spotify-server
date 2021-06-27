const { DataTypes } = require('sequelize')
const database = require('../database')

module.exports = database.define('User', {
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  spotifyId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: DataTypes.STRING
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
