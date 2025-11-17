import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {id, name, teamImageUrl} = teamCardDetails

  return (
    <Link to={`/team-matches/${id}`} className="team_card_link">
      <li className="team_card">
        <img className="team_card_iamge" src={teamImageUrl} alt={name} />
        <p className="team_card_name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
