import Header from '../Header/index'
import './index.css'

const NotFound = () => (
  <div className="notfound_container">
    <Header />
    <div className="notfound_block">
      <img
        className="notfound_img"
        src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
        alt="not found"
      />
      <h1 className="notfound_heading">Lost Your Way?</h1>
      <p className="notfound_para">
        Sorry, we cannot find that page. You will find lots to explore on the
        home page
      </p>
    </div>
  </div>
)

export default NotFound
