import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiExternalLink} from 'react-icons/hi'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header/index'
import './index.css'

const apiStatusObject = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    formattedJobDetails: {},
    formattedSkills: [],
    formattedSimilarJobs: [],
    apiStatus: apiStatusObject.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusObject.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    if (response.ok) {
      const jobDetailsGrab = data.job_details
      const similarJobDetailsGrab = data.similar_jobs

      const formattedJobDetails = {
        companyLogoUrl: jobDetailsGrab.company_logo_url,
        companyWebsiteUrl: jobDetailsGrab.company_website_url,
        employmentType: jobDetailsGrab.employment_type,
        jobDescription: jobDetailsGrab.job_description,
        lifeAtCompany: jobDetailsGrab.life_at_company,
        location: jobDetailsGrab.location,
        packagePerAnnum: jobDetailsGrab.package_per_annum,
        rating: jobDetailsGrab.rating,
        title: jobDetailsGrab.title,
      }
      const formattedSkills = jobDetailsGrab.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const formattedSimilarJobs = similarJobDetailsGrab.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        formattedJobDetails,
        formattedSkills,
        formattedSimilarJobs,
        apiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({apiStatus: apiStatusObject.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryGetJobs = () => {
    this.getJobDetails()
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

  renderJobDetails = () => {
    const {formattedJobDetails, formattedSkills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = formattedJobDetails

    return (
      <div className="job_details_block">
        <div className="company_logo_name_rating">
          <img
            className="company_logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="name_rating">
            <h1 className="job_role">{title}</h1>
            <div className="rating_container">
              <FaStar className="rating_icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location_type_salary jid_lts">
          <div className="location_container">
            <MdLocationOn className="job_card_icons jid_icons" />
            <p className="location">{location}</p>
          </div>
          <div className="type_container">
            <FaSuitcase className="job_card_icons jid_icons" />
            <p className="type">{employmentType}</p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <div className="description_companysite">
          <h3 className="description_heading jid_dh">Description</h3>
          <a className="visit_link" href={companyWebsiteUrl}>
            Visit <HiExternalLink className="link_icon" />
          </a>
        </div>
        <p className="description jid_d">{jobDescription}</p>
        <h3 className="skills_block_heading">Skills</h3>
        <ul className="skills_list">
          {formattedSkills.map(each => (
            <li key={each.name} className="skill_box">
              <img className="skills_img" src={each.imageUrl} alt={each.name} />
              <p className="skill_name">{each.name}</p>
            </li>
          ))}
        </ul>
        <h3 className="life_block_heading">Life at Company</h3>
        <div className="life_block">
          <p className="life_para">{lifeAtCompany.description}</p>
          <img
            className="life_img"
            src={lifeAtCompany.image_url}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobCard = each => {
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      rating,
      title,
    } = each
    return (
      <li key={id} className="similar_job_card">
        <Link to={`/jobs/${id}`} className="similar_job_card_link">
          <div className="company_logo_name_rating">
            <img
              className="company_logo"
              src={companyLogoUrl}
              alt="similar job company logo"
            />
            <div className="name_rating">
              <h1 className="job_role">{title}</h1>
              <div className="rating_container">
                <FaStar className="rating_icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <h3 className="description_heading sjc_dh">Description</h3>
          <p className="description sjc_d">{jobDescription}</p>
          <div className="location_type_salary sjc_lts">
            <div className="location_container">
              <MdLocationOn className="job_card_icons" />
              <p className="location">{location}</p>
            </div>
            <div className="type_container">
              <FaSuitcase className="job_card_icons" />
              <p className="type">{employmentType}</p>
            </div>
          </div>
        </Link>
      </li>
    )
  }

  renderSimilarJobs = () => {
    const {formattedSimilarJobs} = this.state

    return (
      <div className="similar_jobs_block">
        <h3 className="similar_jobs_block_heading">Similar Jobs</h3>
        <ul className="similar_jobs_list">
          {formattedSimilarJobs.map(each => this.renderSimilarJobCard(each))}
        </ul>
      </div>
    )
  }

  renderJobDetailsSuccess = () => (
    <>
      {this.renderJobDetails()}
      {this.renderSimilarJobs()}
    </>
  )

  renderJobsDetailsPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusObject.success:
        return this.renderJobDetailsSuccess()
      case apiStatusObject.loading:
        return this.renderLoadingView()
      case apiStatusObject.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job_details_container">
        <Header />
        <div className="job_detail_page">{this.renderJobsDetailsPage()}</div>
      </div>
    )
  }
}

export default JobItemDetails
