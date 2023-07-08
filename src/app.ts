import express from 'express'
import { authRoutes } from './routes/auth'


export const app = express()

// const morgan = require('morgan')
// const db = require('quick.db')
// const path = require('path')
// const Ddos = require('ddos')

// const {
//   getCurrentPlayingTrack,
//   getRecentlyPlayedTracks
// } = require('./spotify/player')

// const ddos = new Ddos({ burst: 50, limit: 50 })

// app.use(ddos.express)
// app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, 'views'))
// app.use(express.static(path.resolve(__dirname, '..', 'public')))

// app.use(morgan('dev'))

app.use('/auth', authRoutes)
// app.use('/top', require('./routes/top'))
// app.use('/player', require('./routes/player'))
// app.use('/timer', require('./routes/timer'))

// // app.get('/', async (req, res) => {
// //   return res.render('quest', { title: 'Quest' })
// // })

// app.get('/', async (req, res) => {
//   const accessToken = db.get('tokens.accessToken')
//   const { name, author, image, uri, isListening } =
//     await getCurrentPlayingTrack(accessToken)

//   const recentlyTrack = await getRecentlyPlayedTracks(accessToken)
//   return res.render('index', {
//     image,
//     name,
//     author,
//     isListening,
//     uri,
//     recentlyTrack,
//     cache: false,
//     title: isListening ? 'Now Playing...' : "I'm busy"
//   })
// })

// module.exports = app
