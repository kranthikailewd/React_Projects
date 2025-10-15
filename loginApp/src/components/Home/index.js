import './index.css'
import {Component} from 'react'
import Login from '../Login/index'
import Logout from '../Logout/index'
import Message from '../Message/index'

class Home extends Component {
  state = {user: 'Login'}

  switch = () => {
    const {user} = this.state

    if (user === 'Login') {
      this.setState(() => ({user: 'Logout'}))
    } else {
      this.setState(() => ({user: 'Login'}))
    }
  }

  inOut = () => {
    const {user} = this.state

    if (user === 'Login') {
      return <Login switch={this.switch} />
    }
    return <Logout switch={this.switch} />
  }

  render() {
    const {user} = this.state
    return (
      <div className="main_container">
        <Message user={user} />
        {this.inOut()}
      </div>
    )
  }
}

export default Home
