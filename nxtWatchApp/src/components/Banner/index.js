import {IoCloseOutline} from 'react-icons/io5'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const Banner = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, isBannerActive, bannerCancel} = value
      const inDark = isDarkTheme ? 'in_dark_theme' : ''

      const renderBanner = () => (
        <div className={`banner_container ${inDark}`} data-testid="banner">
          <div className="banner_left">
            <img
              className="banner_logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <p className={`banner_para ${inDark}`}>
              Buy Nxt Watch Premium prepaid plans with <br /> UPI
            </p>
            <button className={`banner_get_now_button ${inDark}`} type="button">
              GET IT NOW
            </button>
          </div>
          <button
            className="banner_cancel_button"
            type="button"
            onClick={() => bannerCancel()}
            data-testid="close"
          >
            <IoCloseOutline className={`banner_cancel_icon ${inDark}`} />
          </button>
        </div>
      )

      return isBannerActive && renderBanner()
    }}
  </NxtWatchContext.Consumer>
)

export default Banner
