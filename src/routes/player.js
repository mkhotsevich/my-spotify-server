const { Router } = require('express')
const { addToQueue } = require('../controllers/player.controller')

const router = Router()

router.get('/add-to-queue', addToQueue)

module.exports = router
