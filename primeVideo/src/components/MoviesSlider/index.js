import Slider from 'react-slick'
import MovieItem from '../MovieItem/index'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MoviesSlider = props => {
  const {moviesList} = props
  const lgSettings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  }
  const smSettings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <>
      <Slider {...lgSettings} className="lg_slider">
        {moviesList.map(each => (
          <MovieItem key={each.id} movieDetails={each} />
        ))}
      </Slider>
      <Slider {...smSettings} className="sm_slider">
        {moviesList.map(each => (
          <MovieItem key={each.id} movieDetails={each} />
        ))}
      </Slider>
    </>
  )
}

export default MoviesSlider
