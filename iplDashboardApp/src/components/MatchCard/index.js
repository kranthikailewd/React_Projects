import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {
    competingTeamLogo,
    competingTeamLogoAlt,
    competingTeam,
    result,
    matchStatus,
  } = matchCardDetails
  const status = matchStatus === 'Lost' ? 'lost' : 'win'
  return (
    <li className="match_card_info">
      <img
        className="match_card_img"
        src={competingTeamLogo}
        alt={competingTeamLogoAlt}
      />
      <p className="match_card_heading">{competingTeam}</p>
      <p className="match_card_result">{result}</p>
      <p className={`match_card_matchStatus ${status}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
