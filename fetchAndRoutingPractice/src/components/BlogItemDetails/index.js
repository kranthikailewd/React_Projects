import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogItemDetails: {}, isLoading: true}

  componentDidMount() {
    this.readingBlog()
  }

  readingBlog = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const gettingFormattedBlog = {
      title: data.title,
      imageUrl: data.image_url,
      content: data.content,
      avatarUrl: data.avatar_url,
      author: data.author,
    }

    this.setState({blogItemDetails: gettingFormattedBlog, isLoading: false})
  }

  render() {
    const {blogItemDetails, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogItemDetails

    return (
      <div className="blog_container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <div className="blog_info">
            <h2 className="blog_details_title">{title}</h2>
            <div className="author_details">
              <img className="author_pic" src={avatarUrl} alt={author} />
              <p className="details_author_name">{author}</p>
            </div>
            <img className="blog_image" src={imageUrl} alt={title} />
            <p className="blog_content">{content}</p>
          </div>
        )}
      </div>
    )
  }
}

export default BlogItemDetails
