import React, { useState, useEffect } from 'react'
import { GLOBAL_ACTIONS } from '../../Lib/Actions'
import MusicPlayer from './SubComponents/MusicPlayer'
import Playlist from './SubComponents/Playlist'

const Shuffle = () => {
  const [randomData, setRandomData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [playlist, setPlaylist] = useState([])
  const [trackPlayStorage, setTrackPlayStorage] = useState('')
  const [likedSongs, setLikedSongs] = useState('')

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        GLOBAL_ACTIONS.getReturnedParamsFromSpotifyAuth(window.location.hash)

      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('tokenType', token_type)
      localStorage.setItem('expiresIn', expires_in)

      const alertTimer = setTimeout(() => {
        GLOBAL_ACTIONS.alertExpiring()
      }, 3400000)

      const windowTimer = setTimeout(() => {
        localStorage.clear()
        window.location.href = 'https://www.tuneshuffle.com/'
      }, 3600000)

      clearTimeout(alertTimer)
      clearTimeout(windowTimer)
      return
    }
    GLOBAL_ACTIONS.isSessionExpired()
  })

  useEffect(() => {
    GLOBAL_ACTIONS.getRandomSong({
      setLoading,
      setRandomData,
      setTrackPlayStorage,
    })
  }, [])

  return (
    <div className='shuffleContainer'>
      <div className='albumContainer'>
        <img className='albumImage' src={randomData.image} />
      </div>
      <div className='music-info-container'>
        <h1 className='songName'>{randomData.name}</h1>
        <h2 className='artistName'>{randomData.artists}</h2>
        <MusicPlayer />
        <div className='buttonContainer'>
          <button
            onClick={() =>
              GLOBAL_ACTIONS.getRandomSong({
                setLoading,
                setRandomData,
                setTrackPlayStorage,
              })
            }
            className='diceButton'
          >
            <img className='diceButtonImg' src={Img4} alt='Smashicons' />
          </button>
        </div>
      </div>
      <Playlist />
    </div>
  )
}

export default Shuffle
