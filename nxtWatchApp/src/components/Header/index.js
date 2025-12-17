import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {SiLinkedin, SiGithub} from 'react-icons/si'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const Header = props => {
  const {history} = props

  const loggingOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const logoutPopup = inDark => (
    <Popup
      modal
      trigger={
        <button className={`logout_button ${inDark}`} type="button">
          <p className="logout">Logout</p>
          <FiLogOut className={`mobile_logout_icon ${inDark}`} />
        </button>
      }
    >
      {close => (
        <div className="popup_container">
          <div className={`popup_block ${inDark}`}>
            <p className={`logout_confirm_para ${inDark}`}>
              Are you sure, you want to logout?
            </p>
            <div className="logout_confirm_buttons_block">
              <button
                className={`cancel_button ${inDark}`}
                type="button"
                onClick={() => close()}
              >
                Cancel
              </button>
              <button
                className="confirm_button"
                type="button"
                onClick={() => loggingOut()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )

  const profilePopup = inDark => (
    <Popup
      modal
      trigger={
        <button className={`profile_button ${inDark}`} type="button">
          <img
            className="profile_img"
            src="https://res.cloudinary.com/dtq6aox9h/image/upload/v1765906679/KranthiAppProfile_xmimaw.png"
            alt="profile"
          />
        </button>
      }
    >
      {close => (
        <button
          className="popup_container profile_full_page_button"
          type="button"
          onClick={() => close()}
        >
          <div className={`popup_block ${inDark}`}>
            <img
              className="profile_img_zoom"
              src="https://res.cloudinary.com/dtq6aox9h/image/upload/v1765906679/KranthiAppProfile_xmimaw.png"
              alt="profile"
            />
            <p className={`user_name ${inDark}`}>Kranthi Kumar Kaile</p>
            <p className={`role ${inDark}`}># FULL STACK MERN DEVELOPER</p>
            <div className="social_icons">
              <a
                className="social_links"
                href="https://www.linkedin.com/in/kranthi-kaile"
              >
                <SiLinkedin className="social_icon linkedin" />
              </a>
              <a
                className="social_links"
                href="https://github.com/kranthikailewd/React_Projects"
              >
                <SiGithub className={`social_icon ${inDark}`} />
              </a>
            </div>
          </div>
        </button>
      )}
    </Popup>
  )

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const inDark = isDarkTheme ? 'in_dark_theme' : ''

        return (
          <div className={`header_container ${inDark}`}>
            <Link to="/" className="header_link">
              <img
                className="header_logo"
                src={
                  !isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                }
                alt="website logo"
              />
            </Link>
            <div className="theme_profile_logout">
              <button
                className="theme_button"
                type="button"
                onClick={() => toggleTheme()}
                data-testid="theme"
              >
                {isDarkTheme ? (
                  <FiSun className={`theme_icon ${inDark}`} />
                ) : (
                  <FaMoon className="theme_icon" />
                )}
              </button>
              {profilePopup(inDark)}
              {logoutPopup(inDark)}
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
