import {AiFillCalendar} from 'react-icons/ai'
import './index.css'

const TimelineView = props => {
  const {projectDetails} = props
  const {
    projectTitle,
    description,
    imageUrl,
    duration,
    projectUrl,
  } = projectDetails

  return (
    <div className="chrono_card">
      <img className="project_img" src={imageUrl} alt="project" />
      <div className="course_title_duration">
        <h1 className="card_heading">{projectTitle}</h1>
        <div className="duration_block">
          <AiFillCalendar className="icon" />
          <p className="duration">{duration}</p>
        </div>
      </div>
      <p className="description">{description}</p>
      <a href={projectUrl} className="visit_link">
        Visit
      </a>
    </div>
  )
}

export default TimelineView
