import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {Star} from '../StyledComponent/index'

import './index.css'

const Restaurant = props => {
  const {restaurantDetails} = props
  const {
    id,
    ratingColor,
    totalReviews,
    rating,
    name,
    cuisine,
    imageUrl,
  } = restaurantDetails

  return (
    <li className="restaurant_container" data-testid="restaurant-item">
      <Link className="restaurant_link" to={`/restaurants-list/${id}`}>
        <div className="restaurant_img_box">
          <img
            className="restaurant_img"
            src={imageUrl}
            alt="restaurant"
            loading="lazy"
          />
        </div>
        <div className="restaurant_info">
          <h2 className="restaurant_heading">{name}</h2>
          <p className="restaurant_cuisine">{cuisine}</p>
          <div className="ratings_block">
            <Star>
              <FaStar color={ratingColor} />
            </Star>
            <p className="restaurant_rating">{rating}</p>
            <p className="restaurant_total_reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Restaurant
