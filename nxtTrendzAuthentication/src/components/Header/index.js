import './index.css'

const Header = () => (
  <div className="header_container">
    <img
      className="header_logo"
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
      alt="website logo"
    />
    <ul className="nav_bar">
      <li className="nav_item">Home</li>
      <li className="nav_item">Products</li>
      <li className="nav_item">Cart</li>
      <li className="nav_button_item">
        <button className="nav_button" type="button">
          Logout
        </button>
      </li>
    </ul>
  </div>
)

export default Header
