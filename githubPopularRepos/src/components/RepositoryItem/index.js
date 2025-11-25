import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  return (
    <li className="repo">
      <img className="repo_img" src={avatarUrl} alt={name} />
      <h1 className="repo_heading">{name}</h1>
      <div className="repo_info_container">
        <img
          className="repo_info_img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="repo_info_count">{starsCount} stars</p>
      </div>
      <div className="repo_info_container">
        <img
          className="repo_info_img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="repo_info_count">{forksCount} forks</p>
      </div>
      <div className="repo_info_container">
        <img
          className="repo_info_img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="repo_info_count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
