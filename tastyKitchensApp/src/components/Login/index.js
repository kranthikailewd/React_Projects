import {Component} from 'react'
import Cookies from 'js-cookie'
import {Button} from '../StyledComponent/index'
import './index.css'

class Login extends Component {
  state = {userName: '', password: '', errorMsg: ''}

  componentDidMount() {
    if (Cookies.get('jwt_token')) {
      const {history} = this.props
      history.replace('/')
    }
  }

  submitUser = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({username: userName, password}),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {userName, password, errorMsg} = this.state
    return (
      <div className="login_container">
        <div className="login_block">
          <div className="login_page_image_mobile" />
          <form className="login_form" onSubmit={this.submitUser}>
            <img
              className="website_logo mobile_none"
              src="https://res.cloudinary.com/pavankalyanbandaru/image/upload/v1651083200/tasty-kitchens/website-logo.png"
              alt="website logo"
            />
            <p className="website_name mobile_none">Tasty Kitchens</p>
            <h1 className="login_heading">Login</h1>
            <div className="labels_block">
              <label className="login_label">
                USERNAME
                <input
                  value={userName}
                  className="login_input"
                  type="text"
                  onChange={event =>
                    this.setState({userName: event.target.value})
                  }
                />
              </label>
              <label className="login_label">
                PASSWORD
                <input
                  value={password}
                  className="login_input"
                  type="password"
                  onChange={event =>
                    this.setState({password: event.target.value})
                  }
                />
              </label>
            </div>
            {errorMsg && (
              <p className="error_msg">
                Please enter a valid Username & Password
              </p>
            )}
            <Button width="100%" type="submit" height="40px" marginTop="24px">
              Login
            </Button>
            <p className="login_details">rahul / rahul@2021</p>
          </form>
        </div>
        <div className="login_page_image mobile_none">
          <img
            src="https://tastykitchenbb.ccbp.tech/static/media/LoginImg.772d869c56219048bad2.png"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default Login
