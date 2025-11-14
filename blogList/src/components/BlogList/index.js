import './index.css'
import BlogItem from '../BlogItem/index'

const BlogList = props => {
  const {blogsList} = props
  return (
    <ul className="blogsList">
      {blogsList.map(each => (
        <BlogItem key={each.id} blogDetails={each} />
      ))}
    </ul>
  )
}

export default BlogList
