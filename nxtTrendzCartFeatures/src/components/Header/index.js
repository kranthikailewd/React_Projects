import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <div className="header_container">
      <Link to="/">
        <img
          className="header_logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="nav_bar">
        <li className="nav_item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav_item">
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </li>
        <li className="nav_item">
          <Link to="/cart" className="nav-link">
            Cart
            {renderCartItemsCount()}
          </Link>
        </li>
        <li className="nav_button_item">
          <button className="nav_button" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
