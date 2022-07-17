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
  genre?: string
  year?: string
}

const Shuffle = () => {
  const [randomData, setRandomData] = useState<RandomDataProps>({})
  const [imageScanLoading, setImageScanLoading] = useState(true)
  const [imageAPILoading, setImageAPILoading] = useState(true)
  let [loaderColor, setLoaderColor] = useState('#ffffff')
  const [trackPlayStorage, setTrackPlayStorage] = useState('')
  const [imageGradient, setImageGradient] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [currentGenre, setCurrentGenre] = useState<string | undefined>('')
  const [mode, setMode] = useState<'light' | 'dark' | undefined>(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  )

  const getRandomSong = async () => {
    setImageAPILoading(true)

    try {
      const response = await axios.get(CONSTANTS.FETCH_RANDOM_API_URL)
      setRandomData(response.data['random info'])
      setTrackPlayStorage('spotify:track:' + response.data['random info'].id)
      const imageLoaded = setTimeout(() => {
        setImageAPILoading(false)
      }, 500)
      setFirstLoad(false)
      setCurrentGenre(response.data['random info']['random_genre'])
      ImageColorDetection(randomData.image)
    } catch (e) {
      console.log(e)
      getRandomSong()
    }
  }

  const getSimilarSong = async () => {
    setImageAPILoading(true)
    try {
      const response = await axios.get(
        CONSTANTS.FETCH_RECOMMENDATION_API_URL + 'id=' + randomData.id
      )
      setRandomData(response.data['recommendation info'])
      setTrackPlayStorage(
        'spotify:track:' + response.data['recommendation info'].id
      )
      const imageLoaded = setTimeout(() => {
        setImageAPILoading(false)
      }, 500)
      ImageColorDetection(randomData.image)
    } catch (e) {
      console.log(e)
      getRandomSong()
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
      if (response['data']['colors']['other'].length < 2) {
        setImageScanLoading(true)
      }
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
    const modeMe = (e: any) => {
      setMode(e.matches ? 'dark' : 'light')
      window.location.reload() // look for better solution to update musicPlayer colors
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', modeMe)
    return window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeListener(modeMe)
  }, [])

  useEffect(() => {
    console.log(randomData)
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
            `${imageGradient[1]['hex']}` +
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
        <div
          className='music-info-container'
          style={{
            background: mode === 'dark' ? '#1c1c1e' : '#d6d6c1',
            opacity: '0.7',
          }}
        >
          <h1
            className='songName'
            style={{
              color: mode === 'light' ? '#000000' : '#fff',
            }}
          >
            {randomData.name}
          </h1>
          {firstLoad ? (
            <h2 className='artistName'></h2>
          ) : (
            <h2
              className='artistName'
              style={{
                color: mode === 'light' ? '#404047' : '#c7c7cc',
              }}
            >
              {randomData.artists} — {randomData.genre} ({randomData.year})
            </h2>
          )}

          <div className='sdkContainer'>
            <SpotifyPlayer
              token={localStorage.accessToken}
              uris={[trackPlayStorage]}
              styles={{
                sliderHandleColor: 'rgba(255, 0, 0, 0)',
                bgColor: 'rgba(255, 0, 0, 0)',
                color: mode === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
                loaderColor:
                  mode === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
                sliderColor:
                  mode === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
                sliderTrackColor: mode === 'light' ? '#888894' : '#dca8b2',
              }}
            />
          </div>
          <div className='buttonContainer'>
            <button
              onClick={() => {
                getRandomSong()
              }}
              className='buttonDecoration'
              style={{
                color: mode === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
                background: mode === 'light' ? '#d6d6c1' : '#1c1c1e',
              }}
            >
              Random
            </button>
            <button
              onClick={() => {
                getSimilarSong()
              }}
              className='buttonDecoration similarButton '
              style={{
                color: mode === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
                background: mode === 'light' ? '#d6d6c1' : '#1c1c1e',
              }}
            >
              Similar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shuffle
