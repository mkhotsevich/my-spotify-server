const { Router } = require('express')
const { getTopTracks, getTopArtists } = require('../controllers/top.controller')

const router = Router()

router.get('/tracks', getTopTracks)
router.get('/artists', getTopArtists)

module.exports = router
