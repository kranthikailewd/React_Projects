import './index.css'
import {Component} from 'react'

class Welcome extends Component {
  state = {subscribe: 'Subscribe'}

  checkSubscription = () => {
    const {subscribe} = this.state

    if (subscribe === 'Subscribe') {
      return this.setState(() => ({subscribe: 'Subscribed'}))
    }
    return this.setState(() => ({subscribe: 'Subscribe'}))
  }

  render() {
    const {subscribe} = this.state
    return (
      <div className="main_container">
        <h1 className="main_heading">Welcome</h1>
        <p className="para">Thank you! Happy Learning</p>
        <button onClick={this.checkSubscription} type="button">
          {subscribe}
        </button>
      </div>
    )
  }
}

export default Welcome
