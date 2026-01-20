import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {FaStar} from 'react-icons/fa'
import {Star} from '../StyledComponent/index'
import Header from '../Header/index'
import EmptyHeader from '../EmptyHeader/index'
import FoodItem from '../FoodItem/index'
import Loading from '../Loading/index'
import Footer from '../Footer/index'
import './index.css'

class RestaurantPage extends Component {
  state = {
    restaurantData: {},
    restaurantItemsList: [],
    restaurantDataLoaded: false,
  }

  componentDidMount() {
    this.getRestaurantPageData()
  }

  generateRating = () => {
    const rating = (Math.floor(Math.random() * (50 - 32 + 1)) + 32) / 10
    return rating % 1 === 0 ? Math.round(rating) : rating
  }

  getRestaurantPageData = async () => {
    this.setState({restaurantDataLoaded: false})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const formatedRestaurantData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
      }
      const formatedRestaurantItemsData = data.food_items.map(each => ({
        id: each.id,
        name: each.name,
        cost: each.cost,
        foodRating: this.generateRating(),
        foodType: each.food_type,
        imageUrl: each.image_url,
      }))
      this.setState({
        restaurantData: {...formatedRestaurantData},
        restaurantItemsList: [...formatedRestaurantItemsData],
        restaurantDataLoaded: true,
      })
    }
  }

  render() {
    const {
      restaurantData,
      restaurantItemsList,
      restaurantDataLoaded,
    } = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      location,
    } = restaurantData
    return (
      <div className="restaurant_page_container">
        <Header />
        <EmptyHeader />
        {restaurantDataLoaded ? (
          <>
            <div className="banner_container">
              <div className="banner">
                <div className="banner_image_container">
                  <img
                    className="restaurant_image"
                    src={imageUrl}
                    alt="restaurant"
                  />
                </div>
                <div className="banner_data">
                  <h1 className="banner_heading">{name}</h1>
                  <p className="banner_cuisine">{cuisine}</p>
                  <p className="banner_location">{location}</p>
                  <div className="banner_ratings_cost_block">
                    <div className="banner_ratings_box">
                      <p className="banner_rating">
                        <Star color="ffffff">
                          <FaStar />
                        </Star>
                        {rating}
                      </p>
                      <p className="banner_reviews">{reviewsCount}+ Ratings</p>
                    </div>
                    <div className="banner_cost_box">
                      <p className="banner_cost">
                        <BiRupee />
                        {costForTwo}
                      </p>
                      <p className="cost_for_two">Cost for two</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="restaurant_items_list_container">
              {restaurantItemsList.map(each => (
                <FoodItem
                  key={each.id}
                  foodItemDetails={each}
                  testid="foodItem"
                />
              ))}
            </ul>
          </>
        ) : (
          <Loading testid="restaurant-details-loader" minHeight="100vh" />
        )}
        <Footer />
      </div>
    )
  }
}

export default RestaurantPage
