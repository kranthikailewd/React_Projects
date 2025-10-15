import './index.css'
import {useState} from 'react'

const initialHistoryList = [
  {
    id: 0,
    timeAccessed: '07:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/instagram-img.png',
    title: 'Instagram',
    domainUrl: 'instagram.com',
  },
  {
    id: 1,
    timeAccessed: '05:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/twitter-img.png',
    title: 'Twitter. It’s what’s happening / Twitter',
    domainUrl: 'twitter.com',
  },
  {
    id: 2,
    timeAccessed: '04:35 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/facebook-img.png',
    title: 'Facebook – log in or sign up',
    domainUrl: 'facebook.com',
  },
  {
    id: 3,
    timeAccessed: '04:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/linkedin-img.png',
    title: 'LinkedIn: Log In or Sign Up',
    domainUrl: 'linkedin.com',
  },
  {
    id: 4,
    timeAccessed: '04:00 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/hashnode-img.png',
    title: 'Hashnode: Everything you need to start blogging as a developer!',
    domainUrl: 'hashnode.com',
  },
  {
    id: 5,
    timeAccessed: '03:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/github-img.png',
    title: 'GitHub: Where the world builds software · GitHub',
    domainUrl: 'github.com',
  },

  {
    id: 6,
    timeAccessed: '02:45 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/react-img.png',
    title: 'React – A JavaScript library for building user interfaces',
    domainUrl: 'reactjs.org',
  },
  {
    id: 7,
    timeAccessed: '01:25 PM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/stackoverflow-img.png',
    title: 'Stack Overflow - Where Developers Learn, Share, & Build Careers',
    domainUrl: 'stackoverflow.com',
  },

  {
    id: 8,
    timeAccessed: '09:25 AM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/gmail-img.png',
    title: 'Gmail',
    domainUrl: 'mail.google.com',
  },
  {
    id: 9,
    timeAccessed: '09:00 AM',
    logoUrl: 'https://assets.ccbp.in/frontend/react-js/google-img.png',
    title: 'Google',
    domainUrl: 'google.com',
  },
]

// Replace your code here
const BrowserHistory = () => {
  const [historyList, sethistoryList] = useState(initialHistoryList)
  const [searchTerm, setsearchTerm] = useState('')

  const onSearching = event => {
    const updatedHistoryList = initialHistoryList.filter(each =>
      each.title.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    sethistoryList(updatedHistoryList)
    setsearchTerm(event.target.value)
  }

  const deleteHistoryItem = id => {
    sethistoryList(historyList.filter(each => each.id !== id))
  }

  const listTextDecide = () => {
    if (historyList.length > 0) {
      return (
        <ul className="history_items_container">
          {historyList.map(each => (
            <li key={each.id} className="history_list_item">
              <p className="time">{each.timeAccessed}</p>
              <div className="history_item_details_and_delete">
                <div className="history_item_details">
                  <img src={each.logoUrl} alt="domain logo" />
                  <p className="application_title">{each.title}</p>
                  <p className="application_domain">{each.domainUrl}</p>
                </div>
                <button
                  className="delete_button"
                  type="button"
                  data-testid="delete"
                  onClick={() => deleteHistoryItem(each.id)}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
                    alt="delete"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div className="empty_text_show_box">
        <p className="unavailable_list_text">There is no history to show.</p>
      </div>
    )
  }

  return (
    <div className="main_container">
      <div className="nav_section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/history-website-logo-img.png"
          alt="app logo"
          className="nav_img"
        />
        <div className="search_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/search-img.png"
            alt="search"
            className="search_image"
          />
          <input
            value={searchTerm}
            type="search"
            placeholder="Search history"
            name="search history"
            onChange={onSearching}
          />
        </div>
      </div>
      <div className="history_items_box">
        <div className="history_list_ul_parent">{listTextDecide()}</div>
      </div>
    </div>
  )
}

export default BrowserHistory
