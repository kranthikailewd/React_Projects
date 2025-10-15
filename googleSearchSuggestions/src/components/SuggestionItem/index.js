import './index.css'

const SuggestionItem = props => {
  const {suggDetails, onClickPasting} = props
  const {suggestion} = suggDetails
  const pastingFunction = () => {
    onClickPasting(suggestion)
  }
  return (
    <li className="suggestion_item">
      <p className="suggestion_text">{suggestion}</p>
      <button type="button" onClick={pastingFunction}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
          alt="arrow"
        />
      </button>
    </li>
  )
}

export default SuggestionItem
