const SpotifyWebApi = require('spotify-web-api-node')
const config = require('config')

const { clientId, clientSecret, redirectUri } = config.get('spotify')

module.exports = new SpotifyWebApi({ clientId, clientSecret, redirectUri })
