import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header/index'
import TabsPanel from '../TabsPanel/index'
import Banner from '../Banner/index'
import GamingVideo from '../GamingVideo/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideoContent()
  }

  getGamingVideoContent = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/videos/gaming`, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedVideos = data.videos
      const formattedVideosData = fetchedVideos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
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
        onClick={() => this.getGamingVideoContent()}
      >
        Retry
      </button>
    </div>
  )

  renderGamingView = inDark => {
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
      <ul className="gaming_videos_list">
        {videosList.map(each => (
          <GamingVideo
            key={each.id}
            gamingVideoDetails={each}
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
            <div className="gaming_container">
              <Header />
              <div className="gaming_tabs_content">
                <div className="tabs_container">
                  <TabsPanel />
                </div>
                <div
                  className={`gaming_content ${inDark}`}
                  data-testid="gaming"
                >
                  <Banner />
                  <div className="route_heading_block">
                    <SiYoutubegaming className="route_heading_icon" />
                    <h1 className={`route_heading ${inDark}`}>Gaming</h1>
                  </div>
                  {this.renderGamingView(inDark)}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
