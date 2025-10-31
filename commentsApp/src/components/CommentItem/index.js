import './index.css'

const CommentItem = props => {
  const {commentDetails, clickedLike, onDeleting} = props
  const {
    id,
    name,
    commentText,
    commentedTime,
    isLiked,
    profileColor,
  } = commentDetails
  const onClickingLike = () => {
    clickedLike(id)
  }

  const onClickingDelete = () => {
    onDeleting(id)
  }

  const imgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const toggleBlue = isLiked ? 'blued' : ''

  return (
    <li className="each_comment">
      <div className="logo_and_textblock">
        <p className={`logo ${profileColor}`}>{name.slice(0, 1)}</p>
        <div className="text_block">
          <div className="username_and_since">
            <p className="username">{name}</p>
            <p className="since">{commentedTime}</p>
          </div>
          <p className="commentText">{commentText}</p>
        </div>
      </div>
      <div className="actionblock">
        <button className="like_button" type="button" onClick={onClickingLike}>
          <img className="like_img" src={imgUrl} alt="like" />
          <p className={`like_text ${toggleBlue}`}>Like</p>
        </button>
        <button type="button" data-testid="delete" onClick={onClickingDelete}>
          <img
            className="delete_img"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
