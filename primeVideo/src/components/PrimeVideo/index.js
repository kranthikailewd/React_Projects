import MoviesSlider from '../MoviesSlider/index'
import './index.css'

const PrimeVideo = props => {
  const {moviesList} = props

  return (
    <div className="main_container">
      <img
        className="prime_img"
        src="https://assets.ccbp.in/frontend/react-js/prime-video-img.png"
        alt="prime video"
      />
      <div className="content_container">
        <h1 className="main_heading">Action Movies</h1>
        <MoviesSlider
          moviesList={moviesList.filter(each => each.categoryId === 'ACTION')}
        />
        <h1 className="main_heading">Comedy Movies</h1>
        <MoviesSlider
          moviesList={moviesList.filter(each => each.categoryId === 'COMEDY')}
        />
      </div>
    </div>
  )
}

export default PrimeVideo
