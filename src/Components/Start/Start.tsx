import React, { useEffect } from 'react'
import Header from './Header/Header'
import './style.scss'
import axios from 'axios'
import { LOGIN_DATA } from '../../Lib/Login/Data'

const Start = () => {
  const handleLogin = () => {
    window.location.href = `${LOGIN_DATA.SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${LOGIN_DATA.CLIENT_ID}&redirect_uri=${LOGIN_DATA.REDIRECT_URL_AFTER_LOGIN}&scope=${LOGIN_DATA.SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData()
  })

  return (
    <div className='startContainer'>
      <Header />
      <div className='infoContainer'>
        <h1 className='main-text'>New way to discover music</h1>
        <p className='sub-text'>Millions of song's you never new existed</p>
        <button onClick={handleLogin} className='login-button'>
          Try Tuneshuffle
        </button>
      </div>
    </div>
  )
}

export default Start
