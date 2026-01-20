import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {HiCheckCircle} from 'react-icons/hi'
import Header from '../Header/index'
import EmptyHeader from '../EmptyHeader/index'
import Footer from '../Footer/index'
import Loading from '../Loading/index'
import CartItem from '../CartItem/index'
import {Button, BouncyDiv} from '../StyledComponent/index'
import Context from '../../context/context'
import './index.css'

const cartPageStatus = {
  isLoading: 'LOADING',
  isRendered: 'RENDERED',
}

class Cart extends Component {
  state = {cartPageIs: cartPageStatus.isLoading}

  componentDidMount() {
    this.setState({cartPageIs: cartPageStatus.isRendered})
  }

  render() {
    const {cartPageIs} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {
            settingTab,
            cartItemsList,
            showingPaymentPage,
            togglePaymentPage,
            emptyCartList,
          } = value
          const cartTotal = cartItemsList.reduce(
            (sum, n) => sum + n.quantity * n.cost,
            0,
          )

          const showCartList = () => (
            <>
              <Header />
              <EmptyHeader />
              <div className="cart_container_with_items">
                <div className="cart_table_headings">
                  <p className="cart_table_heading">Item</p>
                  <p className="cart_table_heading">Quantity</p>
                  <p className="cart_table_heading">Price</p>
                </div>
                <ul className="cart_table_list">
                  {cartItemsList.map(each => (
                    <CartItem key={each.id} cartItemDetails={each} />
                  ))}
                </ul>
                <div className="order_total_block">
                  <h1 className="order_total_heading">Order Total:</h1>
                  <div className="amount_order_group">
                    <p className="cart_total_cost">
                      <BiRupee />
                      <p data-testid="total-price">{cartTotal}.00</p>
                    </p>
                    <Button
                      className="button_hide_on_mobile"
                      type="button"
                      width="fit-content"
                      bgColor="#f7931e"
                      color="#ffffff"
                      onClick={() => {
                        togglePaymentPage()
                        emptyCartList()
                      }}
                    >
                      Place Order
                    </Button>
                    <Button
                      className="button_hide_on_desktop"
                      type="button"
                      width="fit-content"
                      bgColor="#f7931e"
                      color="#ffffff"
                      fontSize="12px"
                      fontWeight="500"
                      onClick={() => {
                        togglePaymentPage()
                        emptyCartList()
                      }}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
              <Footer />
            </>
          )

          const showNoItemsPage = () => (
            <div className="no_items_cart">
              <Header />
              <EmptyHeader />
              <div className="no_items_container">
                <img
                  className="no_items_img"
                  src="https://res.cloudinary.com/pavankalyanbandaru/image/upload/v1651083038/tasty-kitchens/no-orders-yet.png"
                  alt="empty cart"
                />
                <h1 className="no_items_heading">No Orders Yet!</h1>
                <p className="no_items_info">
                  Your cart is empty. Add something from the menu.
                </p>
                <Button
                  className="button_hide_on_mobile"
                  type="button"
                  width="fit-content"
                  bgColor="#f7931e"
                  color="#ffffff"
                  onClick={() => {
                    const {history} = this.props
                    settingTab(1)
                    history.replace('/')
                  }}
                >
                  Order Now
                </Button>
                <Button
                  className="button_hide_on_desktop"
                  type="button"
                  width="fit-content"
                  bgColor="#f7931e"
                  color="#ffffff"
                  fontSize="12px"
                  fontWeight="500"
                  onClick={() => {
                    const {history} = this.props
                    settingTab(1)
                    history.replace('/')
                  }}
                >
                  Order Now
                </Button>
              </div>
            </div>
          )

          const showPaymentPage = () => (
            <div className="show_payment_cart">
              <Header />
              <EmptyHeader />
              <div className="payment_container">
                <BouncyDiv>
                  <HiCheckCircle className="payment_successful_tick" />
                </BouncyDiv>
                <h1 className="payment_heading">Payment Successful</h1>
                <p className="payment_info">
                  Thank you for ordering
                  <br />
                  Your payment is successfully completed.
                </p>
                <Button
                  className="button_hide_on_mobile"
                  type="button"
                  width="fit-content"
                  bgColor="#f7931e"
                  color="#ffffff"
                  onClick={() => {
                    const {history} = this.props
                    togglePaymentPage()
                    settingTab(1)
                    history.replace('/')
                  }}
                >
                  Go To Home Page
                </Button>
                <Button
                  className="button_hide_on_desktop"
                  type="button"
                  width="fit-content"
                  bgColor="#f7931e"
                  color="#ffffff"
                  fontSize="12px"
                  fontWeight="500"
                  onClick={() => {
                    const {history} = this.props
                    togglePaymentPage()
                    settingTab(1)
                    history.replace('/')
                  }}
                >
                  Go To Home Page
                </Button>
              </div>
            </div>
          )

          const showCartPage = () => {
            switch (true) {
              case showingPaymentPage:
                return showPaymentPage()
              case cartItemsList.length > 0:
                return showCartList()
              case cartItemsList.length === 0:
                return showNoItemsPage()
              default:
                return null
            }
          }

          const finalView = () => {
            if (cartPageIs === cartPageStatus.isLoading) {
              return (
                <div className="loading_cart">
                  <Header />
                  <div className="cart_loading_container">
                    <Loading />
                  </div>
                </div>
              )
            }
            return showCartPage()
          }

          return finalView()
        }}
      </Context.Consumer>
    )
  }
}

Cart.contextType = Context

export default Cart
