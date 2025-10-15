import './index.css'

const Message = props => {
  const {user} = props
  if (user === 'Login') {
    return <h1 className="main_heading">Please Login</h1>
  }
  return <h1 className="main_heading">Welcome User</h1>
}

export default Message
