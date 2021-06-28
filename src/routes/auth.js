const { Router } = require('express')

const {
  redirectToAuthorizeURL,
  getAccessToken
} = require('../controllers/auth.controller')

const router = Router()

router.get('/', redirectToAuthorizeURL)

router.get('/redirect', getAccessToken)

module.exports = router
