import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseFill} from 'react-icons/ri'
import {SiLinkedin, SiGithub} from 'react-icons/si'
import {Button} from '../StyledComponent/index'
import Context from '../../context/context'
import './index.css'

const Header = () => (
  <Context.Consumer>
    {value => {
      const {
        activeTab,
        settingTab,
        cartItemsList,
        showingPaymentPage,
        togglePaymentPage,
        menuIsOpen,
        toggleMenu,
      } = value
      return (
        <>
          <div className="header_container">
            <div className="header_block">
              <Link to="/" className="header_logo_block">
                <img
                  className="website_logo"
                  src="https://res.cloudinary.com/pavankalyanbandaru/image/upload/v1651083200/tasty-kitchens/website-logo.png"
                  alt="website logo"
                />
                <p className="website_name">Tasty Kitchens</p>
              </Link>
              <div className="nav_items_list">
                <Link to="/" key={1} className="nav_item">
                  <button
                    type="button"
                    className={`home_tab_button ${
                      activeTab === 1 ? 'active' : ''
                    }`}
                    onClick={() => {
                      settingTab(1)
                      if (showingPaymentPage) {
                        togglePaymentPage()
                      }
                    }}
                  >
                    Home
                  </button>
                </Link>
                <Link to="/cart" key={2} className="nav_item">
                  <button
                    type="button"
                    className={`home_tab_button ${
                      activeTab === 2 ? 'active' : ''
                    }`}
                    onClick={() => {
                      settingTab(2)
                    }}
                  >
                    Cart
                  </button>
                  {cartItemsList.length > 0 && (
                    <span className="cart_items_count">
                      {cartItemsList.length}
                    </span>
                  )}
                </Link>
                <Link to="/login" key={3} className="nav_item">
                  <Button
                    type="button"
                    width="fit-content"
                    height="32px"
                    onClick={() => {
                      Cookies.remove('jwt_token')
                    }}
                  >
                    Logout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mobile_header">
            <div className="header_block">
              <Link to="/" className="header_logo_block">
                <img
                  className="mobile_website_logo"
                  src="https://res.cloudinary.com/pavankalyanbandaru/image/upload/v1651083200/tasty-kitchens/website-logo.png"
                  alt="website logo"
                />
                <p className="mobile_website_name">Tasty Kitchens</p>
              </Link>

              <Popup
                modal
                open={menuIsOpen}
                onOpen={() => toggleMenu()}
                trigger={
                  <button className="menu_icon_box" type="button">
                    {!menuIsOpen ? (
                      <GiHamburgerMenu className="mobile_menu_icon" />
                    ) : (
                      <RiCloseFill className="mobile_menu_icon" />
                    )}
                  </button>
                }
              >
                {close => (
                  <button
                    className="menu_block_popup"
                    type="button"
                    onClick={() => {
                      toggleMenu(false)
                      close()
                    }}
                  >
                    <div className="nav_items_list">
                      <Link to="/" key={1} className="nav_item">
                        <button
                          type="button"
                          className={`home_tab_button ${
                            activeTab === 1 ? 'active' : ''
                          }`}
                          onClick={() => {
                            settingTab(1)
                            if (showingPaymentPage) {
                              togglePaymentPage()
                            }
                          }}
                        >
                          Home
                        </button>
                      </Link>
                      <Link to="/cart" key={2} className="nav_item">
                        <button
                          type="button"
                          className={`home_tab_button ${
                            activeTab === 2 ? 'active' : ''
                          }`}
                          onClick={() => {
                            settingTab(2)
                          }}
                        >
                          Cart
                        </button>
                        {cartItemsList.length > 0 && (
                          <span className="cart_items_count">
                            {cartItemsList.length}
                          </span>
                        )}
                      </Link>
                      <Link to="/login" key={3} className="nav_item">
                        <Button
                          type="button"
                          width="fit-content"
                          height="32px"
                          onClick={() => {
                            Cookies.remove('jwt_token')
                          }}
                        >
                          Logout
                        </Button>
                      </Link>
                      <div className="popup_block">
                        <img
                          className="profile_img"
                          src="https://res.cloudinary.com/dtq6aox9h/image/upload/v1765906679/KranthiAppProfile_xmimaw.png"
                          alt="profile"
                        />
                        <p className="dev_name">Kranthi Kumar Kaile</p>
                        <p className="role"># FULL STACK MERN DEVELOPER</p>
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
                            <SiGithub className="social_icon" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </Popup>
            </div>
          </div>
        </>
      )
    }}
  </Context.Consumer>
)

export default withRouter(Header)
