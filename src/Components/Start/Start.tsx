import React, { useEffect } from 'react'
import Header from './Header/Header'
import './style.scss'
import { LOGIN_DATA } from '../../Lib/Login/Data'
import { GLOBAL_METHODS } from '../../Lib/Methods'

const Start = () => {
  const handleLogin = () => {
    window.location.href = `${LOGIN_DATA.SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${LOGIN_DATA.CLIENT_ID}&redirect_uri=${LOGIN_DATA.REDIRECT_URL_AFTER_LOGIN}&scope=${LOGIN_DATA.SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }

  useEffect(() => {
    GLOBAL_METHODS.isSessionExpired()
  }, [])

  return (
    <div className='startContainer'>
      <Header />
      <div className='infoContainer'>
        <h1 className='main-text'>A New way to discover music</h1>
        <p className='sub-text'>Millions of songs you never knew existed</p>
        <button onClick={handleLogin} className='login-button'>
          Try Tuneshuffle
        </button>
      </div>
    </div>
  )
}

export default Start
