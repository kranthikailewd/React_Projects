import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPassword, onDeleting} = props
  const {id, website, userName, password, bg} = passwordDetails

  const onDeletingItem = () => {
    onDeleting(id)
  }

  return (
    <li className="password_item">
      <p className={`website_profile ${bg}`}>{website[0].toUpperCase()}</p>
      <div className="password_details_text">
        <p className="website_name">{website}</p>
        <p className="userName">{userName}</p>
        {showPassword ? (
          <p className="password">{password}</p>
        ) : (
          <img
            className="hiding_password_img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button
        type="button"
        className="delete_button"
        onClick={onDeletingItem}
        data-testid="delete"
      >
        <img
          className="delete_img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
