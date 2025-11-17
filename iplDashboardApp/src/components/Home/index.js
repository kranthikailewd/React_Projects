import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard/index'
import './index.css'

class Home extends Component {
  state = {teamList: [], isLoading: true}

  componentDidMount() {
    this.gettingTeams()
  }

  gettingTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teamList = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teamList, isLoading: false})
  }

  render() {
    const {teamList, isLoading} = this.state
    return isLoading ? (
      <div className="loader_container">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className="main_container">
        <div className="ipl_logo_heading">
          <img
            className="ipl_logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="main_heading">IPL Dashboard</h1>
        </div>
        <ul className="team_card_list">
          {teamList.map(each => (
            <TeamCard key={each.id} teamCardDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
