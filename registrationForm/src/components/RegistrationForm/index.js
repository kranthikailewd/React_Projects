import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    firstLostFocus: false,
    lastLostFocus: false,
    showSubmitSuccess: false,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state
    if (firstName === '' && lastName === '') {
      this.setState({firstLostFocus: true, lastLostFocus: true})
    } else if (firstName === '') {
      this.setState({firstLostFocus: true})
    } else if (lastName === '') {
      this.setState({lastLostFocus: true})
    } else {
      this.setState({firstName: '', lastName: '', showSubmitSuccess: true})
    }
  }

  onSubmitAnother = () => {
    this.setState({showSubmitSuccess: false})
  }

  updateFirst = event => {
    this.setState({firstName: event.target.value})
  }

  updateLast = event => {
    this.setState({lastName: event.target.value})
  }

  firstBlur = () => {
    const {firstName} = this.state
    if (firstName === '') {
      this.setState({firstLostFocus: true})
    } else {
      this.setState({firstLostFocus: false})
    }
  }

  lastBlur = () => {
    const {lastName} = this.state
    if (lastName === '') {
      this.setState({lastLostFocus: true})
    } else {
      this.setState({lastLostFocus: false})
    }
  }

  giveResponse = () => {
    const {firstName, lastName, firstLostFocus, lastLostFocus} = this.state
    const firstClass = firstLostFocus ? 'first_class highlight' : 'first_class'
    const lastClass = lastLostFocus ? 'last_class highlight' : 'last_class'
    return (
      <div className="main_container">
        <h1 className="main_heading">Registration</h1>
        <form className="registration_form" onSubmit={this.onSubmitForm}>
          <label className="labels" htmlFor="firstId">
            FIRST NAME
          </label>
          <input
            id="firstId"
            type="text"
            className={firstClass}
            value={firstName}
            placeholder="First name"
            onChange={this.updateFirst}
            onBlur={this.firstBlur}
          />
          {firstLostFocus && <p className="errorMsg">Required</p>}
          <label className="labels" htmlFor="lastId">
            LAST NAME
          </label>
          <input
            id="lastId"
            type="text"
            className={lastClass}
            value={lastName}
            placeholder="Last name"
            onChange={this.updateLast}
            onBlur={this.lastBlur}
          />
          {lastLostFocus && <p className="errorMsg">Required</p>}
          <button className="submit_button" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }

  giveAnother = () => (
    <div className="main_container">
      <h1 className="main_heading">Registration</h1>
      <div className="submit_another_block">
        <img
          className="success_img"
          src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
          alt="success"
        />
        <p className="success_heading">Submitted Successfully</p>
        <button
          className="submit_another_button"
          type="button"
          onClick={this.onSubmitAnother}
        >
          Submit Another Response
        </button>
      </div>
    </div>
  )

  render() {
    const {showSubmitSuccess} = this.state
    return showSubmitSuccess ? this.giveAnother() : this.giveResponse()
  }
}

export default RegistrationForm
