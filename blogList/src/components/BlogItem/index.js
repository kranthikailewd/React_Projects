import './index.css'

const BlogItem = props => {
  const {blogDetails} = props
  const {title, publishedDate, description} = blogDetails
  return (
    <li className="blog_item">
      <div className="blog_name_time">
        <h1 className="blog_name">{title}</h1>
        <p className="blog_time">{publishedDate}</p>
      </div>
      <p className="blog_info">{description}</p>
    </li>
  )
}

export default BlogItem
