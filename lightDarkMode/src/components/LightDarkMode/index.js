import './index.css'
import {Component} from 'react'

class LightDarkMode extends Component {
  state = {
    mode: 'Light Mode',
    container: 'main_container_da',
    heading: 'main_heading_da',
  }

  changeMode = () => {
    const {mode} = this.state
    if (mode === 'Dark Mode') {
      return this.setState(() => ({
        mode: 'Light Mode',
        container: 'main_container_da',
        heading: 'main_heading_da',
      }))
    }
    return this.setState(() => ({
      mode: 'Dark Mode',
      container: 'main_container_li',
      heading: 'main_heading_li',
    }))
  }

  render() {
    const {mode, container, heading} = this.state

    return (
      <div className={container}>
        <h1 className={heading}>Click To Change Mode</h1>
        <button onClick={this.changeMode} type="button">
          {mode}
        </button>
      </div>
    )
  }
}

export default LightDarkMode
