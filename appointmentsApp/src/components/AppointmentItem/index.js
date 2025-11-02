import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, starred} = appointmentDetails

  const onClickingStarIcon = () => {
    toggleStar(id)
  }

  const starring = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointmentItem">
      <div className="title_star_block">
        <p className="appointment_heading">{title}</p>
        <button
          type="button"
          className="star_button"
          onClick={onClickingStarIcon}
          data-testid="star"
        >
          <img className="star_image" src={starring} alt="star" />
        </button>
      </div>
      <p className="appointment_date">{date}</p>
    </li>
  )
}

export default AppointmentItem
