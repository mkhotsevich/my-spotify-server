import { Router } from 'express'
import { v4 } from 'uuid'
import { spotify } from '../spotify'
import config from 'config'
import { Logger } from '../utils/chalk'
import { ERROR_MESSAGES } from '../utils/consts'
import { errorMiddleware } from '../middleware/error.middleware'

const scopes = config.get<string[]>('SPOTIFY.SCOPES')

export const authRoutes = Router()

authRoutes.get('/', (req, res) => {
  try {
    const state = v4()
    const authorizeURL = spotify.createAuthorizeURL(scopes, state, true)
    return res.redirect(authorizeURL)
  } catch (error: unknown) {
    return errorMiddleware(error, req, res)
  }
})

authRoutes.get('/redirect', async (req, res) => {
  try {
    const code = req.query.code as string | undefined
    if (!code) {
      Logger.httpError(401, req.originalUrl, ERROR_MESSAGES.CODE_QUERY_ERROR)
      return res.send(ERROR_MESSAGES.CODE_QUERY_ERROR)
    }

    const authData = await spotify.authorizationCodeGrant(code)
    const { access_token, refresh_token } = authData.body

    return res.redirect('/')
  } catch (error) {
    return errorMiddleware(error, req, res)
  }
})

