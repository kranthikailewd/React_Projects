import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem/index'
import './index.css'

const colors = ['yellow', 'green', 'orange', 'mint', 'brown', 'blue', 'grey']

class PasswordCreator extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    passwordList: [],
    searchTerm: '',
    showPassword: false,
  }

  onAddingPassword = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const addingNewPassword = {
      id: uuidv4(),
      website,
      userName,
      password,
      bg: colors[Math.floor(Math.random() * colors.length)],
    }
    this.setState(prev => ({
      website: '',
      userName: '',
      password: '',
      passwordList: [...prev.passwordList, addingNewPassword],
    }))
  }

  onShowingPasswords = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  onSearching = event => {
    this.setState({searchTerm: event.target.value})
  }

  onDeleting = id => {
    const {passwordList} = this.state
    this.setState({passwordList: passwordList.filter(each => each.id !== id)})
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({userName: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {
      website,
      userName,
      password,
      passwordList,
      searchTerm,
      showPassword,
    } = this.state

    const updatedListBySearch = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div className="main_container">
        <img
          className="app_logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password_creating_container">
          <form
            className="password_create_panel"
            onSubmit={this.onAddingPassword}
          >
            <h1 className="main_heading">Add New Password</h1>
            <div className="input_div">
              <img
                className="input_img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                id="websiteInput"
                value={website}
                placeholder="Enter Website"
                onChange={this.onWebsiteChange}
                required
              />
            </div>
            <div className="input_div">
              <img
                className="input_img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                id="userNameInput"
                value={userName}
                placeholder="Enter Username"
                onChange={this.onUsernameChange}
                required
              />
            </div>
            <div className="input_div">
              <img
                className="input_img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                id="passwordInput"
                value={password}
                placeholder="Enter Password"
                onChange={this.onPasswordChange}
                required
              />
            </div>
            <button className="add_button" type="submit">
              Add
            </button>
          </form>
          <div className="main_img_container">
            <img
              className="main_img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="password_control_panel">
          <div className="password_count_and_search">
            <div className="your_password_count_block">
              <h1 className="password_count">Your Passwords </h1>
              <p className="password_count_number">
                {updatedListBySearch.length}
              </p>
            </div>
            <div className="search_container">
              <img
                className="search_img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                id="searchInput"
                value={searchTerm}
                placeholder="Search"
                onChange={this.onSearching}
              />
            </div>
          </div>
          <div className="checkbox_container">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={this.onShowingPasswords}
            />
            <label htmlFor="showPassword">Show Passwords</label>
          </div>
          {updatedListBySearch.length !== 0 ? (
            <ul className="passwords_container">
              {updatedListBySearch.map(each => (
                <PasswordItem
                  key={each.id}
                  passwordDetails={each}
                  showPassword={showPassword}
                  onDeleting={this.onDeleting}
                />
              ))}
            </ul>
          ) : (
            <div className="show_nothing">
              <img
                className="no_password_img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no_password_text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordCreator
