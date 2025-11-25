import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem/index'
import RepositoryItem from '../RepositoryItem/index'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    isLoading: false,
    activeRepoCategory: languageFiltersData[0].id,
    fetchSuccess: false,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({isLoading: true})
    const {activeRepoCategory} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeRepoCategory}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const formatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        reposList: formatedData,
        isLoading: false,
        fetchSuccess: true,
      })
    }
    if (response.status === 401) {
      this.setState({isLoading: false, fetchSuccess: false})
    }
  }

  onSwitchingTab = id => {
    this.setState({activeRepoCategory: id}, this.getRepos)
  }

  loadingView = () => (
    <div data-testid="loader" className="loading_container">
      <Loader type="ThreeDots" color="#0284c7" height={60} width={60} />
    </div>
  )

  constantLayout = () => {
    const {activeRepoCategory} = this.state
    return (
      <>
        <h1 className="main_heading">Popular</h1>
        <ul className="repo_category_tabs_list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              tabDetails={each}
              onSwitchingTab={this.onSwitchingTab}
              activeRepoCategory={activeRepoCategory}
            />
          ))}
        </ul>
      </>
    )
  }

  repoInfoLayout = () => {
    const {reposList, fetchSuccess} = this.state

    return (
      <>
        {fetchSuccess ? (
          <ul className="repos_container">
            {reposList.map(each => (
              <RepositoryItem key={each.id} repoDetails={each} />
            ))}
          </ul>
        ) : (
          <div className="repos_not_available_container">
            <img
              className="no_repos_img"
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
            <h1 className="no_repos_heading">Something Went Wrong</h1>
          </div>
        )}
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main_container">
        {this.constantLayout()}
        {isLoading ? this.loadingView() : this.repoInfoLayout()}
      </div>
    )
  }
}

export default GithubPopularRepos
