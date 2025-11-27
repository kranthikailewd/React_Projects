import './index.css'

const SimilarProductItem = props => {
  const {similarProductDetails} = props
  const {imageUrl, title, price, brand, rating} = similarProductDetails

  return (
    <li className="similar_item_container">
      <img
        className="similar_item_img"
        src={imageUrl}
        alt={`similar product ${title}`}
      />
      <h1 className="similar_item_heading">{title}</h1>
      <p className="similar_item_brand">by {brand}</p>
      <div className="cost_rating">
        <p className="cost">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
