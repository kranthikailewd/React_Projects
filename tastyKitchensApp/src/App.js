import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/index'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import {GlobalStyles} from './components/StyledComponent'
import NotFound from './components/NotFound'
import RestaurantPage from './components/RestaurantPage'
import Context from './context/context'
import './App.css'

class App extends Component {
  state = {
    restaurantsList: [],
    activeTab: 1,
    activeSort: 'Lowest',
    activePage: 1,
    pagesCount: 0,
    cartItemsList: [],
    showingPaymentPage: false,
    menuIsOpen: false,
  }

  componentDidMount() {
    this.getCartListFromLocalStorage()
  }

  getCartListFromLocalStorage = () => {
    const checkingIfCartListStored = JSON.parse(
      localStorage.getItem('cartData'),
    )
    if (checkingIfCartListStored !== null) {
      this.settingCartListFromStorage(checkingIfCartListStored)
    }
  }

  toggleMenu = () => {
    this.setState(prev => ({menuIsOpen: !prev.menuIsOpen}))
  }

  settingCartListFromStorage = val => {
    this.setState({cartItemsList: val})
  }

  emptyCartList = () => {
    localStorage.removeItem('cartData')
    this.setState({cartItemsList: []})
  }

  togglePaymentPage = () => {
    this.setState(prev => ({showingPaymentPage: !prev.showingPaymentPage}))
  }

  updatingStoredCartListIntoState = () => {
    const {cartItemsList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartItemsList))
  }

  onDecrement = val => {
    const {cartItemsList} = this.state
    const updatingCartItemsList = cartItemsList.map(each => {
      if (each.id === val) {
        if (each.quantity === 1) {
          return undefined
        }
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })
    this.setState(
      {
        cartItemsList: updatingCartItemsList.filter(each => each !== undefined),
      },
      this.updatingStoredCartListIntoState,
    )
  }

  onIncrement = val => {
    const {cartItemsList} = this.state
    const updatingCartItemsList = cartItemsList.map(each => {
      if (each.id === val) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState(
      {cartItemsList: updatingCartItemsList},
      this.updatingStoredCartListIntoState,
    )
  }

  addingFoodItemToCart = val => {
    this.setState(
      prev => ({
        cartItemsList: [{...val, quantity: 1}, ...prev.cartItemsList],
      }),
      this.updatingStoredCartListIntoState,
    )
  }

  settingPagesCount = val => {
    this.setState({pagesCount: val})
  }

  decreasingActivePage = () => {
    this.setState(prev => ({
      activePage: prev.activePage > 1 ? prev.activePage - 1 : prev.activePage,
    }))
  }

  increasingActivePage = () => {
    this.setState(prev => ({
      activePage:
        prev.activePage < prev.pagesCount
          ? prev.activePage + 1
          : prev.activePage,
    }))
  }

  settingRestaurantsList = val => {
    this.setState({restaurantsList: val})
  }

  settingTab = val => {
    this.setState({activeTab: val})
  }

  settingSort = val => {
    this.setState({activeSort: val})
  }

  render() {
    const {
      restaurantsList,
      activeTab,
      activeSort,
      activePage,
      pagesCount,
      cartItemsList,
      showingPaymentPage,
      menuIsOpen,
    } = this.state
    return (
      <Context.Provider
        value={{
          activeTab,
          settingTab: this.settingTab,
          restaurantsList,
          settingRestaurantsList: this.settingRestaurantsList,
          activeSort,
          settingSort: this.settingSort,
          activePage,
          pagesCount,
          settingPagesCount: this.settingPagesCount,
          decreasingActivePage: this.decreasingActivePage,
          increasingActivePage: this.increasingActivePage,
          cartItemsList,
          addingFoodItemToCart: this.addingFoodItemToCart,
          onDecrement: this.onDecrement,
          onIncrement: this.onIncrement,
          showingPaymentPage,
          togglePaymentPage: this.togglePaymentPage,
          emptyCartList: this.emptyCartList,
          settingCartListFromStorage: this.settingCartListFromStorage,
          menuIsOpen,
          toggleMenu: this.toggleMenu,
        }}
      >
        <GlobalStyles />
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurants-list/:id"
            component={RestaurantPage}
          />
          <Route component={NotFound} />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
