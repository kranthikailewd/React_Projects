import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  activeTab: '',
  setActiveTab: () => {},
  isBannerActive: true,
  bannerCancel: () => {},
  homeVideoList: [],
  updatingLikesInHomeList: () => {},
  updatingDislikesInHomeList: () => {},
  savedVideosList: [],
  addingToSavedList: () => {},
})

export default NxtWatchContext
