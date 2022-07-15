import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import { CONSTANTS } from './Constants'

const getReturnedParamsFromSpotifyAuth = (hash: any) => {
  const stringAfterHashtag = hash.substring(1)
  const paramsInUrl = stringAfterHashtag.split('&')
  const paramsSplitUp = paramsInUrl.reduce(
    (accumulater: any, currentValue: any) => {
      const [key, value] = currentValue.split('=')
      accumulater[key] = value
      return accumulater
    },
    {}
  )

  return paramsSplitUp
}

const isSessionExpired = async () => {
  try {
    const response = await axios.get(
      CONSTANTS.IS_EXPIRED_API_URL + 'auth=' + localStorage.accessToken
    )
    if (response.data['expired info'].expired === false) {
      window.location.href = CONSTANTS.TUNESHUFFLE_URL + 'shuffle'
    }
  } catch (err) {
    console.log(err)
  }
}

const alertExpiring = () => {
  confirmAlert({
    title: 'Session about to expire',
    message: 'Make sure to add playlist to Spotify',
    buttons: [
      {
        label: 'Confirm',
      },
    ],
  })
}

export const GLOBAL_METHODS = {
  getReturnedParamsFromSpotifyAuth,
  alertExpiring,
  isSessionExpired,
}
