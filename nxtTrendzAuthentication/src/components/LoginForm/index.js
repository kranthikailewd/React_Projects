import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', wentWrong: false, errorMsg: ''}

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmittingForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.setState({
        wentWrong: true,
        errorMsg: data.error_msg,
      })
    }
  }

  onChangingUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangingPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, wentWrong, errorMsg} = this.state
    return (
      <div className="login_container">
        <div className="login_main_image_block">
          <img
            className="login_main_image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
          />
        </div>
        <form className="login_form" onSubmit={this.onSubmittingForm}>
          <img
            className="website_logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
          <label htmlFor="userNameInput" className="input_labels">
            USERNAME
          </label>
          <input
            id="userNameInput"
            type="text"
            value={username}
            placeholder="Username"
            onChange={this.onChangingUsername}
          />
          <label htmlFor="passwordInput" className="input_labels">
            PASSWORD
          </label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            placeholder="Password"
            onChange={this.onChangingPassword}
          />
          <button className="submit_button" type="submit">
            Login
          </button>
          {wentWrong && <p className="error_msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
