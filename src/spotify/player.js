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
        isListening: false
      }
    }

    const {
      item: {
        name,
        artists,
        uri,
        album: { images }
      }
    } = body

    const artistsNames = artists.map(a => a.name).join(', ')
    const image = images.shift().url

    return {
      name,
      author: artistsNames,
      uri,
      image,
      isListening: true
    }
  } catch (e) {
    console.log(e)
    return new Error(e)
  }
}
