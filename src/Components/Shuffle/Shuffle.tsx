import React, { useState, useEffect, CSSProperties } from 'react'
import { GLOBAL_METHODS } from '../../Lib/Methods'
import Playlist from './SubComponents/Playlist'
import { CONSTANTS } from '../../Lib/Constants'
import axios from 'axios'
import ScaleLoader from 'react-spinners/ScaleLoader'
import SpotifyPlayer from 'react-spotify-web-playback'
import './style.scss'

interface RandomDataProps {
  name?: string
  image?: string
  artists?: string
  id?: string
}

const Shuffle = () => {
  const [randomData, setRandomData] = useState<RandomDataProps>({})
  const [imageScanLoading, setImageScanLoading] = useState(true)
  const [imageAPILoading, setImageAPILoading] = useState(true)
  let [loaderColor, setLoaderColor] = useState('#ffffff')
  const [playlist, setPlaylist] = useState([])
  const [trackPlayStorage, setTrackPlayStorage] = useState('')
  const [likedSongs, setLikedSongs] = useState('')
  const [imageGradient, setImageGradient] = useState([])

  const getRandomSong = async () => {
    setImageAPILoading(true)
    try {
      const response = await axios.get(CONSTANTS.FETCH_RANDOM_API_URL)
      setRandomData(response.data['random info'])
      setTrackPlayStorage('spotify:track:' + response.data['random info'].id)
      const imageLoaded = setTimeout(() => {
        setImageAPILoading(false)
      }, 1000)
    } catch (e) {
      console.log(e)
    }
  }

  const createNewPlaylist = async () => {
    try {
      const response = await axios.get(
        CONSTANTS.CREATE_PLAYLIST_URL +
          'auth=' +
          localStorage.accessToken +
          '&id=' +
          likedSongs
      )
      setPlaylist([])
      setLikedSongs('')
    } catch (e) {
      console.log(e)
    }
  }

  const ImageColorDetection = async (imageUrl: any) => {
    try {
      const response = await axios.get(CONSTANTS.SIGHT_ENGINE_URL, {
        params: {
          url: imageUrl,
          models: 'properties',
          api_user: CONSTANTS.SIGHT_ENGINE_CLIENT_ID,
          api_secret: CONSTANTS.SIGHT_ENGINE_SECRET,
        },
      })
      setImageGradient(response['data']['colors']['other'])
      setImageScanLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
  }

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
    getRandomSong()
  }, [])

  return (
    <div
      className='container'
      style={{
        background: imageScanLoading
          ? 'linear-gradient(#ec008c, #fc6767)'
          : 'linear-gradient(' +
            `${imageGradient[0]['hex']}` +
            ',' +
            `${imageGradient[2]['hex']}` +
            ')',
      }}
    >
      <div className='shuffleContainer'>
        {imageAPILoading ? (
          <div className='loaderContainer'>
            <ScaleLoader
              color={loaderColor}
              loading={imageAPILoading}
              cssOverride={override}
            />
          </div>
        ) : (
          <div className='albumContainer'>
            <img
              className='albumImage'
              src={randomData.image}
              alt='random album from spotify'
            />
          </div>
        )}
        <div className='music-info-container'>
          <h1 className='songName'>{randomData.name}</h1>
          <h2 className='artistName'>{randomData.artists}</h2>
          <div className='sdkContainer'>
            <SpotifyPlayer
              token={localStorage.accessToken}
              uris={[trackPlayStorage]}
              styles={{
                activeColor: 'rgba(255, 0, 0, 0)',
                bgColor: 'rgba(255, 0, 0, 0)',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#fff',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
              }}
            />
          </div>
          <div className='buttonContainer'>
            <button
              onClick={() => {
                getRandomSong()
                ImageColorDetection(randomData.image)
              }}
              className='shuffleButton'
            >
              Shuffle
            </button>
            <button
              onClick={() => createNewPlaylist()}
              className='shuffleButton'
            >
              + Playlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shuffle
