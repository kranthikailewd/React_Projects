import './index.css'

const LatestMatch = props => {
  const {formattedLatestMatchData} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    competingTeamLogoAlt,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = formattedLatestMatchData
  return (
    <div className="latest_match_container">
      <div className="main_info">
        <p className="latest_match_heading">{competingTeam}</p>
        <p className="latest_match_date">{date}</p>
        <p className="latest_match_venue">{venue}</p>
        <p className="latest_match_result">{result}</p>
      </div>
      <img
        className="latest_match_img"
        src={competingTeamLogo}
        alt={competingTeamLogoAlt}
      />
      <div className="in_match_info">
        <p className="in_match_info_headings">First Innings</p>
        <p className="in_match_info_data">{firstInnings}</p>
        <p className="in_match_info_headings">Second Innings</p>
        <p className="in_match_info_data">{secondInnings}</p>
        <p className="in_match_info_headings">Man Of The Match</p>
        <p className="in_match_info_data">{manOfTheMatch}</p>
        <p className="in_match_info_headings">Umpires</p>
        <p className="in_match_info_data">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
