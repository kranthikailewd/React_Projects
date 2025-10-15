import './index.css'

const Logout = props => {
  const {switch: handleSwitch} = props
  return (
    <button onClick={handleSwitch} type="button">
      Logout
    </button>
  )
}

export default Logout
