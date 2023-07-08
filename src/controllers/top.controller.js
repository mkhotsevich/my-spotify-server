const createError = require('http-errors')
const db = require('quick.db')
const { getTopTracks, getTopArtists } = require('../spotify/top')

module.exports.getTopTracks = async (req, res, next) => {
  try {
    const accessToken = db.get('tokens.accessToken')
    const topTracks = await getTopTracks(accessToken)
    return res.render('tracks', { title: 'Top Tracks', topTracks })
  } catch (e) {
    console.error(e)
    return next(createError(500, e))
  }
}

module.exports.getTopArtists = async (req, res, next) => {
  try {
    const accessToken = db.get('tokens.accessToken')
    const topArtists = await getTopArtists(accessToken)
    return res.render('artists', { title: 'Top Artists', topArtists })
  } catch (e) {
    console.error(e)
    return next(createError(500, e))
  }
}
