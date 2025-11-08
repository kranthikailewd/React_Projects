import {Component} from 'react'
import NavBar from '../NavBar/index'
import EmojiCard from '../EmojiCard/index'
import WinOrLoseCard from '../WinOrLoseCard/index'
import './index.css'

/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

class EmojiGame extends Component {
  state = {emojisTapList: [], score: 0, topScore: 0, playOrResult: true}

  onClickEmoji = id => {
    const {emojisTapList} = this.state
    const {emojisList} = this.props

    const emojiExistCheck = emojisTapList.includes(id)
    if (emojiExistCheck) {
      this.setState({playOrResult: false})
    } else {
      this.setState(prev => {
        if (prev.emojisTapList.length + 1 === emojisList.length) {
          return {
            playOrResult: false,
            emojisTapList: [...prev.emojisTapList, id],
            score: prev.score + 1,
          }
        }
        return {
          emojisTapList: [...prev.emojisTapList, id],
          score: prev.score + 1,
        }
      })
    }
  }

  onClickPlayAgain = () => {
    this.setState(prev => ({
      score: 0,
      topScore: prev.score > prev.topScore ? prev.score : prev.topScore,
      emojisTapList: [],
      playOrResult: true,
    }))
  }

  render() {
    const {score, topScore, playOrResult} = this.state
    const {emojisList} = this.props

    const shuffledEmojisList = () =>
      [...emojisList].sort(() => Math.random() - 0.5)

    if (playOrResult) {
      return (
        <div className="main_container">
          <NavBar
            score={score}
            topScore={topScore}
            playOrResult={playOrResult}
          />
          <ul className="emojis_container">
            {shuffledEmojisList().map(each => (
              <EmojiCard
                key={each.id}
                emojiDetails={each}
                onClickEmoji={this.onClickEmoji}
              />
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="main_container">
        <NavBar score={score} topScore={topScore} playOrResult={playOrResult} />
        <WinOrLoseCard
          emojisList={emojisList}
          score={score}
          onClickPlayAgain={this.onClickPlayAgain}
        />
      </div>
    )
  }
}

export default EmojiGame
