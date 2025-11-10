import './index.css'

const FaqItem = props => {
  const {faqDetails, unhide} = props
  const {id, questionText, answerText, hide} = faqDetails

  const onToggleButton = () => {
    unhide(id)
  }

  return (
    <li className="faq_item">
      <div className="question_block">
        <h1 className="question">{questionText}</h1>
        <button
          className="toggle_button"
          type="button"
          onClick={onToggleButton}
        >
          <img
            className="toggle_img"
            src={
              hide
                ? 'https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png'
            }
            alt={hide ? 'plus' : 'minus'}
          />
        </button>
      </div>
      {!hide && (
        <div className="answer_block">
          <hr />
          <p className="answer">{answerText}</p>
        </div>
      )}
    </li>
  )
}

export default FaqItem
