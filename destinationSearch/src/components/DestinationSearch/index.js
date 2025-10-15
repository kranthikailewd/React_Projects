import {Component} from 'react'
import DestinationItem from '../DestinationItem/index'
import './index.css'

class DestinationSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {destinationsList: props.destinationsList, searchInput: ''}
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {destinationsList, searchInput} = this.state

    const searchList = destinationsList.filter(eachDestination =>
      eachDestination.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="main_container">
        <h1 className="main_heading">Destination Search</h1>
        <div className="search_box">
          <input
            type="search"
            onChange={this.onChangeSearchInput}
            value={searchInput}
            name="user_input"
            placeholder="Search"
            src="URL"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
            alt="search icon"
          />
        </div>
        <ul className="destination_container">
          {searchList.map(place => (
            <DestinationItem
              key={place.id}
              name={place.name}
              imgUrl={place.imgUrl}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default DestinationSearch
