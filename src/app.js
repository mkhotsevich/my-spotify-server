const express = require('express')
const morgan = require('morgan')
const db = require('quick.db')
const path = require('path')

const {
  getCurrentPlayingTrack,
  getRecentlyPlayedTracks
} = require('./spotify/player')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use(morgan('dev'))

app.use('/auth', require('./routes/auth'))
app.use('/top', require('./routes/top'))

app.get('/', async (req, res) => {
  const accessToken = db.get('tokens.accessToken')
  const { name, author, image, uri, isListening } =
    await getCurrentPlayingTrack(accessToken)

  const recentlyTrack = await getRecentlyPlayedTracks(accessToken)
  return res.render('index', {
    image,
    name,
    author,
    isListening,
    uri,
    recentlyTrack,
    cache: false,
    title: isListening ? 'Now Playing...' : "I'm busy"
  })
})

module.exports = app
