import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import './index.css'

const HomeVideo = props => {
  const {homeVideoDetails, inDark} = props
  const {
    id,
    title,
    thumbnailUrl,
    channelName,
    channelProfileImageUrl,
    viewCount,
    publishedAt,
  } = homeVideoDetails
  return (
    <li className="home_video_item">
      <Link className={`home_video_link ${inDark}`} to={`/videos/${id}`}>
        <img
          className="home_video_thumbnail"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div className="channel_home_video_info">
          <img
            className="channel_profile"
            src={channelProfileImageUrl}
            alt="channel logo"
          />
          <div className="channel_info">
            <p className={`home_video_title ${inDark}`}>{title}</p>
            <p className={`channel_name ${inDark}`}>{channelName}</p>
            <p className={`home_video_views_date ${inDark}`}>
              {viewCount} views {<BsDot className={`dot ${inDark}`} />}{' '}
              {publishedAt} ago
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default HomeVideo
