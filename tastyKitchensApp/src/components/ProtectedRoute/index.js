import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'
import Login from '../Login/index'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" component={Login} />
  }
  return <Route {...props} />
}

export default ProtectedRoute
