import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    titleSearch: '',
    rating: '',
    requestFailed: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
      requestFailed: false,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, titleSearch, rating} = this.state
    const params = new URLSearchParams({
      sort_by: activeOptionId,
      category,
      title_search: titleSearch,
      rating,
    })
    const apiUrl = `https://apis.ccbp.in/products?${params}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false, requestFailed: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  updatingTitlesearch = value => {
    this.setState({titleSearch: value})
  }

  updatingTitleOnEnter = () => {
    this.getProducts()
  }

  updatingCategory = categoryId => {
    this.setState({category: categoryId}, this.getProducts)
  }

  updatingRating = ratingId => {
    this.setState({rating: ratingId}, this.getProducts)
  }

  clearFilter = () => {
    this.setState({titleSearch: '', category: '', rating: ''}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    const countProducts = productsList.length
    return countProducts > 0 ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no_products_view">
        <img
          className="no_products_img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
        />
        <h1 className="no_products_heading">No Products Found</h1>
        <p className="no_products_para">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  failure = () => (
    <div className="failure_container">
      <img
        className="failure_img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1 className="failure_heading">Oops! Something Went Wrong</h1>
      <p className="failure_para">
        We are having some trouble processing your request.
      </p>
      <p className="failure_para">Please try again.</p>
    </div>
  )

  productsInfoView = () => {
    const {requestFailed} = this.state
    return requestFailed ? this.failure() : this.renderProductsList()
  }

  render() {
    const {isLoading, titleSearch, category, rating} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          titleSearch={titleSearch}
          category={category}
          rating={rating}
          updatingTitlesearch={this.updatingTitlesearch}
          updatingCategory={this.updatingCategory}
          updatingRating={this.updatingRating}
          clearFilter={this.clearFilter}
          updatingTitleOnEnter={this.updatingTitleOnEnter}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
        />

        {isLoading ? this.renderLoader() : this.productsInfoView()}
      </div>
    )
  }
}

export default AllProductsSection
