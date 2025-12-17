import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import './index.css'

const TrendingAndSavedVideo = props => {
  const {trendingAndSavedVideoDetails, inDark} = props
  const {id, title, thumbnailUrl, channelName, viewCount, publishedAt} =
    trendingAndSavedVideoDetails
  return (
    <li className="trending_video_item">
      <Link className="trending_video_link" to={`/videos/${id}`}>
        <img
          className="trending_video_thumbnail"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div className="trending_channel_info">
          <p className={`trending_video_title ${inDark}`}>{title}</p>
          <p className={`trending_channel_name ${inDark}`}>{channelName}</p>
          <p className={`trending_video_views_date ${inDark}`}>
            {viewCount} views {<BsDot />} {publishedAt} ago
          </p>
        </div>
      </Link>
    </li>
  )
}

export default TrendingAndSavedVideo
