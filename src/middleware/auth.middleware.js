const createError = require('http-errors')

const jwt = require('../utils/jwt')

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return next(createError(401))

    const payload = jwt.verify(token)
    if (!user) return next(createError(401))

    payload.accessToken = user.accessToken
    req.user = payload
    return next()
  } catch (e) {
    return next(createError(401))
  }
}
