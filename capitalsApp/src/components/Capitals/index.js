import {Component} from 'react'
import './index.css'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

class Capitals extends Component {
  state = {
    capitalid: countryAndCapitalsList[0].id,
  }

  onChangeOfOption = event => {
    this.setState({capitalid: event.target.value})
  }

  render() {
    const {capitalid} = this.state

    const getActiveCountry = countryAndCapitalsList.find(
      each => each.id === capitalid,
    )

    return (
      <div className="main_container">
        <h1 className="main_heading">Countries And Capitals</h1>
        <select
          id="drop_down"
          value={capitalid}
          onChange={this.onChangeOfOption}
        >
          {countryAndCapitalsList.map(each => (
            <option key={each.id} id={each.id} value={each.id}>
              {each.capitalDisplayText}
            </option>
          ))}
        </select>
        <p className="questioning">is capital of which country?</p>
        <p className="info">{getActiveCountry.country}</p>
      </div>
    )
  }
}

export default Capitals
