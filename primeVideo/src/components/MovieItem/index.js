import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
import {IoMdClose} from 'react-icons/io'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {thumbnailUrl, videoUrl} = movieDetails
  return (
    <Popup
      modal
      trigger={
        <button className="movie_button" type="button">
          <img className="movie_thumbnail" src={thumbnailUrl} alt="thumbnail" />
        </button>
      }
      className="popup-content"
    >
      {close => (
        <div className="modal_container">
          <button
            className="close_button"
            type="button"
            onClick={() => close()}
            data-testid="closeButton"
          >
            <IoMdClose className="close_icon" />
          </button>
          <ReactPlayer url={videoUrl} className="video" controls />
        </div>
      )}
    </Popup>
  )
}

export default MovieItem
