import './index.css'
import {Component} from 'react'

class EvenOddApp extends Component {
  state = {count: 0}

  increment = () => {
    this.setState(() => ({count: Math.floor(Math.random() * 101)}))
  }

  render() {
    const {count} = this.state
    let id
    if (count % 2 === 0) {
      id = 'Even'
    } else {
      id = 'Odd'
    }
    return (
      <div className="main_container">
        <h1 className="main_heading">Count {count}</h1>
        <p className="para">Count is {id}</p>
        <button onClick={this.increment} type="button">
          Increment
        </button>
        <p className="info">* Increase by Random Number Between 0 to 100</p>
      </div>
    )
  }
}

export default EvenOddApp
