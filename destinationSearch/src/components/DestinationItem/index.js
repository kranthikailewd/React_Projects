import './index.css'

const DestinationItem = props => {
  const {name, imgUrl} = props
  return (
    <li className="place_item">
      <img src={imgUrl} className="place_image" alt={name} />
      <p className="place_para">{name}</p>
    </li>
  )
}

export default DestinationItem
