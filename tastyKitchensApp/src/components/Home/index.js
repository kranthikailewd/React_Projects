import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {MdSort} from 'react-icons/md'
import {TiArrowSortedDown} from 'react-icons/ti'
import {BsFillPatchCheckFill, BsPatchCheck} from 'react-icons/bs'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from '../Header/index'
import EmptyHeader from '../EmptyHeader/index'
import RestaurantsList from '../RestaurantsList/index'
import Loading from '../Loading/index'
import Footer from '../Footer/index'
import Context from '../../context/context'
import './index.css'

const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
}

class Home extends Component {
  state = {carouselList: [], carouselLoaded: false}

  componentDidMount() {
    this.getCarouselImages()
  }

  getCarouselImages = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const formatedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({carouselList: [...formatedData], carouselLoaded: true})
      console.log(formatedData)
    }
  }

  render() {
    const {carouselList, carouselLoaded} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {activeSort, settingSort, activePage} = value
          return (
            <div className="home_container">
              <EmptyHeader />
              <Header />
              <div className="carousel_container">
                {carouselLoaded ? (
                  <Slider className="carousel" {...settings}>
                    {carouselList.map(each => (
                      <div key={each.id} className="carousel_item">
                        <img
                          className="carousel_img"
                          loading="lazy"
                          src={each.imageUrl}
                          alt="offer"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <Loading testid="restaurants-offers-loader" />
                )}
              </div>
              <div className="restaurants_container">
                <div className="restaurants_block">
                  <div className="restaurants_top_section">
                    <h1 className="restaurants_top_section_heading">
                      Popular Restaurants
                    </h1>
                    <div className="restaurants_para_filter_block">
                      <p className="restaurants_top_section_para">
                        Select Your favourite restaurant special dish and make
                        your day happy...
                      </p>
                      <Popup
                        trigger={
                          <button type="button" className="sort_button">
                            <MdSort className="sort_icon" />
                            Sort by {activeSort}
                            <TiArrowSortedDown className="sort_icon" />
                          </button>
                        }
                      >
                        {close => (
                          <div className="sort_options_panel">
                            {sortByOptions.map(each => (
                              <button
                                className={`sort_option ${
                                  activeSort === each.value
                                    ? 'active_sort_option'
                                    : ''
                                }`}
                                type="button"
                                key={each.id}
                                onClick={() => {
                                  settingSort(each.value)
                                  close()
                                }}
                              >
                                <p className="sort_option_text">
                                  {each.displayText}
                                </p>
                                {activeSort === each.value ? (
                                  <BsFillPatchCheckFill className="sort_option_icons" />
                                ) : (
                                  <BsPatchCheck className="sort_option_icons" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                  <RestaurantsList activePage={activePage} />
                </div>
              </div>
              <Footer />
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
