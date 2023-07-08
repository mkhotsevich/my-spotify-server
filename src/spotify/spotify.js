const SpotifyWebApi = require('spotify-web-api-node')
const config = require('config')

const { clientId, clientSecret, redirectUri } = config.get('spotify')

module.exports = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri:
    process.env.NODE_ENV === 'development' ? redirectUri[1] : redirectUri[0]
})
