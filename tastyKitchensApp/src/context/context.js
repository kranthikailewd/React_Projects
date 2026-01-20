import React from 'react'

const Context = React.createContext({
  activeTab: 0,
  settingTab: () => {},
  restaurantsList: [],
  settingRestaurantsList: () => {},
  activeSort: 'Lowest',
  settingSort: () => {},
  activePage: 1,
  pagesCount: 0,
  settingPagesCount: () => {},
  decreasingActivePage: () => {},
  increasingActivePage: () => {},
  cartItemsList: [],
  addingFoodItemToCart: () => {},
  onDecrement: () => {},
  onIncrement: () => {},
  showingPaymentPage: false,
  togglePaymentPage: () => {},
  emptyCartList: () => {},
  settingCartListFromStorage: () => {},
  menuIsOpen: false,
  toggleMenu: () => {},
})

export default Context
