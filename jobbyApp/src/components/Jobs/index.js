import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header/index'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusObject = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusObject.initial,
    profileInfo: [],
    employementType: [],
    salary: '',
    searchTerm: '',
    justSeeSearch: '',
    profileFetchFail: false,
  }

  componentDidMount() {
    this.getJobsList()
    this.getUserProfile()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusObject.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {employementType, salary, searchTerm} = this.state
    const paramStringTypes = employementType.join(',')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const params = new URLSearchParams({
      employment_type: paramStringTypes,
      minimum_package: salary,
      search: searchTerm,
    })
    const response = await fetch(`https://apis.ccbp.in/jobs?${params}`, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobList: formattedData,
        apiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({apiStatus: apiStatusObject.failure})
    }
  }

  getUserProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileInfo: formattedData})
    } else {
      this.setState({profileFetchFail: true})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryGetJobs = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="failure_container">
      <img
        className="failure_img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure_heading">Oops! Something Went Wrong</h1>
      <p className="failure_info">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry_button button"
        type="button"
        onClick={this.onRetryGetJobs}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no_jobs_container">
      <img
        className="no_jobs_img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no_jobs_heading">No Jobs Found</h1>
      <p className="no_jobs_info">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  onRetryProfile = () => {
    this.getUserProfile()
  }

  renderProfileView = () => {
    const {profileFetchFail, profileInfo} = this.state
    const {profileImageUrl} = profileInfo
    return (
      <div className="profile_container">
        {profileFetchFail === false ? (
          <div className="profile_display_block">
            <img className="profile_img" src={profileImageUrl} alt="profile" />
            <div className="name_bio">
              <h3 className="user_name">Kranthi Kumar Kaile</h3>
              <p className="user_bio">Full Stack MERN Web Developer</p>
            </div>
          </div>
        ) : (
          <button
            className="retry_button button"
            type="button"
            onClick={this.onRetryProfile}
          >
            Retry
          </button>
        )}
      </div>
    )
  }

  onSelectingEmploymentType = event => {
    const {employementType} = this.state
    if (employementType.includes(event.target.value)) {
      this.setState(
        prev => ({
          employementType: prev.employementType.filter(
            each => each !== event.target.value,
          ),
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        prev => ({
          employementType: [...prev.employementType, event.target.value],
        }),
        this.getJobsList,
      )
    }
  }

  renderEmploymentFilter = () => {
    const {employementType} = this.state
    return (
      <div className="employement_type_container">
        <h1 className="filter_heading">Type of Employment</h1>
        <ul className="filter_container">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId} className="filter_container_item">
              <label className="filter_label">
                <input
                  type="checkbox"
                  className="employement_filter_input"
                  value={each.employmentTypeId}
                  checked={employementType.includes(each.employmentTypeId)}
                  onChange={this.onSelectingEmploymentType}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onSelectingSalaryRange = event => {
    this.setState({salary: event.target.value}, this.getJobsList)
  }

  renderSalaryFilter = () => {
    const {salary} = this.state
    return (
      <div className="salary_container">
        <h1 className="filter_heading">Salary Range</h1>
        <ul className="filter_container">
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId} className="filter_container_item">
              <label className="filter_label">
                <input
                  type="radio"
                  className="salary_filter_input"
                  value={each.salaryRangeId}
                  checked={each.salaryRangeId === salary}
                  onChange={this.onSelectingSalaryRange}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onSearchingJobs = event => {
    if (event.key === 'Enter') {
      this.setState({searchTerm: event.target.value}, this.getJobsList)
    }
  }

  onSearchClick = justSeeSearch => {
    this.setState({searchTerm: justSeeSearch}, this.getJobsList)
  }

  updateSearchTerm = event => {
    this.setState({justSeeSearch: event.target.value})
  }

  renderSearch = () => {
    const {justSeeSearch} = this.state
    return (
      <div className="search_container">
        <input
          className="search_input"
          type="search"
          value={justSeeSearch}
          placeholder="Search"
          onChange={this.updateSearchTerm}
          onKeyDown={this.onSearchingJobs}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search_button"
          onClick={() => this.onSearchClick(justSeeSearch)}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobCard = each => {
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = each
    return (
      <li key={each.id} className="job_card_container">
        <Link to={`/jobs/${id}`} className="job_card_link">
          <div className="company_logo_name_rating">
            <img
              className="company_logo"
              src={companyLogoUrl}
              alt="company logo"
            />
            <div className="name_rating">
              <h3 className="job_role">{title}</h3>
              <div className="rating_container">
                <FaStar className="rating_icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location_type_salary">
            <div className="location_container">
              <MdLocationOn className="job_card_icons" />
              <p className="location">{location}</p>
            </div>
            <div className="type_container">
              <FaSuitcase className="job_card_icons" />
              <p className="type">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <h3 className="description_heading">Description</h3>
          <p className="description">{jobDescription}</p>
        </Link>
      </li>
    )
  }

  renderJobsList = () => {
    const {jobList, apiStatus, searchTerm} = this.state
    const filteredJobList = jobList.filter(each =>
      each.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    switch (apiStatus) {
      case apiStatusObject.success:
        if (jobList.length > 0) {
          return (
            <ul className="jobs_container">
              {filteredJobList.map(each => this.renderJobCard(each))}
            </ul>
          )
        }
        return this.renderNoJobsView()
      case apiStatusObject.loading:
        return this.renderLoadingView()
      case apiStatusObject.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLeftPanel = () => (
    <div className="left_panel">
      {this.renderProfileView()}
      <div className="filter_block">
        {this.renderEmploymentFilter()}
        {this.renderSalaryFilter()}
      </div>
    </div>
  )

  renderRightPanel = () => (
    <div className="right_panel">
      {this.renderSearch()}
      {this.renderJobsList()}
    </div>
  )

  render() {
    return (
      <div className="job_page_container">
        <Header />
        <div className="job_page">
          {this.renderLeftPanel()}
          {this.renderRightPanel()}
        </div>
      </div>
    )
  }
}

export default Jobs
