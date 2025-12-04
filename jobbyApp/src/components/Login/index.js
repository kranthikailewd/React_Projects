import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onSubmitInfo = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state
    const cookieCheck = Cookies.get('jwt_token')
    if (cookieCheck !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <div className="login_block">
          <img
            className="login_img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login_input_block" onSubmit={this.onSubmitInfo}>
            <label className="login_label" htmlFor="usernameInput">
              USERNAME
            </label>
            <input
              className="login_input"
              type="text"
              id="usernameInput"
              value={username}
              placeholder="Username"
              onChange={this.onUsernameChange}
            />
            <label className="login_label" htmlFor="passwordInput">
              PASSWORD
            </label>
            <input
              className="login_input"
              type="password"
              id="passwordInput"
              value={password}
              placeholder="Password"
              onChange={this.onPasswordChange}
            />
            <button className="login_button button" type="submit">
              Login
            </button>
            {errorMsg && <p className="error_msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
