import {Component} from 'react'
import './index.css'

class Feedback extends Component {
  state = {emojiClick: false}

  onClickReveal = () => {
    this.setState({emojiClick: true})
  }

  render() {
    const {emojiClick} = this.state
    const {resources} = this.props
    if (emojiClick) {
      return (
        <div className="main_container">
          <img src={resources.loveEmojiUrl} alt="love emoji" />
          <h1 className="main_heading">Thank You!</h1>
          <p className="para">
            We will use your feedback to improve our customer support
            performance
          </p>
        </div>
      )
    }
    return (
      <div className="main_container">
        <h1 className="main_heading">
          How satisfied are you with our customer support performance?
        </h1>
        <ul className="emoji_container">
          {resources.emojis.map(each => (
            <li
              className="emoji_box"
              onClick={this.onClickReveal}
              key={each.id}
            >
              <img src={each.imageUrl} alt={each.name} />
              <p className="expression">{each.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Feedback
