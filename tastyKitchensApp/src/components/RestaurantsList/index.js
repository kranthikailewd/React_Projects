import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import Restaurant from '../Restaurant/index'
import Loading from '../Loading/index'
import Context from '../../context/context'
import './index.css'

const limit = 9

class RestaurantsList extends Component {
  state = {
    restaurantsList: [],
    pagesCount: 0,
    restaurantsListLoaded: false,
    activeSort: 'Lowest',
  }

  componentDidMount() {
    this.checkTotalRestaurantsCountFirst()
  }

  componentDidUpdate(prevProps, prevState) {
    const {restaurantsList, pagesCount} = this.state
    const {activePage} = this.props
    const {activeSort: contextSort} = this.context
    if (
      prevState.restaurantsList !== restaurantsList ||
      prevState.pagesCount !== pagesCount
    ) {
      const {settingRestaurantsList, settingPagesCount} = this.context
      settingRestaurantsList(restaurantsList)
      settingPagesCount(pagesCount)
    }
    if (prevProps.activePage !== activePage) {
      const {activeSort} = this.context
      this.setState({activeSort}, this.getRestaurants)
    }

    if (prevState.activeSort !== contextSort) {
      this.setState({activeSort: contextSort}, () => {
        this.getRestaurants()
      })
    }
  }

  checkTotalRestaurantsCountFirst = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseListCount = await fetch(
      `https://apis.ccbp.in/restaurants-list`,
      options,
    )
    const dataListCount = await responseListCount.json()
    this.setState({pagesCount: Math.ceil(dataListCount.total / limit)}, () =>
      this.getRestaurants(),
    )
  }

  getRestaurants = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {activePage} = this.props
    const {activeSort} = this.state
    const offset = (activePage - 1) * limit
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSort}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const formatedData = data.restaurants.map(each => ({
        id: each.id,
        ratingColor: each.user_rating.rating_color,
        totalReviews: each.user_rating.total_reviews,
        rating: each.user_rating.rating,
        name: each.name,
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        menuType: each.menu_type,
        location: each.location,
      }))
      this.setState({
        restaurantsList: [...formatedData],
        restaurantsListLoaded: true,
      })
    }
  }

  render() {
    const {restaurantsList, pagesCount, restaurantsListLoaded} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {activePage, decreasingActivePage, increasingActivePage} = value
          return (
            <div className="restaurants_list_container">
              {restaurantsListLoaded ? (
                <>
                  <ul className="restaurants_list">
                    {restaurantsList.map(each => (
                      <Restaurant key={each.id} restaurantDetails={each} />
                    ))}
                  </ul>
                  <div className="pagination_container">
                    <button
                      data-testid="pagination-left-button"
                      className={`pagination_button ${
                        activePage === 1 ? 'pagination_button_disable' : ''
                      }`}
                      disabled={
                        restaurantsListLoaded === false || activePage === 1
                      }
                      type="button"
                      onClick={() => {
                        decreasingActivePage()
                      }}
                    >
                      <MdKeyboardArrowLeft className="pagination_arrow_icon" />
                    </button>
                    <span data-testid="active-page-number">
                      {activePage} of {pagesCount}
                    </span>
                    <button
                      className={`pagination_button ${
                        activePage === pagesCount
                          ? 'pagination_button_disable'
                          : ''
                      }`}
                      disabled={
                        restaurantsListLoaded === false ||
                        activePage === pagesCount
                      }
                      type="button"
                      onClick={() => {
                        increasingActivePage()
                      }}
                      data-testid="pagination-right-button"
                    >
                      <MdKeyboardArrowRight className="pagination_arrow_icon" />
                    </button>
                  </div>
                </>
              ) : (
                <Loading data-testid="restaurants-list-loader" />
              )}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}
RestaurantsList.contextType = Context

export default RestaurantsList
