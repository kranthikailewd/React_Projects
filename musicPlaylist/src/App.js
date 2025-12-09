import {Component} from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import './App.css'

const initialTracksList = [
  {
    id: '3b22e3fd-3d12-4ad1-9e38-90314219c4f4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-perfect-img.png',
    name: 'Perfect',
    genre: 'Pop',
    duration: '4:04',
  },
  {
    id: '40f97965-ff45-469e-a635-b2ef9f1642ed',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-shape-of-you-img.png',
    name: 'Shape of You',
    genre: 'Divide',
    duration: '4:24',
  },
  {
    id: '782f916b-4056-44ec-a95f-5115c3f84904',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-visiting-hours.png',
    name: 'Visiting Hours',
    genre: 'Folk-Pop',
    duration: '3:49',
  },
  {
    id: 'fcf0dc77-3427-457c-9ee0-91b1dc39fece',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-shivers-img.png',
    name: 'Shivers',
    genre: 'Dance-Pop',
    duration: '3:58',
  },
  {
    id: '9c1bb890-d4d5-4edf-9d95-6959d716b442',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-bad-habits-img.png',
    name: 'Bad Habits',
    genre: 'Dance-Pop',
    duration: '4:01',
  },
  {
    id: '2216db9c-647f-4814-b880-179740e4d748',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-castle-on-the-hill-img.png',
    name: 'Castle on the Hill',
    genre: 'Pop&Rock',
    duration: '4:48',
  },
  {
    id: 'a5e30966-b760-4660-bf08-073135f7d010',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-happier-img.png',
    name: 'Happier',
    genre: 'Pop',
    duration: '3:36',
  },
  {
    id: '2d5c9bc0-b8b0-41c6-aa55-cb3b659d8604',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-photograph-img.png',
    name: 'Photograph',
    genre: 'Folk music',
    duration: '4:26',
  },
  {
    id: 'efd3d621-2c05-4941-acdc-0a1a0786bc53',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-galway-girl-img.png',
    name: 'Galway Girl',
    genre: 'Pop',
    duration: '3:20',
  },
  {
    id: 'e4b8e3b8-7776-4c09-8abc-ba328a8babe9',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/music-playlist/music-playlist-i-dont-care-img.png',
    name: "I Don't Care",
    genre: 'Pop',
    duration: '3:38',
  },
]

class App extends Component {
  state = {songsList: initialTracksList, searchTerm: ''}

  renderSongsList = updatedList => (
    <ul className="songs_list">
      {updatedList.map(each => (
        <li key={each.id} className="song_item">
          <div className="song_left">
            <img className="song_img" src={each.imageUrl} alt="track" />
            <div className="song_info">
              <p className="song_title">{each.name}</p>
              <p className="song_genre">{each.genre}</p>
            </div>
          </div>
          <div className="song_right">
            <p className="song_duration">{each.duration}</p>
            <button
              className="delete-button"
              type="button"
              onClick={() =>
                this.setState({
                  songsList: updatedList.filter(
                    eachItem => eachItem.id !== each.id,
                  ),
                })
              }
              data-testid="delete"
            >
              <AiOutlineDelete className="delete_icon" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )

  renderNoSongsView = () => (
    <div className="no_songs_container">
      <p className="no_songs_heading">No Songs Found</p>
    </div>
  )

  render() {
    const {songsList, searchTerm} = this.state
    const updatedList = songsList.filter(each =>
      each.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    return (
      <div className="main_container">
        <div className="singer_info">
          <h1 className="main_heading">Ed Sheeran</h1>
          <p className="occupation">Singer</p>
        </div>
        <div className="work_block">
          <div className="playlist_search">
            <h2 className="playlist_heading">Songs Playlist</h2>
            <input
              type="search"
              value={searchTerm}
              placeholder="Search"
              className="search_input"
              onChange={event =>
                this.setState({searchTerm: event.target.value})
              }
            />
          </div>
          {updatedList.length > 0
            ? this.renderSongsList(updatedList)
            : this.renderNoSongsView()}
        </div>
      </div>
    )
  }
}

export default App
