import './index.css'

const AppItem = props => {
  const {appDetails} = props
  const {appName, imageUrl} = appDetails

  return (
    <li className="app_list_item">
      <img className="app_img" src={imageUrl} alt={appName} />
      <p className="app_name_para">{appName}</p>
    </li>
  )
}

export default AppItem
