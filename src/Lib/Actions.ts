import axios from 'axios'
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'

interface randomProps {
  setLoading: React.Dispatch<React.SetStateAction<any>>
  setRandomData: React.Dispatch<React.SetStateAction<any>>
  setTrackPlayStorage: React.Dispatch<React.SetStateAction<any>>
}

interface similarProps extends randomProps {
  randomData: null
}

interface playlistProps {
  likedSongs: string
  setPlaylist: React.Dispatch<React.SetStateAction<never[]>>
  setLikedSongs: React.Dispatch<React.SetStateAction<string>>
}

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
      'https://randify-info.herokuapp.com/expired?auth=' +
        localStorage.accessToken
    )
    if (response.data['expired info'].expired === false) {
      window.location.href = 'https://www.tuneshuffle.com/shuffle'
    }
  } catch (err) {
    console.log(err)
  }
}

const getRandomSong = async ({
  setLoading,
  setRandomData,
  setTrackPlayStorage,
}: randomProps) => {
  setLoading(false)
  try {
    const response = await axios.get(
      'https://randify-info.herokuapp.com/random?'
    )
    setRandomData(response.data['random info'])
    setTrackPlayStorage('spotify:track:' + response.data['random info'].id)
  } catch (e) {
    console.log(e)
  }
}

const getSimilarSong = async ({
  randomData,
  setLoading,
  setRandomData,
  setTrackPlayStorage,
}: similarProps) => {
  setLoading(false)
  try {
    const response = await axios.get(
      'https://randify-info.herokuapp.com/recommendation?id=' + randomData.id
    )
    setRandomData(response.data['recommendation info'])
    setTrackPlayStorage(
      'spotify:track:' + response.data['recommendation info'].id
    )
    setLoading(true)
  } catch (e) {
    console.log(e)
  }
}

const createNewPlaylist = async ({
  likedSongs,
  setPlaylist,
  setLikedSongs,
}: playlistProps) => {
  try {
    const response = await axios.get(
      'https://randify-info.herokuapp.com/playlist?auth=' +
        localStorage.accessToken +
        '&id=' +
        likedSongs
    )
    console.log('Songs added to new spotify playlist')
    setPlaylist([])
    setLikedSongs('')
  } catch (e) {
    console.log(e)
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

export const GLOBAL_ACTIONS = {
  getReturnedParamsFromSpotifyAuth,
  getRandomSong,
  getSimilarSong,
  createNewPlaylist,
  alertExpiring,
  isSessionExpired,
}
