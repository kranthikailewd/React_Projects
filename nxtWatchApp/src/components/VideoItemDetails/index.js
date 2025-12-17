import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {MdPlaylistAdd} from 'react-icons/md'
import {BiLike, BiDislike} from 'react-icons/bi'
import {BsDot} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header/index'
import TabsPanel from '../TabsPanel/index'
import Banner from '../Banner/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {videoData: {}, apiStatus: apiStatusConstants.initial, videoId: ''}

  componentDidMount() {
    this.getVideoContent()
  }

  getVideoContent = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedVideo = data.video_details
      const formattedVideoData = {
        id: fetchedVideo.id,
        title: fetchedVideo.title,
        videoUrl: fetchedVideo.video_url,
        thumbnailUrl: fetchedVideo.thumbnail_url,
        name: fetchedVideo.channel.name,
        profileImageUrl: fetchedVideo.channel.profile_image_url,
        subscriberCount: fetchedVideo.channel.subscriber_count,
        viewCount: fetchedVideo.view_count,
        description: fetchedVideo.description,
        publishedAt: formatDistanceToNow(new Date(fetchedVideo.published_at))
          .split(' ')
          .slice(1, 3)
          .join(' '),
      }
      this.setState({
        videoData: formattedVideoData,
        apiStatus: apiStatusConstants.success,
        videoId: fetchedVideo.id,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {videoData, videoId} = this.state
    const {
      title,
      videoUrl,
      name,
      profileImageUrl,
      subscriberCount,
      viewCount,
      description,
      publishedAt,
    } = videoData
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {
            isDarkTheme,
            homeVideoList,
            updatingLikesInHomeList,
            updatingDislikesInHomeList,
            savedVideosList,
            addingToSavedList,
          } = value
          const checkIfSaved = savedVideosList.find(each => each.id === videoId)
          const getSaveInfo = checkIfSaved ? 'Saved' : 'Save'

          const checkIfLiked = homeVideoList.find(each => each.id === videoId)
          const getLikeInfo = checkIfLiked ? checkIfLiked.isLiked : false

          const checkIfDisiked = homeVideoList.find(each => each.id === videoId)
          const getDislikeInfo = checkIfDisiked
            ? checkIfDisiked.isDisliked
            : false

          const inDark = isDarkTheme ? 'in_dark_theme' : ''

          const renderFailureView = () => (
            <div className="failure_container">
              <img
                className="failure_img"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failed"
              />
              <h1 className="failed_heading">Oops! Something Went Wrong</h1>
              <p className="failed_para">
                We are having trouble to complete your request. <br /> Please
                try again.
              </p>
              <button
                className="retry_button"
                type="button"
                onClick={() => this.getVideoContent()}
              >
                Retry
              </button>
            </div>
          )

          const renderVideo = () => (
            <div className={`video_block ${inDark}`}>
              <ReactPlayer url={videoUrl} className="video" controls />
              <div className="video_data">
                <p className={`video_title ${inDark}`}>{title}</p>
                <div className="views_date_like_save">
                  <p className={`views_date ${inDark}`}>
                    {viewCount} views {<BsDot />} {publishedAt} ago
                  </p>
                  <div className="like_save">
                    <button
                      className={`video_button ${getLikeInfo && 'liked'}`}
                      type="button"
                      onClick={() => updatingLikesInHomeList(videoData)}
                    >
                      <BiLike className="like_save_icons" /> Like
                    </button>
                    <button
                      className={`video_button ${getDislikeInfo && 'disliked'}`}
                      type="button"
                      onClick={() => updatingDislikesInHomeList(videoData)}
                    >
                      <BiDislike className="like_save_icons" /> Dislike
                    </button>
                    <button
                      className={`video_button ${getSaveInfo.toLowerCase()}`}
                      type="button"
                      onClick={() => addingToSavedList(videoData)}
                    >
                      <MdPlaylistAdd className="like_save_icons" />{' '}
                      {getSaveInfo}
                    </button>
                  </div>
                </div>
                <div className="video_channel_info_description">
                  <img
                    className="video_channel_profile"
                    src={profileImageUrl}
                    alt={name}
                  />
                  <div className="video_channel_info">
                    <p className={`video_channel_name ${inDark}`}>{name}</p>
                    <p className={`video_channel_subs ${inDark}`}>
                      {subscriberCount} subscribers
                    </p>
                    <p className={`video_description ${inDark}`}>
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )

          const renderVideoView = () => {
            const {apiStatus} = this.state
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderVideo(inDark)
              case apiStatusConstants.loading:
                return (
                  <div className="loader_container" data-testid="loader">
                    <Loader
                      type="ThreeDots"
                      color="#ffffff"
                      height="50"
                      width="50"
                    />
                  </div>
                )
              case apiStatusConstants.failure:
                return renderFailureView(inDark)
              default:
                return null
            }
          }

          return (
            <div
              className="video_details_container"
              data-testid="videoItemDetails"
            >
              <Header />
              <div className="video_tabs_content">
                <div className="tabs_container">
                  <TabsPanel />
                </div>
                <div
                  className={`video_content ${inDark}`}
                  data-testid="videoItemDetails"
                >
                  <Banner />
                  {renderVideoView(inDark)}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
