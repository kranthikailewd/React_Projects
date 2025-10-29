import './index.css'
import {Component} from 'react'

class CoinToss extends Component {
  state = {
    total: 0,
    heads: 0,
    tails: 0,
    activeImg: 'https://assets.ccbp.in/frontend/react-js/heads-img.png',
  }

  onTossing = () => {
    const tossResult = Math.floor(Math.random() * 2)

    if (tossResult === 0) {
      this.setState(prev => ({
        total: prev.total + 1,
        heads: prev.heads + 1,
        activeImg: 'https://assets.ccbp.in/frontend/react-js/heads-img.png',
      }))
    } else {
      this.setState(prev => ({
        total: prev.total + 1,
        tails: prev.tails + 1,
        activeImg: 'https://assets.ccbp.in/frontend/react-js/tails-img.png',
      }))
    }
  }

  render() {
    const {total, heads, tails, activeImg} = this.state

    return (
      <div className="main_container">
        <h1 className="main_heading">Coin Toss Game</h1>
        <p className="game_info">Heads (or) Tails</p>
        <img src={activeImg} alt="toss result" />
        <button type="button" className="play" onClick={this.onTossing}>
          Toss Coin
        </button>
        <div className="score_board">
          <p className="total">Total: {total}</p>
          <p className="heads">Heads: {heads}</p>
          <p className="tails">Tails: {tails}</p>
        </div>
      </div>
    )
  }
}

export default CoinToss
