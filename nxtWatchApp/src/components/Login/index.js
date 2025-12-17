import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showPassword: false}

  getUserInfo = async event => {
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

  render() {
    const {username, password, errorMsg, showPassword} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <form
          className="login_block"
          onSubmit={event => this.getUserInfo(event)}
        >
          <img
            className="login_img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
          />
          <label className="login_label">
            USERNAME
            <input
              className="login_input"
              type="text"
              value={username}
              placeholder="Username"
              onChange={event => this.setState({username: event.target.value})}
            />
          </label>
          <label className="login_label">
            PASSWORD
            <input
              className="login_input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onChange={event => this.setState({password: event.target.value})}
            />
          </label>
          <label className="show_label">
            <input
              className="show_input"
              type="checkbox"
              checked={showPassword}
              onChange={() => this.setState({showPassword: !showPassword})}
            />
            Show Password
          </label>
          <button className="login_button" type="submit">
            Login
          </button>
          {errorMsg && <p className="error_msg">*{errorMsg}</p>}
        </form>
        <div className="login_details_container">
          <p className="login_details">rahul  &  rahul@2021</p>
        </div>
      </div>
    )
  }
}

export default Login
