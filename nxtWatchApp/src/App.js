import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import NxtWatchContext from './context/NxtWatchContext'
import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    activeTab: '',
    isBannerActive: true,
    homeVideoList: [],
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  setActiveTab = id => {
    this.setState({activeTab: id})
  }

  bannerCancel = () => {
    this.setState({isBannerActive: false})
  }

  updatingLikesInHomeList = videoData => {
    const {homeVideoList} = this.state

    const isPresent = homeVideoList.find(each => each.id === videoData.id)

    if (isPresent) {
      const updatedList = homeVideoList.map(each => {
        if (each.id === videoData.id) {
          return {...each, isLiked: !each.isLiked, isDisliked: false}
        }
        return each
      })

      this.setState({homeVideoList: updatedList})
    } else {
      const updatedList = [
        ...homeVideoList,
        {...videoData, isLiked: true, isDisliked: false},
      ]
      this.setState({homeVideoList: updatedList})
    }
  }

  updatingDislikesInHomeList = videoData => {
    const {homeVideoList} = this.state

    const isPresent = homeVideoList.find(each => each.id === videoData.id)

    if (isPresent) {
      const updatedList = homeVideoList.map(each => {
        if (each.id === videoData.id) {
          return {...each, isLiked: false, isDisliked: !each.isDisliked}
        }
        return each
      })

      this.setState({homeVideoList: updatedList})
    } else {
      const updatedList = [
        ...homeVideoList,
        {...videoData, isLiked: false, isDisliked: true},
      ]
      this.setState({homeVideoList: updatedList})
    }
  }

  addingToSavedList = videoData => {
    const {savedVideosList} = this.state
    const findingVideo = savedVideosList.find(each => each.id === videoData.id)
    if (findingVideo) {
      this.setState({
        savedVideosList: savedVideosList.filter(
          each => each.id !== videoData.id,
        ),
      })
    } else {
      this.setState({savedVideosList: [...savedVideosList, videoData]})
    }
  }

  render() {
    const {
      isDarkTheme,
      activeTab,
      isBannerActive,
      homeVideoList,
      savedVideosList,
    } = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          activeTab,
          setActiveTab: this.setActiveTab,
          isBannerActive,
          bannerCancel: this.bannerCancel,
          homeVideoList,
          updatingLikesInHomeList: this.updatingLikesInHomeList,
          updatingDislikesInHomeList: this.updatingDislikesInHomeList,
          savedVideosList,
          addingToSavedList: this.addingToSavedList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
