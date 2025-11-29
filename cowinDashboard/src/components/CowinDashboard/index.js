import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage/index'
import VaccinationByGender from '../VaccinationByGender/index'
import VaccinationByAge from '../VaccinationByAge/index'
import './index.css'

const apiStatusData = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

const sampleWeekData = [
  {
    vaccine_date: '30th Jul',
    dose_1: 2757930,
    dose_2: 1217805,
  },
  {
    vaccine_date: '31st Jul',
    dose_1: 3767930,
    dose_2: 1816505,
  },
  {
    vaccine_date: '1st Aug',
    dose_1: 3357930,
    dose_2: 1517805,
  },
  {
    vaccine_date: '2nd Aug',
    dose_1: 2953030,
    dose_2: 1617805,
  },
  {
    vaccine_date: '3rd Aug',
    dose_1: 2557930,
    dose_2: 1417805,
  },
  {
    vaccine_date: '4th Aug',
    dose_1: 3227930,
    dose_2: 2017805,
  },
  {
    vaccine_date: '5th Aug',
    dose_1: 3237930,
    dose_2: 1517805,
  },
]

class CowinDashboard extends Component {
  state = {
    weekData: [],
    byAge: [],
    byGender: [],
    apiStatus: apiStatusData.initial,
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({apiStatus: apiStatusData.loading})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok) {
      const data = await response.json()
      const setData =
        data.last_7_days_vaccination.length > 0
          ? data.last_7_days_vaccination
          : sampleWeekData
      const weekData = setData.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      const byAge = data.vaccination_by_age
      const byGender = data.vaccination_by_gender
      this.setState({
        weekData,
        byAge,
        byGender,
        apiStatus: apiStatusData.success,
      })
      console.log(data)
    } else {
      this.setState({apiStatus: apiStatusData.failure})
    }
  }

  renderSuccessView = () => {
    const {weekData, byGender, byAge} = this.state

    return (
      <>
        <VaccinationCoverage weekData={weekData} />
        <VaccinationByGender byGender={byGender} />
        <VaccinationByAge byAge={byAge} />
      </>
    )
  }

  renderLoadingView = () => (
    <>
      <div data-testid="loader" className="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <div className="failure">
        <img
          className="failure_img"
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1 className="failure_heading">Something went wrong</h1>
      </div>
    </>
  )

  cowinRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'LOADING':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main_container">
        <div className="brand">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p className="brand_name">Co-WIN</p>
        </div>
        <h1 className="main_heading">CoWIN Vaccination in India</h1>
        {this.cowinRender()}
      </div>
    )
  }
}

export default CowinDashboard
