import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import {AiFillHome} from 'react-icons/ai'
import {BsInfoCircleFill} from 'react-icons/bs'
import 'reactjs-popup/dist/index.css'

import './index.css'

class Header extends Component {
  goHome = close => {
    const {history} = this.props
    close()
    history.replace('/')
  }

  goAbout = close => {
    const {history} = this.props
    close()
    history.replace('/about')
  }

  render() {
    return (
      <div className="header_container">
        <Link to="/">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/hamburger-menu-website-logo.png"
            alt="website logo"
          />
        </Link>
        <Popup
          modal
          trigger={
            <button
              className="close_button"
              type="button"
              data-testid="hamburgerIconButton"
            >
              <GiHamburgerMenu className="header_icon" />
            </button>
          }
        >
          {close => (
            <div className="modal_container">
              <div className="modal_header_container">
                <button
                  className="close_button"
                  type="button"
                  onClick={close}
                  data-testid="closeButton"
                >
                  <IoMdClose className="header_icon" />
                </button>
              </div>
              <div className="menu_options_container">
                <button
                  className="menu_button"
                  type="button"
                  onClick={() => this.goHome(close)}
                >
                  <AiFillHome className="menu_button_icon" />
                  <h1 className="menu_option_text">Home</h1>
                </button>
                <button
                  className="menu_button"
                  type="button"
                  onClick={() => this.goAbout(close)}
                >
                  <BsInfoCircleFill className="menu_button_icon" />
                  <h1 className="menu_option_text">About</h1>
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default withRouter(Header)
