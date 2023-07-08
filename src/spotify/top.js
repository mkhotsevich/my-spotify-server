const spotify = require('./spotify')

module.exports.getTopTracks = async accessToken => {
  try {
    spotify.setAccessToken(accessToken)
    const {
      body: { items }
    } = await spotify.getMyTopTracks({ limit: 10 })
    const topTracks = items.map(i => {
      const artistsNames = i.artists.map(a => a.name).join(', ')
      const image = i.album.images.shift().url
      return {
        name: i.name,
        author: artistsNames,
        image,
        uri: i.uri
      }
    })
    return topTracks
  } catch (e) {
    console.log(e)
    return new Error(e)
  }
}

module.exports.getTopArtists = async accessToken => {
  try {
    spotify.setAccessToken(accessToken)
    const {
      body: { items }
    } = await spotify.getMyTopArtists({ limit: 10 })
    const topArtists = items.map(i => {
      const image = i.images.shift().url
      return {
        name: i.name,
        image,
        uri: i.uri
      }
    })
    return topArtists
  } catch (e) {
    console.log(e)
    return new Error(e)
  }
}
