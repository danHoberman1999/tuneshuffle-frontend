import React, { useState, useEffect, CSSProperties } from 'react'
import { GLOBAL_METHODS } from '../../Lib/Methods'
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
  random_genre?: string
  year_track?: string
}

const Shuffle = () => {
  const [randomData, setRandomData] = useState<RandomDataProps>({})
  const [imageScanLoading, setImageScanLoading] = useState(true)
  const [imageAPILoading, setImageAPILoading] = useState(true)
  let [loaderColor, setLoaderColor] = useState('#ffffff')
  const [trackPlayStorage, setTrackPlayStorage] = useState('')
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
      setImageScanLoading(true)
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
      }, (localStorage.expires_in - 200) * 1000)

      const windowTimer = setTimeout(() => {
        localStorage.clear()
        window.location.href = CONSTANTS.TUNESHUFFLE_URL
      }, localStorage.expires_in * 1000)

      clearTimeout(alertTimer)
      clearTimeout(windowTimer)
      return
    }
  })

  useEffect(() => {
    GLOBAL_METHODS.isSessionExpired()
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
        animation: 'fadein 1s',
        animationDelay: '2.5s',
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
          <h2 className='artistName'>
            {randomData.artists} — {randomData.random_genre} (
            {randomData.year_track})
          </h2>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shuffle
