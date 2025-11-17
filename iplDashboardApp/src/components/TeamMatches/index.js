import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'
import './index.css'

class TeamMatches extends Component {
  state = {
    id: '',
    formattedLatestMatchData: {},
    formattedRecentMatchesData: [],
    teamBannerUrl: '',
    isLoading: true,
  }

  componentDidMount() {
    this.toGetTeamInfo()
  }

  toGetTeamInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const latestMatchData = data.latest_match_details
    const recentMatchesData = data.recent_matches
    const teamBannerUrl = data.team_banner_url
    const formattedLatestMatchData = {
      competingTeam: latestMatchData.competing_team,
      date: latestMatchData.date,
      venue: latestMatchData.venue,
      result: latestMatchData.result,
      competingTeamLogo: latestMatchData.competing_team_logo,
      competingTeamLogoAlt: `latest match ${latestMatchData.competing_team}`,
      firstInnings: latestMatchData.first_innings,
      secondInnings: latestMatchData.second_innings,
      manOfTheMatch: latestMatchData.man_of_the_match,
      umpires: latestMatchData.umpires,
    }
    const formattedRecentMatchesData = recentMatchesData.map(each => ({
      id: each.id,
      competingTeamLogo: each.competing_team_logo,
      competingTeamLogoAlt: `competing team ${each.competing_team}`,
      competingTeam: each.competing_team,
      result: each.result,
      matchStatus: each.match_status,
    }))
    this.setState({
      id,
      formattedLatestMatchData,
      formattedRecentMatchesData,
      teamBannerUrl,
      isLoading: false,
    })
  }

  render() {
    const {
      id,
      formattedLatestMatchData,
      formattedRecentMatchesData,
      teamBannerUrl,
      isLoading,
    } = this.state
    return isLoading ? (
      <div className="loader_container">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className={`team_container ${id}`}>
        <img className="team_banner" src={teamBannerUrl} alt="team banner" />
        <p className="latest_heading">Latest Matches</p>
        <LatestMatch formattedLatestMatchData={formattedLatestMatchData} />
        <ul className="match_cards_container">
          {formattedRecentMatchesData.map(each => (
            <MatchCard key={each.id} matchCardDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
