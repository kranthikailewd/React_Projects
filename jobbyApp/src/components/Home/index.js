import {Link} from 'react-router-dom'
import Header from '../Header/index'
import './index.css'

const Home = () => (
  <div className="home_container">
    <Header />
    <div className="home_content_block">
      <h1 className="home_main_heading">Find The Job That Fits Your Life</h1>
      <p className="home_para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="find_jobs_link">
        <button className="find_jobs_button button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
