import {Component} from 'react'
import TabItem from '../TabItem/index'
import Thumbnail from '../Thumbnail/index'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      score: 0,
      timer: 60,
      tabsList,
      imagesList,
      gameEnded: false,
      activeImg: imagesList[0].imageUrl,
      activeTab: tabsList[0].tabId,
    }
  }

  componentDidMount() {
    this.ticking = setInterval(() => {
      this.setState(prev => {
        if (prev.timer > 0 && prev.gameEnded === false) {
          return {timer: prev.timer - 1}
        }
        clearInterval(this.ticking)
        return {gameEnded: true}
      })
    }, 1000)
  }

  changingTab = tabId => {
    this.setState(prev => ({
      activeTab: prev.tabsList.find(each => each.tabId === tabId).tabId,
    }))
  }

  onAnswering = id => {
    const {activeImg, imagesList} = this.state
    const checking =
      imagesList.find(each => each.id === id).imageUrl === activeImg
    if (checking) {
      const changingActiveImage =
        imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
      this.setState(prev => ({
        score: prev.score + 1,
        activeImg: changingActiveImage,
      }))
    } else {
      this.setState({gameEnded: true})
    }
  }

  onPlayingAgain = () => {
    clearInterval(this.ticking)
    this.setState(prev => ({
      score: 0,
      timer: 60,
      gameEnded: false,
      activeImg: prev.imagesList[0].imageUrl,
      activeTab: prev.tabsList[0].tabId,
    }))
    this.componentDidMount()
  }

  render() {
    const {
      score,
      timer,
      tabsList,
      imagesList,
      gameEnded,
      activeImg,
      activeTab,
    } = this.state
    return (
      <div className="main_container">
        <ul className="nav_bar">
          <li className="nav_logo">
            <img
              className="game_logo"
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
            />
          </li>
          <li className="score_time_container">
            <p className="score">Score:</p>
            <p className="score_number">{score}</p>
            <img
              className="timer_img"
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
            />
            <p className="timer_number">{timer} sec</p>
          </li>
        </ul>

        {!gameEnded ? (
          <div className="game_container">
            <img className="display_image" src={activeImg} alt="match" />
            <ul className="tabs_list">
              {tabsList.map(each => (
                <TabItem
                  key={each.tabId}
                  tabDetails={each}
                  activeTab={activeTab}
                  changingTab={this.changingTab}
                />
              ))}
            </ul>
            <ul className="thumbnail_list">
              {imagesList
                .filter(each => each.category === activeTab)
                .map(each => (
                  <Thumbnail
                    key={each.id}
                    thumbnailDetails={each}
                    onAnswering={this.onAnswering}
                  />
                ))}
            </ul>
          </div>
        ) : (
          <div className="result_container">
            <img
              className="trophy_img"
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
            />
            <p className="score_card_heading">YOUR SCORE</p>
            <p className="result_score">{score}</p>
            <button
              className="play_again_button"
              type="button"
              onClick={this.onPlayingAgain}
            >
              <img
                className="reset_image"
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
