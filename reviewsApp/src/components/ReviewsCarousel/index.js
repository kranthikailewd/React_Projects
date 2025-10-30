import {Component} from 'react'
import './index.css'

class ReviewsCarousel extends Component {
  state = {count: 0}

  onClickOfLeftArrow = () => {
    const {count} = this.state
    if (count !== 0) {
      this.setState(prev => ({
        count: prev.count - 1,
      }))
    }
  }

  onClickOfRightArrow = () => {
    const {reviewsList} = this.props
    const {count} = this.state
    if (count !== reviewsList.length - 1) {
      this.setState(prev => ({
        count: prev.count + 1,
      }))
    }
  }

  render() {
    const {count} = this.state
    const {reviewsList} = this.props
    const {imgUrl, username, companyName, description} = reviewsList[count]
    return (
      <div className="main_container">
        <h1 className="main_heading">Reviews</h1>
        <img className="user_profile_pic" src={imgUrl} alt={username} />
        <div className="arrows_name_container">
          <button
            className="left_button"
            type="button"
            data-testid="leftArrow"
            onClick={this.onClickOfLeftArrow}
          >
            <img
              className="arrow_img"
              src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png"
              alt="left arrow"
            />
          </button>
          <p className="user_name">{username}</p>
          <button
            className="right_button"
            type="button"
            data-testid="rightArrow"
            onClick={this.onClickOfRightArrow}
          >
            <img
              className="arrow_img"
              src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png"
              alt="right arrow"
            />
          </button>
        </div>
        <p className="company_name">{companyName}</p>
        <p className="description">{description}</p>
      </div>
    )
  }
}

export default ReviewsCarousel
