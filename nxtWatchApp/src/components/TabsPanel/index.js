import {withRouter} from 'react-router-dom'
import {MdHome, MdPlaylistAdd} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming, SiLinkedin, SiGithub} from 'react-icons/si'
import ContactUs from '../StyledComponents'

import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const tabsPanelList = [
  {id: 'HOME', icon: MdHome, tabName: 'Home', routeName: '/'},
  {id: 'TRENDING', icon: HiFire, tabName: 'Trending', routeName: '/trending'},
  {
    id: 'GAMING',
    icon: SiYoutubegaming,
    tabName: 'Gaming',
    routeName: '/gaming',
  },
  {
    id: 'SAVED_VIDEOS',
    icon: MdPlaylistAdd,
    tabName: 'Saved videos',
    routeName: '/saved-videos',
  },
]

const TabsPanel = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, activeTab, setActiveTab} = value
      const {history} = props
      const inDark = isDarkTheme ? 'in_dark_theme' : ''
      return (
        <div className={`tabs_block ${inDark}`}>
          <ul className="tabs">
            {tabsPanelList.map(each => (
              <li
                key={each.id}
                className={`tab ${
                  activeTab === each.id ? 'active_tab' : ''
                } ${inDark}`}
              >
                <button
                  className="tab_button"
                  type="button"
                  onClick={() => {
                    setActiveTab(each.id)
                    history.replace(each.routeName)
                  }}
                >
                  <each.icon
                    className={`tabs_icon ${
                      activeTab === each.id ? 'active_tab_icon' : ''
                    } ${inDark}`}
                  />

                  <p
                    className={`tab_name ${
                      activeTab === each.id ? 'active_tab_name' : ''
                    } ${inDark}`}
                  >
                    {each.tabName}
                  </p>
                </button>
              </li>
            ))}
          </ul>
          <div className={`contact_tab ${inDark}`}>
            <ContactUs className={`contact_us_heading ${inDark}`}>
              CONTACT US
            </ContactUs>
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
            <p className={`enjoy_para ${inDark}`}>
              Enjoy! Now to see your channels and recommendations
            </p>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default withRouter(TabsPanel)
