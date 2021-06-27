const { Router } = require('express')
const config = require('config')
const uuid = require('uuid')

const User = require('../models/User')
const spotifyApi = require('../spotify')
const jwt = require('../utils/jwt')

const router = Router()
const spotifyConfig = config.get('spotify')

router.get('/', (req, res) => {
  const state = uuid.v4()
  const authorizeURL = spotifyApi.createAuthorizeURL(
    spotifyConfig.scopes,
    state
  )
  return res.redirect(authorizeURL)
})

router.get('/redirect', async (req, res) => {
  try {
    const { code } = req.query
    const authData = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = authData.body
    spotifyApi.setAccessToken(access_token)

    const getMeData = await spotifyApi.getMe()
    const { country, display_name, email, id, images } = getMeData.body

    const user = await User.findOrCreate({
      where: { spotifyId: id },
      defaults: {
        country,
        name: display_name,
        email,
        spotifyId: id,
        image: images[0].url,
        accessToken: access_token,
        refreshToken: refresh_token
      }
    })

    const jwtToken = jwt.sign(user.shift().id)

    return res.status(201).json({ accessToken: jwtToken })
  } catch (e) {
    console.error(e)
    return res.status(500).json(e)
  }
})

module.exports = router
