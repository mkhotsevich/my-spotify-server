const spotify = require('./spotify')

module.exports.searchTrack = async (accessToken, search) => {
  try {
    spotify.setAccessToken(accessToken)
    const {
      body: {
        tracks: { items }
      }
    } = await spotify.searchTracks(search, { limit: 1 })

    if (!items.length) return {}

    const {
      name,
      uri,
      artists,
      album: { images }
    } = items.shift()
    const artistsNames = artists.map(a => a.name).join(', ')
    const image = images.shift().url
    return {
      name,
      author: artistsNames,
      image,
      uri
    }
  } catch (e) {
    console.log(e)
    return new Error(e)
  }
}
