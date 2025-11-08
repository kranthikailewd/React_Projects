import './index.css'

const WinOrLoseCard = props => {
  const {emojisList, score, onClickPlayAgain} = props

  const onClickPlayAgainButton = () => {
    onClickPlayAgain()
  }

  if (score === emojisList.length) {
    return (
      <div className="result_container">
        <div className="text_block">
          <h1 className="win_lose_main_heading">You Won</h1>
          <p className="score_heading">Best Score</p>
          <p className="score_number">
            {score}/{emojisList.length}
          </p>
          <button
            type="button"
            className="play_again_button"
            onClick={onClickPlayAgainButton}
          >
            Play Again
          </button>
        </div>
        <img
          className="win_or_lose_image"
          src="https://assets.ccbp.in/frontend/react-js/won-game-img.png"
          alt="win or lose"
        />
      </div>
    )
  }
  return (
    <div className="result_container">
      <div className="text_block">
        <h1 className="win_lose_main_heading">You Lose</h1>
        <p className="score_heading">Score</p>
        <p className="score_number">
          {score}/{emojisList.length}
        </p>
        <button
          type="button"
          className="play_again_button"
          onClick={onClickPlayAgainButton}
        >
          Play Again
        </button>
      </div>
      <img
        className="win_or_lose_image"
        src="https://assets.ccbp.in/frontend/react-js/lose-game-img.png"
        alt="win or lose"
      />
    </div>
  )
}

export default WinOrLoseCard
