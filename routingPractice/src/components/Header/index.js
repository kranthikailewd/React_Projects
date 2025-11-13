import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header">
    <div className="logo_container">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
        alt="wave"
      />
      <p className="logo_name">Wave</p>
    </div>
    <ul className="nav_menu">
      <li className="nav_link">
        <Link to="/">Home</Link>
      </li>
      <li className="nav_link">
        <Link to="/about">About</Link>
      </li>
      <li className="nav_link">
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  </div>
)

export default Header
