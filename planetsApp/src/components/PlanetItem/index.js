import './index.css'

const PlanetItem = props => {
  const {planetDetails} = props
  const {name, imageUrl, description} = planetDetails
  return (
    <div className="slider_planet">
      <img className="planet_img" src={imageUrl} alt={`planet ${name}`} />
      <h1 className="planet_name">{name}</h1>
      <p className="planet_info">{description}</p>
    </div>
  )
}

export default PlanetItem
