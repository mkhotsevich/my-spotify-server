const { Router } = require('express')
const createError = require('http-errors')
const { authMiddleware } = require('../middleware/auth.middleware')

const spotifyApi = require('../spotify')

const router = Router()

router.get('/me', authMiddleware, async (req, res) => {
  try {
    spotifyApi.setAccessToken(req.user.accessToken)
    const { body } = await spotifyApi.getMe()
    return res.status(200).json(body)
  } catch (e) {
    return createError(500)
  }
})

module.exports = router
