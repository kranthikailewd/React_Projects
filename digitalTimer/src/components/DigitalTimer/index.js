import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {fixingTimer: 25, start: true, min: 25, sec: 0}

  onStartClick = () => {
    this.setState(prev => {
      if (prev.start === true) {
        clearInterval(this.ticking)
        this.ticking = setInterval(() => {
          this.setState(previous => {
            const {sec, min} = previous
            if (sec > 0) {
              return {sec: sec - 1}
            }
            if (sec === 0 && min > 0) {
              return {sec: 59, min: min - 1}
            }
            if (sec === 0 && min === 0) {
              clearInterval(this.ticking)
              return {start: true}
            }
            return null
          })
        }, 1000)
        return {start: false}
      }
      clearInterval(this.ticking)
      return {start: true}
    })
  }

  onPauseClick = () => {
    clearInterval(this.ticking)
    this.setState({start: true})
  }

  onResetClick = () => {
    clearInterval(this.ticking)
    this.setState({fixingTimer: 25, min: 25, sec: 0, start: true})
  }

  onDecClick = () => {
    const {start} = this.state
    if (start) {
      this.setState(prev => ({
        fixingTimer: prev.fixingTimer - 1,
        min: prev.fixingTimer - 1, // As we used condition in updating state we dont need condition in updating min.
      }))
    }
  }

  onIncClick = () => {
    const {start} = this.state
    if (start) {
      this.setState(prev => ({
        fixingTimer: prev.fixingTimer + 1,
        min: prev.start ? prev.fixingTimer + 1 : prev.min,
      }))
    }
  }

  render() {
    const {fixingTimer, start, min, sec} = this.state
    const showTime = `${String(min).padStart(2, '0')}:${String(sec).padStart(
      2,
      '0',
    )}`
    return (
      <div className="main_container">
        <h1 className="main_heading">Digital Timer</h1>
        <div className="time_and_controls">
          <div className="timer_container">
            <div className="timer_circle">
              <h1 className="time">{showTime}</h1>
              <p className="run_pause">{start ? 'Paused' : 'Running'}</p>
            </div>
          </div>
          <div className="control_panel">
            <div className="start_reset_container">
              <div className="start_container">
                <button
                  className="start_pause_reset_button"
                  type="button"
                  onClick={start ? this.onStartClick : this.onPauseClick}
                >
                  <img
                    className="control_panel_img"
                    src={
                      start
                        ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    }
                    alt={start ? 'play icon' : 'pause icon'}
                  />

                  {start ? 'Start' : 'Pause'}
                </button>
              </div>
              <div className="reset_container">
                <button
                  className="start_pause_reset_button"
                  type="button"
                  onClick={this.onResetClick}
                >
                  <img
                    className="control_panel_img"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <p className="start_pause_reset">Reset</p>
              </div>
            </div>
            <p className="set_timer">Set Timer limit</p>
            <div className="time_adjust_container">
              <button
                className="increase_decrease_button"
                type="button"
                onClick={this.onDecClick}
              >
                -
              </button>
              <p className="time_adjust_number">{fixingTimer}</p>
              <button
                className="increase_decrease_button"
                type="button"
                onClick={this.onIncClick}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
