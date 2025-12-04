import Header from '../Header/index'
import './index.css'

const NotFound = () => (
  <div className="not_found_container">
    <Header />
    <div className="not_found_block">
      <img
        className="not_found_img"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not_found_heading">Page Not Found</h1>
      <p className="not_found_para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
