import './index.css'

const EmojiCard = props => {
  const {emojiDetails, onClickEmoji} = props
  const {id, emojiName, emojiUrl} = emojiDetails

  const onClickOfEmojiButton = () => {
    onClickEmoji(id)
  }

  return (
    <li className="emoji_container">
      <button
        className="emoji_button"
        type="button"
        onClick={onClickOfEmojiButton}
      >
        <img className="emoji_image" src={emojiUrl} alt={emojiName} />
      </button>
    </li>
  )
}

export default EmojiCard
