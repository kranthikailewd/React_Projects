import './index.css'

const NavBar = props => {
  const {score, topScore, playOrResult} = props

  if (playOrResult === true) {
    return (
      <nav className="nav_bar">
        <div className="logo_name">
          <img
            className="game_logo"
            src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
            alt="emoji logo"
          />
          <h1 className="main_heading">Emoji Game</h1>
        </div>
        <div className="scores_container">
          <p className="score_para">Score: {score}</p>
          <p className="top_score_para">Top Score: {topScore}</p>
        </div>
      </nav>
    )
  }
  return (
    <nav className="nav_bar">
      <div className="logo_name">
        <img
          className="game_logo"
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
          alt="emoji logo"
        />
        <h1 className="main_heading">Emoji Game</h1>
      </div>
    </nav>
  )
}

export default NavBar
