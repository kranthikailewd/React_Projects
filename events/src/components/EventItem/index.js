import './index.css'

const EventItem = props => {
  const {eventDetails, onSelectingEvent, selectedEvent} = props
  const {id, imageUrl, name, location, registrationStatus} = eventDetails

  const onTappingImg = () => {
    onSelectingEvent(id, registrationStatus)
  }

  const activeEvent = selectedEvent === id ? 'active' : ''

  return (
    <li className="event_item">
      <button
        className={`event_img_button ${activeEvent}`}
        type="button"
        onClick={onTappingImg}
      >
        <img className="event_img" src={imageUrl} alt="event" />
      </button>
      <p className="event_name">{name}</p>
      <p className="event_location">{location}</p>
    </li>
  )
}

export default EventItem
