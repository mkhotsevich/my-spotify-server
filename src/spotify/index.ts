import SpotifyWebApi from "spotify-web-api-node";
import config from 'config'

const clientId = config.get<string>('SPOTIFY.CLIENT_ID')
const redirectUri = config.get<string>('SPOTIFY.REDIRECT_URI')
const clientSecret = config.get<string>('SPOTIFY.CLIENT_SECRET')

export const spotify = new SpotifyWebApi({ clientId, clientSecret, redirectUri })
