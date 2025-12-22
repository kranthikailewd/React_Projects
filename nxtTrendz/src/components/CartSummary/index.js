import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log(cartList)
      const cost = cartList.reduce(
        (sum, each) => sum + each.price * each.quantity,
        0,
      )
      return (
        <div className="summary_block">
          <h1 className="cost_para">
            Order Total: <span className="cost_number">Rs {cost}/-</span>
          </h1>
          <p className="items_count">{cartList.length} items in cart</p>
          <button className="checkout_button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
