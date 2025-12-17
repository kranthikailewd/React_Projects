import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header/index'
import TabsPanel from '../TabsPanel/index'

import './index.css'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const inDark = isDarkTheme ? 'in_dark_theme' : ''

      const renderNotFoundView = () => (
        <>
          <img
            className="not_found_img"
            src={
              inDark
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
            }
            alt="not found"
          />

          <h1 className={`not_found_heading ${inDark}`}>Page Not Found</h1>
          <p className={`not_found_para ${inDark}`}>
            We are sorry, the page you requested could not be found.
          </p>
        </>
      )

      return (
        <div className="not_found_container">
          <Header />
          <div className="not_found_tabs_content">
            <div className="tabs_container">
              <TabsPanel />
            </div>
            <div className={`not_found_content ${inDark}`}>
              {renderNotFoundView(inDark)}
            </div>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
