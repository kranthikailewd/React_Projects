import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {ScoreText} from './components/styledComponents'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const testIds = {
  ROCK: 'rockButton',
  SCISSORS: 'scissorsButton',
  PAPER: 'paperButton',
}

const resultOccurances = {
  win: 'YOU WON',
  lose: 'YOU LOSE',
  draw: 'IT IS DRAW',
}

class App extends Component {
  state = {
    score: 0,
    selected: 'ROCK',
    opponent: 'PAPER',
    showResult: false,
    result: resultOccurances.lose,
  }

  playAgain = () => {
    this.setState({showResult: false})
  }

  decidingResult = () => {
    const {selected, opponent, score} = this.state

    if (selected === opponent) {
      this.setState({result: resultOccurances.draw})
      return
    }

    if (
      (selected === 'ROCK' && opponent === 'SCISSORS') ||
      (selected === 'SCISSORS' && opponent === 'PAPER') ||
      (selected === 'PAPER' && opponent === 'ROCK')
    ) {
      this.setState({score: score + 1, result: resultOccurances.win})
    } else {
      this.setState({score: score - 1, result: resultOccurances.lose})
    }
  }

  gameView = () => (
    <ul className="game_container">
      {choicesList.map(each => (
        <li key={each.id} className="game_option">
          <button
            className="item_button"
            type="button"
            onClick={() => {
              const oppoChoice = Math.floor(Math.random() * choicesList.length)
              const oppoId = choicesList[oppoChoice].id
              this.setState(
                {selected: each.id, opponent: oppoId, showResult: true},
                this.decidingResult,
              )
            }}
            data-testid={testIds[each.id]}
          >
            <img className="img" src={each.imageUrl} alt={each.id} />
          </button>
        </li>
      ))}
    </ul>
  )

  resultView = () => {
    const {selected, opponent, result} = this.state
    return (
      <div className="result_container">
        <div className="show_choices">
          <div className="choice_block">
            <p className="para">YOU</p>
            <img
              className="img"
              src={choicesList.find(each => each.id === selected).imageUrl}
              alt="your choice"
            />
          </div>
          <div className="choice_block">
            <p className="para">OPPONENT</p>
            <img
              className="img"
              src={choicesList.find(each => each.id === opponent).imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="result">{result}</p>
        <button
          className="play_again_button"
          type="button"
          onClick={() => this.playAgain()}
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  render() {
    const {score, showResult} = this.state
    return (
      <div className="main_container">
        <div className="score_container">
          <h1 className="game_items">
            Rock <br /> Paper <br /> Scissors
          </h1>
          <div className="score_block">
            <p className="score_heading">Score</p>
            <ScoreText className="score">{score}</ScoreText>
          </div>
        </div>
        {showResult ? this.resultView() : this.gameView()}
        <Popup
          modal
          trigger={
            <button className="rules_button" type="button">
              Rules
            </button>
          }
        >
          {close => (
            <div className="popup_container">
              <div className="popup_block">
                <button
                  className="popup_close_button"
                  type="button"
                  onClick={() => close()}
                >
                  <RiCloseLine className="close_icon" />
                </button>
                <img
                  className="rules_img"
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </div>
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default App
