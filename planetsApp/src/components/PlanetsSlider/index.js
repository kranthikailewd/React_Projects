import Slider from 'react-slick'
import PlanetItem from '../PlanetItem/index'
import './index.css'

const PlanetsSlider = props => {
  const {planetsList} = props
  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div className="slider_container" data-testid="planets">
      <h1 className="slider_heading">PLANETS</h1>
      <Slider {...settings}>
        {planetsList.map(each => (
          <PlanetItem key={each.id} planetDetails={each} />
        ))}
      </Slider>
    </div>
  )
}

export default PlanetsSlider
