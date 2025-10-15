import {Component} from 'react'
import './index.css'
import SuggestionItem from '../SuggestionItem/index'

class GoogleSuggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {suggestionsList: props.suggestionsList, searchTerm: ''}
  }

  searchedTerm = event => {
    const latestSearch = event.target.value.toLowerCase()
    const {suggestionsList} = this.props
    const filteredlist = suggestionsList.filter(each =>
      each.suggestion.toLowerCase().includes(latestSearch),
    )

    this.setState({suggestionsList: filteredlist, searchTerm: latestSearch})
  }

  onClickPasting = suggestion => {
    const {suggestionsList} = this.props
    this.setState({
      searchTerm: suggestion,
      suggestionsList: suggestionsList.filter(each =>
        each.suggestion.toLowerCase().includes(suggestion.toLowerCase()),
      ),
    })
  }

  render() {
    const {suggestionsList, searchTerm} = this.state

    return (
      <div className="main_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
          alt="google logo"
          className="google_logo"
        />
        <div className="search_result_container">
          <div className="search_box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              alt="search icon"
            />
            <input
              type="search"
              onChange={this.searchedTerm}
              value={searchTerm}
              placeholder="Search Google"
            />
          </div>
          <ul className="suggestion_container">
            {suggestionsList.map(each => (
              <SuggestionItem
                key={each.id}
                suggDetails={each}
                onClickPasting={this.onClickPasting}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default GoogleSuggestions
