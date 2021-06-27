const jwt = require('jsonwebtoken')
const config = require('config')

const { secret, expiresIn } = config.get('jwt')

module.exports.sign = userId => {
  return jwt.sign({ userId }, secret, { expiresIn })
}

module.exports.verify = token => {
  return jwt.verify(token, secret)
}
