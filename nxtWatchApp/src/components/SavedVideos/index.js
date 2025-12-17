import {MdPlaylistAdd} from 'react-icons/md'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header/index'
import TabsPanel from '../TabsPanel/index'
import Banner from '../Banner/index'
import TrendingAndSavedVideo from '../TrendingAndSavedVideo'
import './index.css'

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideosList} = value
      const inDark = isDarkTheme ? 'in_dark_theme' : ''

      const renderSavedView = () => {
        if (savedVideosList.length > 0) {
          return (
            <>
              <div className="route_heading_block">
                <MdPlaylistAdd className="route_heading_icon" />
                <h1 className={`route_heading ${inDark}`}>Saved Videos</h1>
              </div>
              <ul className="trending_videos_list saved_videos_list">
                {savedVideosList.map(each => (
                  <TrendingAndSavedVideo
                    key={each.id}
                    trendingAndSavedVideoDetails={each}
                    inDark={inDark}
                  />
                ))}
              </ul>
            </>
          )
        }
        return (
          <div className="no_saved_container">
            <img
              className="no_saved_img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />

            <h1 className={`no_saved_heading ${inDark}`}>
              No saved videos found
            </h1>
            <p className={`no_saved_para ${inDark}`}>
              You can save your videos while watching them
            </p>
          </div>
        )
      }

      return (
        <div className="saved_videos_container">
          <Header />
          <div className="saved_videos_tabs_content">
            <div className="tabs_container">
              <TabsPanel />
            </div>
            <div
              className={`saved_videos_content ${inDark}`}
              data-testid="savedVideos"
            >
              <Banner />
              {renderSavedView(inDark)}
            </div>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideos
