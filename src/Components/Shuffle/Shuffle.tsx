import React, { useState, useEffect } from 'react'
import { GLOBAL_METHODS } from '../../Lib/Methods'
import MusicPlayer from './SubComponents/MusicPlayer'
import Playlist from './SubComponents/Playlist'
import { CONSTANTS } from '../../Lib/Constants'

interface RandomDataProps {
  name?: string
  image?: any
  artists?: string
  id?: string
}

const Shuffle = () => {
  const [randomData, setRandomData] = useState<RandomDataProps>({})
  const [loading, setLoading] = useState(true)
  const [playlist, setPlaylist] = useState([])
  const [trackPlayStorage, setTrackPlayStorage] = useState('')
  const [likedSongs, setLikedSongs] = useState('')

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        GLOBAL_METHODS.getReturnedParamsFromSpotifyAuth(window.location.hash)

      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('tokenType', token_type)
      localStorage.setItem('expiresIn', expires_in)

      const alertTimer = setTimeout(() => {
        GLOBAL_METHODS.alertExpiring()
      }, CONSTANTS.WINDOW_ALLOCATED_TIME)

      const windowTimer = setTimeout(() => {
        localStorage.clear()
        window.location.href = CONSTANTS.TUNESHUFFLE_URL
      }, CONSTANTS.WINDOW_ALLOCATED_TIME)

      clearTimeout(alertTimer)
      clearTimeout(windowTimer)
      return
    }
    GLOBAL_METHODS.isSessionExpired()
  })

  useEffect(() => {
    GLOBAL_METHODS.getRandomSong({
      setLoading,
      setRandomData,
      setTrackPlayStorage,
    })
  }, [])

  return (
    <div className='shuffleContainer'>
      <div className='albumContainer'>
        <img
          className='albumImage'
          src={randomData.image}
          alt='random album from spotify'
        />
      </div>
      <div className='music-info-container'>
        <h1 className='songName'>{randomData.name}</h1>
        <h2 className='artistName'>{randomData.artists}</h2>
        <MusicPlayer />
        <div className='buttonContainer'>
          <button
            onClick={() =>
              GLOBAL_METHODS.getRandomSong({
                setLoading,
                setRandomData,
                setTrackPlayStorage,
              })
            }
            className='shuffleButton'
          ></button>
        </div>
      </div>
      <Playlist />
    </div>
  )
}

export default Shuffle
