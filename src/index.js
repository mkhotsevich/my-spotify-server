require('dotenv').config()
const CronJob = require('cron').CronJob
const db = require('quick.db')

const app = require('./app')
const spotify = require('./spotify/spotify')

const job = new CronJob('* */60 * * * *', async () => {
  const refreshToken = db.get('tokens.refreshToken')
  spotify.setRefreshToken(refreshToken)
  const {
    body: { access_token }
  } = await spotify.refreshAccessToken()
  db.set('tokens.accessToken', access_token)
  console.log('token updated')
})
job.start()

const server = app.listen(5000, () =>
  console.log('Server started on port 5000')
)

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  console.log('Closing http server.')
  server.close(() => {
    console.log('Http server closed.')
    process.exit(0)
  })
})
