import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import './index.css'
import CommentItem from '../CommentItem/index'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], name: '', commentText: ''}

  onAddingComment = event => {
    event.preventDefault()
    const {commentsList, name, commentText} = this.state
    const commentedTime = formatDistanceToNow(new Date())
    const getRandomcolor =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    const newComment = {
      id: uuidv4(),
      name,
      commentText,
      commentedTime,
      isLiked: false,
      profileColor: getRandomcolor,
    }
    this.setState({
      commentsList: [newComment, ...commentsList],
      name: '',
      commentText: '',
    })
  }

  clickedLike = id => {
    const {commentsList} = this.state

    const updatedListDueToLike = commentsList.map(each => {
      const {isLiked} = each
      if (each.id === id) {
        return {...each, isLiked: !isLiked}
      }
      return each
    })
    this.setState({
      commentsList: [...updatedListDueToLike],
    })
  }

  onDeleting = id => {
    const {commentsList} = this.state

    const deletedACommentFromList = commentsList.filter(each =>
      each.id !== id ? each : null,
    )

    this.setState({commentsList: deletedACommentFromList})
  }

  onGivingName = event => {
    this.setState({name: event.target.value})
  }

  onGivingComment = event => {
    this.setState({commentText: event.target.value})
  }

  render() {
    const {commentsList, name, commentText} = this.state

    return (
      <div className="main_container">
        <h1 className="main_heading">Comments</h1>
        <div className="inputs_image_container">
          <form
            className="inputs_addcomment_container"
            onSubmit={this.onAddingComment}
          >
            <p className="info">Say something about 4.0 Technologies</p>

            <input
              value={name}
              className="name_input"
              onChange={this.onGivingName}
              placeholder="Your Name"
            />
            <textarea
              value={commentText}
              className="comment_input"
              onChange={this.onGivingComment}
              placeholder="Your Comment"
            />

            <button type="submit" className="add_comment_button">
              Add Comment
            </button>
          </form>
          <img
            className="main_image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <p className="comments_count">
          <span className="no_of_comments">{commentsList.length}</span>Comments
        </p>
        <ul className="comments_container">
          {commentsList.map(each => (
            <CommentItem
              key={each.id}
              commentDetails={each}
              clickedLike={this.clickedLike}
              onDeleting={this.onDeleting}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
