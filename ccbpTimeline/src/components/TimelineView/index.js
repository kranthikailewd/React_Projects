import {Chrono} from 'react-chrono'
import CourseTimelineCard from '../CourseTimelineCard/index'
import ProjectTimelineCard from '../ProjectTimelineCard/index'
import './index.css'

const TimelineView = props => {
  const {timelineItemsList} = props
  const timeTitle = timelineItemsList.map(each => ({
    title: each.title,
  }))

  return (
    <div className="main_container">
      <p className="my_journey">MY JOURNEY OF</p>
      <h1 className="main_heading">CCBP 4.0</h1>

      <Chrono mode="VERTICAL_ALTERNATING" items={timeTitle}>
        {timelineItemsList.map(each => {
          if (each.categoryId === 'COURSE') {
            return <CourseTimelineCard key={each.id} courseDetails={each} />
          }
          return <ProjectTimelineCard key={each.id} projectDetails={each} />
        })}
      </Chrono>
    </div>
  )
}

export default TimelineView
