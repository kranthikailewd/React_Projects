import './index.css'

const Thumbnail = props => {
  const {thumbnailDetails, onAnswering} = props
  const {id, thumbnailUrl} = thumbnailDetails

  const onAnsweringButton = () => {
    onAnswering(id)
  }

  return (
    <li className="thumbnail_container">
      <button
        type="button"
        className="thumbnail_button"
        onClick={onAnsweringButton}
      >
        <img className="thumbnail_img" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default Thumbnail
