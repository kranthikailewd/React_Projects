import './index.css'
import {Component} from 'react'

class FruitsCounter extends Component {
  state = {mangoes: 0, bananas: 0}

  eatMango = () =>
    this.setState(prevState => ({mangoes: prevState.mangoes + 1}))

  eatBanana = () =>
    this.setState(prevState => ({bananas: prevState.bananas + 1}))

  render() {
    const {mangoes, bananas} = this.state
    return (
      <div className="main_container">
        <h1 className="main_heading">
          Bob ate <span>{mangoes}</span> mangoes <span>{bananas}</span> bananas
        </h1>
        <div className="fruits_container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/mango-img.png"
              alt="mango"
            />
            <button onClick={this.eatMango} type="button">
              Eat Mango
            </button>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/banana-img.png"
              alt="banana"
            />
            <button onClick={this.eatBanana} type="button">
              Eat Banana
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default FruitsCounter
