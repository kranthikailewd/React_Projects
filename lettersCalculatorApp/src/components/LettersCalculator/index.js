import './index.css'
import {useState} from 'react'

const LettersCalculator = () => {
  const [message, setMessage] = useState('No.of letters: 0')

  const toCount = event =>
    setMessage(`No.of letters: ${event.target.value.length}`)

  return (
    <div className="main_container">
      <div className="cal_text">
        <h1 className="main_heading">Calculate the Letters you enter</h1>
        <label htmlFor="textCount" className="para">
          Enter the Phrase
        </label>
        <input
          type="text"
          id="textCount"
          name="Enter the Phrase"
          onChange={toCount}
        />
        <p>{message}</p>
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png"
        alt="letters calculator"
      />
    </div>
  )
}

export default LettersCalculator

// useState("") → for text or string data

// useState(0) → for numeric data

// useState([]) → for arrays

// useState({}) → for objects

// We can use 2 useState state-hooks

//   const [text, setText] = useState("");
//   const [count, setCount] = useState(0);
