const { Router } = require('express')
const { addToQueue, currentTrackProgress } = require('../controllers/player.controller')

const router = Router()

router.get('/add-to-queue', addToQueue)
router.get('/current-track-progress', currentTrackProgress)

module.exports = router
