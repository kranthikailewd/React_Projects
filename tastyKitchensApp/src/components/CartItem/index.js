import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter/index'
import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {id, name, cost, imageUrl, quantity} = cartItemDetails
  return (
    <>
      <div
        className="cartitem_container cart_item_hide_on_mobile"
        data-testid="cartItem"
      >
        <div className="cartitem_image_title_group">
          <img
            className="cartitem_image"
            src={imageUrl}
            alt={name}
            loading="lazy"
          />
          <p className="cartitem_title">{name}</p>
        </div>
        <div>
          <Counter
            foodItemId={id}
            quantity={quantity}
            decButtonTestId="decrement-quantity"
            incButtonTestId="increment-quantity"
            quantityTestId="item-quantity"
          />
        </div>
        <div className="cartitem_cost_by_quantity">
          <BiRupee />
          <p className="cartitem_cost">{cost * quantity}.00</p>
        </div>
      </div>
      <div
        className="cartitem_container cart_item_hide_on_desktop"
        data-testid="cartItem"
      >
        <img className="cartitem_image" src={imageUrl} alt={name} />
        <div className="food_item_info_mobile">
          <p className="cartitem_title">{name}</p>
          <Counter foodItemId={id} quantity={quantity} />
          <div className="cartitem_cost_by_quantity">
            <BiRupee />
            <p className="cartitem_cost">{cost * quantity}.00</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem
