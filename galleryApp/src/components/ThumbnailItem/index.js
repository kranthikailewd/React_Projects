import './index.css'

const ThumbnailItem = props => {
  const {thumbnailDetails, changingImage, currentId} = props
  const {id, thumbnailUrl, thumbnailAltText} = thumbnailDetails

  const onClickingChange = () => {
    changingImage(id)
  }

  const activeCheck = currentId === id ? 'active' : ''
  return (
    <li>
      <button type="button" onClick={onClickingChange}>
        <img
          src={thumbnailUrl}
          className={`thumbnail ${activeCheck}`}
          alt={thumbnailAltText}
        />
      </button>
    </li>
  )
}

export default ThumbnailItem
