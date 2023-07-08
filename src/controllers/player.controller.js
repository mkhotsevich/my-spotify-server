const createError = require('http-errors')
const db = require('quick.db')
const { searchTrack } = require('../spotify/search')
const { getCurrentPlayingTrack } = require('../spotify/player')
const { addToQueue, skipToNext } = require('../spotify/player')

module.exports.addToQueue = async (req, res, next) => {
  try {
    const accessToken = db.get('tokens.accessToken')
    const { search } = req.query
    const track = await searchTrack(accessToken, search)
    if (Object.keys(track).length === 0) return next(createError(404))
    await addToQueue(accessToken, track.uri)
    await skipToNext(accessToken)
    setTimeout(() => {
      return res.redirect('/')
    }, 1000)
  } catch (e) {
    console.error(e)
    return next(createError(500, e))
  }
}

module.exports.currentTrackProgress = async (req, res, next) => {
  try {
    const accessToken = db.get('tokens.accessToken')
    const { durationMs, progressMs, name } = await getCurrentPlayingTrack(accessToken)
    const duration = msToMinutes(durationMs)
    const progress = msToMinutes(progressMs)
    return res.json({ duration, progress, name })
  } catch (e) {
    console.error(e)
    return next(createError(500, e))
  }
}

const msToMinutes = ms => {
  const seconds = Math.floor(ms / 1000).toString()
  const minutes = Math.floor(seconds / 60).toString()
  let resultSecs = seconds - minutes * 60
  if (resultSecs.toString().length === 1) {
    resultSecs = `0${resultSecs}`
  }
  return `${minutes}:${resultSecs}`
}
