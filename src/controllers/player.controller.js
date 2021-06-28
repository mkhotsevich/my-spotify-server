const createError = require('http-errors')
const db = require('quick.db')
const { searchTrack } = require('../spotify/search')
const { addToQueue, skipToNext } = require('../spotify/player')

module.exports.addToQueue = async (req, res, next) => {
  try {
    const accessToken = db.get('tokens.accessToken')
    const { search } = req.query
    const track = await searchTrack(accessToken, search)
    if (Object.keys(track).length === 0) return next(createError(404))
    await addToQueue(accessToken, track.uri)
    await skipToNext(accessToken)
    return res.redirect('/')
  } catch (e) {
    console.error(e)
    return next(createError(500, e))
  }
}
