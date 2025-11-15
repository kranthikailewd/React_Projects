import {Link} from 'react-router-dom'

import './index.css'

const BlogItem = props => {
  const {blogItem} = props
  const {id, title, imageUrl, avatarUrl, author, topic} = blogItem

  return (
    <Link to={`/blogs/${id}`} className="item_link">
      <li className="blog_item">
        <img className="blog_img" src={imageUrl} alt={`item${id}`} />
        <div className="blog_info">
          <p className="topic">{topic}</p>
          <h1 className="title">{title}</h1>
          <div className="author_block">
            <img className="author_img" src={avatarUrl} alt={`avatar${id}`} />
            <p className="author_name">{author}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BlogItem
