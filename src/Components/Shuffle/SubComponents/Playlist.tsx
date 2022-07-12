const Playlist = () => {
  return (
    <div
      className='likedSongPlaylist'
      style={{ height: '25vh', overflow: 'scroll' }}
    >
      <div>
        <form>
          <table>
            <thead>
              <tr>
                <th>Track:</th>
                <th>Artists:</th>
              </tr>
            </thead>
            <tbody>{playlistTracker.map(createPlaylist)}</tbody>
          </table>
        </form>
        <button className='addSpotify' onClick={addSpotify}>
          Add to Spotify
        </button>
      </div>
    </div>
  )
}

export default Playlist
