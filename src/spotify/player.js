const moment = require('moment')
const axios = require('axios')
const spotify = require('./spotify')

module.exports.getCurrentPlayingTrack = async accessToken => {
  try {
    spotify.setAccessToken(accessToken)
    const { body } = await spotify.getMyCurrentPlayingTrack()
    if (Object.keys(body).length === 0) {
      return {
        name: '',
        author: '',
        uri: '',
        image: '',
        isListening: false,
        durationMs: 0,
        progressMs: 0
      }
    }
    const {
      item: {
        name,
        artists,
        uri,
        album: { images },
        duration_ms
      },
      progress_ms
    } = body

    const artistsNames = artists.map(a => a.name).join(', ')
    const image = images.shift().url

    return {
      name,
      author: artistsNames,
      uri,
      image,
      isListening: true,
      durationMs: duration_ms,
      progressMs: progress_ms
    }
  } catch (e) {
    console.log(e)
    return new Error(e)
  }
}

module.exports.getRecentlyPlayedTracks = async accessToken => {
  try {
    spotify.setAccessToken(accessToken)
    const {
      body: { items }
    } = await spotify.getMyRecentlyPlayedTracks({ limit: 5 })

    const recentlyTrack = items.map(i => {
      const {
        track: {
          artists,
          name,
          uri,
          album: { images }
        },
        played_at
      } = i

      const artistsNames = artists.map(a => a.name).join(', ')
      const image = images.shift().url
      const date = moment(played_at).format('HH:mm DD.MM')
      return {
        name,
        author: artistsNames,
        uri,
        image,
        playedAt: date
      }
    })
    return recentlyTrack
  } catch (e) {
    console.log(e)
    return new Error(e)
  }
}

module.exports.addToQueue = async (accessToken, uri) => {
  try {
    await axios.post(
      `https://api.spotify.com/v1/me/player/queue?uri=${uri}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

module.exports.skipToNext = async accessToken => {
  try {
    spotify.setAccessToken(accessToken)
    await spotify.skipToNext()
  } catch (e) {
    console.log(e)
    return new Error(e)
  }
}
