import { GLOBAL_METHODS } from '../../../Lib/Methods'

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
          </table>
        </form>
      </div>
    </div>
  )
}

export default Playlist
