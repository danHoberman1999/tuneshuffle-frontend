import SpotifyPlayer from 'react-spotify-web-playback'

const MusicPlayer = (trackPlay: any) => {
  return (
    <div className='sdkContainer'>
      <SpotifyPlayer
        token={localStorage.accessToken}
        uris={[trackPlay]}
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
  )
}

export default MusicPlayer
