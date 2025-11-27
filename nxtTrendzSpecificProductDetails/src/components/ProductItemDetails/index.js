import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header/index'
import SimilarProductItem from '../SimilarProductItem/index'
import './index.css'

const apiStatusObject = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    productItemDetails: [],
    similarProducts: [],
    apiStatus: apiStatusObject.initial,
    itemCount: 1,
    errorMsg: '',
  }

  componentDidMount() {
    this.getProductItem()
  }

  getProductItem = async () => {
    this.setState({apiStatus: apiStatusObject.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      }
      const formattedSimilarProducts = data.similar_products.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        style: each.style,
        price: each.price,
        description: each.description,
        brand: each.brand,
        totalReviews: each.total_reviews,
        rating: each.rating,
        availability: each.availability,
      }))
      this.setState({
        productItemDetails: formattedData,
        similarProducts: formattedSimilarProducts,
        apiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusObject.failure,
        errorMsg: data.error_msg,
      })
    }
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  decreaseItemCount = () => {
    this.setState(prev => ({
      itemCount: prev.itemCount > 1 ? prev.itemCount - 1 : prev.itemCount,
    }))
  }

  increaseItemCount = () => {
    this.setState(prev => ({itemCount: prev.itemCount + 1}))
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={60} width={60} />
    </div>
  )

  renderProductAndSimilarsView = () => {
    const {productItemDetails, similarProducts, itemCount} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productItemDetails
    return (
      <>
        <Header />
        <div className="product_details_block">
          <div className="product_details_img_container">
            <img className="product_details_img" src={imageUrl} alt="product" />
          </div>
          <div className="product_details_text_container">
            <h1 className="main_heading">{title}</h1>
            <p className="cost">Rs {price}/-</p>
            <div className="rating_reviews_block">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews_text">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <div className="availability_block">
              <h1 className="info_headings">Available:</h1>
              <p className="availability">{availability}</p>
            </div>
            <div className="brand_block">
              <h1 className="info_headings">Brand:</h1>
              <p className="brand">{brand}</p>
            </div>
            <hr />
            <div className="set_item_count">
              <button
                className="set_item_count_button"
                type="button"
                onClick={this.decreaseItemCount}
                data-testid="minus"
              >
                <BsDashSquare className="icons" />
              </button>
              <p className="item_count">{itemCount}</p>
              <button
                className="set_item_count_button"
                type="button"
                onClick={this.increaseItemCount}
                data-testid="plus"
              >
                <BsPlusSquare className="icons" />
              </button>
            </div>
            <button className="add_to_cart_button" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar_product_details_block">
          <h1 className="similar_product_details">Similar Products</h1>
          <ul className="similar_products_list">
            {similarProducts.map(each => (
              <SimilarProductItem key={each.id} similarProductDetails={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => {
    const {errorMsg} = this.state
    return (
      <div className="failure_container">
        <img
          className="failure_img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
        />
        <h1 className="error_msg">{errorMsg}</h1>
        <button
          className="continue_shopping_button"
          type="button"
          onClick={this.continueShopping}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  renderProductItemPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderProductAndSimilarsView()
      case 'LOADING':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="product_item_container">
        {this.renderProductItemPage()}
      </div>
    )
  }
}

export default ProductItemDetails
