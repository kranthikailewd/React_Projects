import './index.css'

import {Component} from 'react'

class Speedometer extends Component {
  state = {speed: 0}

  onAcceleration = () => {
    this.setState(prevState => {
      if (prevState.speed < 200) {
        return {speed: prevState.speed + 10}
      }
      return null
    })
  }

  onBrake = () => {
    this.setState(prevState => {
      if (prevState.speed > 0) {
        return {speed: prevState.speed - 10}
      }
      return null
    })
  }

  render() {
    const {speed} = this.state

    return (
      <div className="main_container">
        <h1 className="main_heading">SPEEDOMETER</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png"
          alt="Speedometer"
        />
        <h1 className="speed_para">Speed is {speed}mph</h1>
        <p className="para">Min Limit is 0mph, Max Limit is 200mph</p>
        <div className="button_group">
          <button
            type="button"
            className="speed_button"
            onClick={this.onAcceleration}
          >
            Accelerate
          </button>
          <button type="button" className="brake_button" onClick={this.onBrake}>
            Apply Brake
          </button>
        </div>
      </div>
    )
  }
}

export default Speedometer
