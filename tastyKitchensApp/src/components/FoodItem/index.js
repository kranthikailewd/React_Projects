import {FaStar} from 'react-icons/fa'
import {Button, Star} from '../StyledComponent/index'
import Counter from '../Counter/index'
import Context from '../../context/context'
import './index.css'

const FoodItem = props => {
  const {foodItemDetails} = props
  const {id, name, cost, foodRating, imageUrl} = foodItemDetails
  return (
    <Context.Consumer>
      {value => {
        const {addingFoodItemToCart, cartItemsList} = value
        const checkIfExistInCartList = cartItemsList.find(
          each => each.id === id,
        )
        return (
          <li className="fooditem_container" data-testid="foodItem">
            <img
              src={imageUrl}
              alt={name}
              className="food_item_image"
              loading="lazy"
            />
            <div className="food_item_details">
              <h2 className="food_item_heading">{name}</h2>
              <p className="food_item_cost">₹ {cost}.00</p>
              <div className="food_item_rating_block">
                <Star color="ffcc00">
                  <FaStar />
                </Star>
                <p className="food_rating">{foodRating}</p>
              </div>
              {!checkIfExistInCartList ? (
                <>
                  <Button
                    className="button_hide_on_mobile"
                    type="button"
                    width="fit-content"
                    bgColor="transparent"
                    border="2px solid #ffa412"
                    color="#ffa412"
                    fontSize="14px"
                    height="32px"
                    brRadius="8px"
                    onClick={() => addingFoodItemToCart(foodItemDetails)}
                  >
                    ADD
                  </Button>
                  <Button
                    className="button_hide_on_desktop"
                    type="button"
                    width="fit-content"
                    bgColor="transparent"
                    border="1.45px solid #ffa412"
                    color="#ffa412"
                    fontSize="9px"
                    height="24px"
                    brRadius="5.8px"
                    onClick={() => addingFoodItemToCart(foodItemDetails)}
                  >
                    ADD
                  </Button>
                </>
              ) : (
                <Counter
                  foodItemId={id}
                  quantity={checkIfExistInCartList.quantity}
                  decButtonTestId="decrement-count"
                  incButtonTestId="increment-count"
                  quantityTestId="active-count"
                />
              )}
            </div>
          </li>
        )
      }}
    </Context.Consumer>
  )
}

export default FoodItem
