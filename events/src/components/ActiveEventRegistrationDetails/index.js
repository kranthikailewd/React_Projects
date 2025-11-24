import './index.css'

const ActiveEventRegistrationDetails = props => {
  const {registrationStatus} = props

  const yetToRegisterView = () => (
    <>
      <img
        className="yet_to_register_img"
        src="https://assets.ccbp.in/frontend/react-js/events-register-img.png"
        alt="yet to register"
      />
      <p className="yet_to_register_info">
        A live performance brings so much to your relationship with dance.
        Seeing dance live can often make you fall totally in love with this
        beautiful art form.
      </p>
      <button className="yet_to_register_button" type="button">
        Register Here
      </button>
    </>
  )

  const registered = () => (
    <>
      <img
        className="registered_img"
        src="https://assets.ccbp.in/frontend/react-js/events-regestered-img.png"
        alt="registered"
      />
      <h1 className="registered_info">
        You have already registered for the event
      </h1>
    </>
  )

  const registrationsClosed = () => (
    <>
      <img
        className="registrations_closed_img"
        src="https://assets.ccbp.in/frontend/react-js/events-registrations-closed-img.png"
        alt="registrations closed"
      />
      <h1 className="registrations_closed_heading">
        Registrations Are Closed Now!
      </h1>
      <p className="registrations_closed_info">
        Stay Tuned! We will reopen the registrations soon.
      </p>
    </>
  )

  const runSwitch = () => {
    switch (registrationStatus) {
      case 'YET_TO_REGISTER':
        return yetToRegisterView()
      case 'REGISTERED':
        return registered()
      case 'REGISTRATIONS_CLOSED':
        return registrationsClosed()
      default:
        return null
    }
  }

  return <div className="registration_block">{runSwitch()}</div>
}

export default ActiveEventRegistrationDetails
