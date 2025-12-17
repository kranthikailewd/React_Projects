import {Link} from 'react-router-dom'
import './index.css'

const GamingVideo = props => {
  const {gamingVideoDetails, inDark} = props
  const {id, title, thumbnailUrl, viewCount} = gamingVideoDetails
  return (
    <li className="gaming_video_item">
      <Link className="gaming_video_link" to={`/videos/${id}`}>
        <img
          className="gaming_video_thumbnail"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div className="channel_info">
          <p className={`gaming_video_title ${inDark}`}>{title}</p>
          <p className={`gaming_video_views ${inDark}`}>
            {viewCount} Watching Worldwide
          </p>
        </div>
      </Link>
    </li>
  )
}

export default GamingVideo
