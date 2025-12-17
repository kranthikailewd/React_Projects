import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header/index'
import TabsPanel from '../TabsPanel/index'
import Banner from '../Banner/index'
import HomeVideo from '../HomeVideo'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    videosList: [],
    justSeeSearch: '',
    searchTerm: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideoContent()
  }

  getHomeVideoContent = async () => {
    const {searchTerm} = this.state
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchTerm}`,
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

  onSearchingVideos = event => {
    if (event.key === 'Enter') {
      this.setState({searchTerm: event.target.value}, this.getHomeVideoContent)
    }
  }

  onSearchClick = justSeeSearch => {
    this.setState({searchTerm: justSeeSearch}, this.getHomeVideoContent)
  }

  updateSearchTerm = event => {
    this.setState({justSeeSearch: event.target.value})
  }

  renderFailureView = inDark => (
    <div className="failure_container">
      <img
        className="failure_img"
        src={
          inDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
      />
      <h1 className={`failed_heading ${inDark}`}>Oops! Something Went Wrong</h1>
      <p className={`failed_para ${inDark}`}>
        We are having trouble to complete your request. <br /> Please try again.
      </p>
      <button
        className="retry_button"
        type="button"
        onClick={() => this.getHomeVideoContent()}
      >
        Retry
      </button>
    </div>
  )

  renderHomeView = inDark => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <div className="search_and_video_list">
            {this.renderSearch(inDark)}
            {this.renderVideosList(inDark)}
          </div>
        )
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

  renderSearch = inDark => {
    const {justSeeSearch} = this.state
    return (
      <div className={`search_container ${inDark}`}>
        <input
          className={`search_input ${inDark}`}
          type="search"
          value={justSeeSearch}
          placeholder="Search"
          onChange={this.updateSearchTerm}
          onKeyDown={this.onSearchingVideos}
        />
        <button
          type="button"
          data-testid="searchButton"
          className={`search_button ${inDark}`}
          onClick={() => this.onSearchClick(justSeeSearch)}
        >
          <BsSearch
            className={`search-icon ${inDark}`}
            data-testid="searchButton"
          />
        </button>
      </div>
    )
  }

  renderVideosList = inDark => {
    const {videosList} = this.state
    return videosList.length > 0 ? (
      <ul className="videos_list">
        {videosList.map(each => (
          <HomeVideo key={each.id} homeVideoDetails={each} inDark={inDark} />
        ))}
      </ul>
    ) : (
      <div className="no_videos_container">
        <img
          className="no_videos_img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />

        <h1 className={`no_videos_heading ${inDark}`}>
          No Search results found
        </h1>
        <p className={`no_videos_para ${inDark}`}>
          Try different key words or remove search filter
        </p>
        <button
          className="retry_button"
          type="button"
          onClick={() => this.getHomeVideoContent()}
        >
          Retry
        </button>
      </div>
    )
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const inDark = isDarkTheme ? 'in_dark_theme' : ''

          return (
            <div className="home_container">
              <Header />
              <div className="home_tabs_content">
                <div className="tabs_container">
                  <TabsPanel />
                </div>
                <div className={`home_content ${inDark}`} data-testid="home">
                  <Banner />
                  {this.renderHomeView(inDark)}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
