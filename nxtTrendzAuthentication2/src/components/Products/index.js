import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header/index'
import './index.css'

const Products = () => {
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="products_container">
      <Header />
      <div className="products_block">
        <img
          className="products_img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-img.png"
          alt="products"
        />
      </div>
    </div>
  )
}

export default Products
