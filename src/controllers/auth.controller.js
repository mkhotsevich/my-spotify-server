const createError = require('http-errors')
const config = require('config')
const db = require('quick.db')
const uuid = require('uuid')

const spotify = require('../spotify/spotify')

const { scopes } = config.get('spotify')

module.exports.redirectToAuthorizeURL = (req, res, next) => {
  try {
    const state = uuid.v4()
    const authorizeURL = spotify.createAuthorizeURL(scopes, state, true)
    return res.redirect(authorizeURL)
  } catch (e) {
    console.error(e)
    return next(createError(500, e))
  }
}

module.exports.getAccessToken = async (req, res, next) => {
  try {
    const { code } = req.query
    if (!code) return next(createError(401))

    const authData = await spotify.authorizationCodeGrant(code)
    const { access_token, refresh_token } = authData.body
    db.set('tokens', { accessToken: access_token, refreshToken: refresh_token })

    return res.redirect('/')
  } catch (e) {
    console.error(e)
    return next(createError(500, e))
  }
}
