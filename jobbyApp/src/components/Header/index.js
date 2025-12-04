import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLoggingOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="header_container">
      <li>
        <Link to="/" className="logo_link">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <li className="menu_options">
        <Link to="/" className="menu_link">
          <li className="menu_options">Home</li>
        </Link>
        <Link to="/jobs" className="menu_link">
          <li className="menu_options">Jobs</li>
        </Link>
      </li>
      <li>
        <button
          className="logout_button button"
          type="button"
          onClick={onLoggingOut}
        >
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
