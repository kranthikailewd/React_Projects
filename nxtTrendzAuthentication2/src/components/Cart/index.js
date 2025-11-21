import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header/index'

import './index.css'

const Cart = () => {
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="cart_container">
      <Header />
      <div className="cart_block">
        <img
          className="cart_img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
          alt="cart"
        />
      </div>
    </div>
  )
}

export default Cart
