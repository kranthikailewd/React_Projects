import {Button} from '../StyledComponent/index'
import Context from '../../context/context'

import './index.css'

const NotFound = props => (
  <Context.Consumer>
    {value => {
      const {settingTab} = value
      return (
        <div className="not_found_container">
          <img
            className="not_found_img"
            src="https://res.cloudinary.com/pavankalyanbandaru/image/upload/v1651083038/tasty-kitchens/page-not-found.png"
            alt="not found"
          />
          <h1 className="not_found_heading">Page Not Found</h1>
          <p className="not_found_info">
            We are sorry, the page you requested could not be found. Please go
            back to the homepage
          </p>
          <Button
            className="button_hide_on_mobile"
            type="button"
            width="fit-content"
            bgColor="#f7931e"
            color="#ffffff"
            onClick={() => {
              const {history} = props
              settingTab(1)
              history.replace('/')
            }}
          >
            Home Page
          </Button>
          <Button
            className="button_hide_on_desktop"
            type="button"
            width="fit-content"
            bgColor="#f7931e"
            color="#ffffff"
            fontSize="12px"
            fontWeight="500"
            onClick={() => {
              const {history} = props
              settingTab(1)
              history.replace('/')
            }}
          >
            Home Page
          </Button>
        </div>
      )
    }}
  </Context.Consumer>
)

export default NotFound
