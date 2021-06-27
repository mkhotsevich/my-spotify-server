const SpotifyWebApi = require('spotify-web-api-node')
const config = require('config')

const spotifyConfig = config.get('spotify')

module.exports = new SpotifyWebApi({
  clientId: spotifyConfig.clientId,
  clientSecret: spotifyConfig.clientSecret,
  redirectUri: spotifyConfig.redirectUri
})
