const { Router } = require('express')
const config = require('config')
const uuid = require('uuid')
const createError = require('http-errors')

const User = require('../models/User')
const spotifyApi = require('../spotify')
const jwt = require('../utils/jwt')

const router = Router()
const { scopes } = config.get('spotify')

router.get('/', (req, res) => {
  try {
    const state = uuid.v4()
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state)
    return res.redirect(authorizeURL)
  } catch (e) {
    console.error(e.message)
    return createError(500, e.message)
  }
})

router.get('/redirect', async (req, res) => {
  try {
    const { code } = req.query
    const authData = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = authData.body
    spotifyApi.setAccessToken(access_token)

    const getMeData = await spotifyApi.getMe()
    const { id } = getMeData.body

    const user = await User.findOrCreate({
      where: { spotifyId: id },
      defaults: {
        spotifyId: id,
        accessToken: access_token,
        refreshToken: refresh_token
      }
    })

    const jwtToken = jwt.sign(user.shift().id)

    return res.status(201).json({ accessToken: jwtToken })
  } catch (e) {
    console.error(e.message)
    return createError(500, e.message)
  }
})

module.exports = router
