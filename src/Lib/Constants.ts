const TUNESHUFFLE_URL: string = 'https://tuneshuffle.herokuapp.com/'
const BACKEND_API_URL: string = 'https://randify-info.herokuapp.com/'
const FETCH_RANDOM_API_URL: string = BACKEND_API_URL + 'random?'
const FETCH_RECOMMENDATION_API_URL: string = BACKEND_API_URL + 'recommendation?'
const IS_EXPIRED_API_URL: string = BACKEND_API_URL + 'expired?'
const CREATE_PLAYLIST_URL: string = BACKEND_API_URL + 'playlist?'
const SPOTIFY_CONNECTION: string = 'https://accounts.spotify.com/'
const SIGHT_ENGINE_URL: string = 'https://api.sightengine.com/1.0/check.json'
const SIGHT_ENGINE_CLIENT_ID: string = String(
  process.env.REACT_APP_SIGHT_ENGINE_CLIENT_ID
)
const SIGHT_ENGINE_SECRET: string = String(
  process.env.REACT_APP_SIGHT_ENGINE_SECRET
)

export const CONSTANTS = {
  TUNESHUFFLE_URL,
  BACKEND_API_URL,
  FETCH_RANDOM_API_URL,
  FETCH_RECOMMENDATION_API_URL,
  IS_EXPIRED_API_URL,
  CREATE_PLAYLIST_URL,
  SPOTIFY_CONNECTION,
  SIGHT_ENGINE_URL,
  SIGHT_ENGINE_CLIENT_ID,
  SIGHT_ENGINE_SECRET,
}
