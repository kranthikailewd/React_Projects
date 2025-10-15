import {useState} from 'react'
import './index.css'

function RandomNumberGenerator() {
  const [count, setCount] = useState(0)

  return (
    <div className="main_container">
      <div className="content_container">
        <h1 className="main_heading">Random Number</h1>
        <p className="para">
          Generate a random number in the range of 0 to 100
        </p>
        <button
          className="gen_button"
          type="button"
          onClick={() => setCount(Math.ceil(Math.random() * 100))}
        >
          Generate
        </button>
        <p className="number">{count}</p>
      </div>
    </div>
  )
}

export default RandomNumberGenerator
