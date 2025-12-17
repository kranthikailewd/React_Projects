import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header/index'
import TabsPanel from '../TabsPanel/index'
import Banner from '../Banner/index'
import TrendingAndSavedVideo from '../TrendingAndSavedVideo'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideoContent()
  }

  getTrendingVideoContent = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/videos/trending`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const fetchedVideos = data.videos
      const formattedVideosData = fetchedVideos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channelName: each.channel.name,
        channelProfileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: formatDistanceToNow(new Date(each.published_at))
          .split(' ')
          .slice(1, 3)
          .join(' '),
      }))
      this.setState({
        videosList: [...formattedVideosData],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = inDark => (
    <div className="failure_container">
      <img
        className="failure_img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1 className={`failed_heading ${inDark}`}>Oops! Something Went Wrong</h1>
      <p className={`failed_para ${inDark}`}>
        We are having trouble to complete your request. <br /> Please try again.
      </p>
      <button
        className="retry_button"
        type="button"
        onClick={() => this.getTrendingVideoContent()}
      >
        Retry
      </button>
    </div>
  )

  renderTrendingView = inDark => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return <>{this.renderVideosList(inDark)}</>
      case apiStatusConstants.loading:
        return (
          <div className="loader_container" data-testid="loader">
            <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderFailureView(inDark)
      default:
        return null
    }
  }

  renderVideosList = inDark => {
    const {videosList} = this.state
    return (
      <ul className="trending_videos_list">
        {videosList.map(each => (
          <TrendingAndSavedVideo
            key={each.id}
            trendingAndSavedVideoDetails={each}
            inDark={inDark}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const inDark = isDarkTheme ? 'in_dark_theme' : ''

          return (
            <div className="trending_container">
              <Header />
              <div className="trending_tabs_content">
                <div className="tabs_container">
                  <TabsPanel />
                </div>
                <div
                  className={`trending_content ${inDark}`}
                  data-testid="trending"
                >
                  <Banner />
                  <div className="route_heading_block">
                    <HiFire className="route_heading_icon" />
                    <h1 className={`route_heading ${inDark}`}>Trending</h1>
                  </div>
                  {this.renderTrendingView(inDark)}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Trending
