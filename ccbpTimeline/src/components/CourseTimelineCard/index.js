import {AiFillClockCircle} from 'react-icons/ai'
import './index.css'

const CourseTimelineCard = props => {
  const {courseDetails} = props
  const {courseTitle, description, duration, tagsList} = courseDetails

  return (
    <div className="chrono_card">
      <div className="course_title_duration">
        <h1 className="card_heading">{courseTitle}</h1>
        <div className="duration_block">
          <AiFillClockCircle className="icon" />
          <p className="duration">{duration}</p>
        </div>
      </div>
      <p className="description">{description}</p>
      <div className="topics_covered">
        {tagsList.map(each => (
          <p key={each.id} className="topic">
            {each.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default CourseTimelineCard
