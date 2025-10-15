import './index.css'

const Login = props => {
  const {switch: handleSwitch} = props
  return (
    <button onClick={handleSwitch} type="button">
      Login
    </button>
  )
}

export default Login
