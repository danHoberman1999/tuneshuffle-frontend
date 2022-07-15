import { CONSTANTS } from '../Constants'

const CLIENT_ID: string = '96094bf1e5d945aaaebfc3df6f01d97c' // need to take out and put back as .env
const SPOTIFY_AUTHORIZE_ENDPOINT: string =
  CONSTANTS.SPOTIFY_CONNECTION + 'authorize'
const REDIRECT_URL_AFTER_LOGIN: string = CONSTANTS.TUNESHUFFLE_URL + 'shuffle'
const SPACE_DELIMITER: string = '%20'
const SCOPES: string[] = [
  'user-read-playback-state',
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state',
  'playlist-modify-public',
  'playlist-modify-private',
]
const SCOPES_URL_PARAM: string = SCOPES.join(SPACE_DELIMITER)

export const LOGIN_DATA = {
  CLIENT_ID,
  SPOTIFY_AUTHORIZE_ENDPOINT,
  REDIRECT_URL_AFTER_LOGIN,
  SPACE_DELIMITER,
  SCOPES,
  SCOPES_URL_PARAM,
}
