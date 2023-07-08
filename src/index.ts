import config from 'config';
import { app } from './app';

import { Logger } from './utils/chalk';

const PORT = Number(config.get<string>('APP.PORT'));

// require('dotenv').config()
// const CronJob = require('cron').CronJob
// const db = require('quick.db')
// const moment = require('moment')

// const app = require('./app')
// const spotify = require('./spotify/spotify')

// if (!db.has('time')) {
//   db.set('time', 60 * 60 * 24 * 7)
// }

(async () => {
  await Logger.startingServer();
  app.listen(PORT, () => Logger.serverStarted(PORT));
})();

// const job = new CronJob('0 */10 * * * *', async () => {
//   const refreshToken = db.get('tokens.refreshToken')
//   spotify.setRefreshToken(refreshToken)
//   const {
//     body: { access_token }
//   } = await spotify.refreshAccessToken()
//   db.set('tokens.accessToken', access_token)
//   console.log(`Token updated at: ${moment().format('HH:mm DD.MM')}`)
// })
// const timer = new CronJob('* * * * * *', async () => {
//   let time = parseInt(db.get('time'))
//   --time
//   db.set('time', time)
// })
// job.start()
// timer.start()

// process.on('SIGTERM', () => {
//   console.log('Сигнал SIGTERM получен.')
//   console.log('Выключение сервера...')
//   server.close(() => {
//     console.log('Сервер выключен.')
//     process.exit(0)
//   })
// })
