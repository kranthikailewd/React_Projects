import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {start: true, min: 0, sec: 0}

  componentWillUnmount() {
    clearInterval(this.ticking)
  }

  onStartClick = () => {
    this.setState(previous => {
      if (previous.start === true) {
        clearInterval(this.ticking)
        this.ticking = setInterval(() => {
          this.setState(prev => {
            if (prev.sec < 59) {
              return {sec: prev.sec + 1}
            }
            if (prev.sec === 59) {
              return {min: prev.min + 1, sec: 0}
            }
            return null
          })
        }, 1000)
      }
    })
  }

  onStopClick = () => {
    clearInterval(this.ticking)
    this.setState({start: true})
  }

  onResetClick = () => {
    clearInterval(this.ticking)
    this.setState({start: true, min: 0, sec: 0})
  }

  render() {
    const {min, sec} = this.state
    const time = `${String(min).padStart(2, '0')}:${String(sec).padStart(
      2,
      '0',
    )}`
    return (
      <div className="main_container">
        <h1 className="main_heading">Stopwatch</h1>
        <div className="timer_container">
          <div className="timer_img_heading">
            <img
              className="timer_img"
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
            />
            <p className="timer_heading">Timer</p>
          </div>
          <h1 className="time">{time}</h1>
          <div className="control_panel">
            <button
              className="control_button green"
              type="button"
              onClick={this.onStartClick}
            >
              Start
            </button>
            <button
              className="control_button red"
              type="button"
              onClick={this.onStopClick}
            >
              Stop
            </button>
            <button
              className="control_button yellow"
              type="button"
              onClick={this.onResetClick}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
