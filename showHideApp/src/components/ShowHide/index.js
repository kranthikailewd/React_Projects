import './index.css'
import {Component} from 'react'

class ShowHide extends Component {
  state = {first: null, last: null}

  showFirst = () => {
    const {first} = this.state

    if (first === 'Joe') {
      return <p className="first_name">{first}</p>
    }
    return null
  }

  showLast = () => {
    const {last} = this.state

    if (last === 'Jonas') {
      return <p className="last_name">{last}</p>
    }
    return null
  }

  onFirst = () => {
    const {first} = this.state
    if (first === 'Joe') {
      return this.setState(() => ({first: null}))
    }
    return this.setState(() => ({first: 'Joe'}))
  }

  onLast = () => {
    const {last} = this.state
    if (last === 'Jonas') {
      return this.setState(() => ({last: null}))
    }
    return this.setState(() => ({last: 'Jonas'}))
  }

  render() {
    return (
      <div className="main_container">
        <h1 className="main_heading">Show/Hide</h1>
        <div className="group">
          <div className="box">
            <button onClick={this.onFirst} type="button">
              Show/Hide Firstname
            </button>
            {this.showFirst()}
          </div>
          <div className="box">
            <button onClick={this.onLast} type="button">
              Show/Hide Lastname
            </button>
            {this.showLast()}
          </div>
        </div>
      </div>
    )
  }
}

export default ShowHide
