import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import './index.css'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', showStarredOnly: false}

  onAddingAppointment = event => {
    event.preventDefault()
    const {appointmentsList, title, date} = this.state
    const newAppointmentToAdd = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      starred: false,
    }
    const newList = [...appointmentsList, newAppointmentToAdd]
    this.setState({appointmentsList: newList, title: '', date: ''})
  }

  toggleStar = id => {
    const {appointmentsList} = this.state
    const updatingStarStatusInList = appointmentsList.map(each => {
      const {starred} = each
      if (each.id === id) {
        return {...each, starred: !starred}
      }
      return each
    })
    this.setState({appointmentsList: updatingStarStatusInList})
  }

  onStarFiltering = () => {
    this.setState(prev => ({showStarredOnly: !prev.showStarredOnly}))
  }

  onEnteringTitle = event => {
    this.setState({title: event.target.value})
  }

  onEnteringDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointmentsList, title, date, showStarredOnly} = this.state

    const finalList = showStarredOnly
      ? appointmentsList.filter(each => each.starred)
      : appointmentsList

    const addingClassToStarred = showStarredOnly ? 'starred_highlight' : ''

    return (
      <div className="main_container">
        <div className="inputs_image_container">
          <div className="inputs_add_container">
            <h1 className="main_heading">Add Appointment</h1>
            <form
              className="input_add_container"
              onSubmit={this.onAddingAppointment}
            >
              <label htmlFor="titleInput">TITLE</label>
              <input
                type="text"
                value={title}
                className="title_input"
                id="titleInput"
                placeholder="Title"
                onChange={this.onEnteringTitle}
              />
              <label htmlFor="dateInput">DATE</label>
              <input
                type="date"
                value={date}
                className="date_input"
                id="dateInput"
                placeholder="dd/mm/yy"
                onChange={this.onEnteringDate}
              />
              <button type="submit" className="add_button">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
            className="main_img"
          />
        </div>
        <hr />
        <div className="appointments_panel">
          <div className="appointments_panel_heading_starred">
            <h2 className="appointments_panel_heading">Appointments</h2>
            <button
              className={`starred_button ${addingClassToStarred}`}
              type="button"
              onClick={this.onStarFiltering}
            >
              Starred
            </button>
          </div>
          <ul className="appointments_container">
            {finalList.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
