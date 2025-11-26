import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    titleSearch,
    category,
    rating,
    updatingTitlesearch,
    updatingCategory,
    updatingRating,
    clearFilter,
    updatingTitleOnEnter,
    categoryOptions,
    ratingsList,
  } = props

  const updatingSearch = event => {
    updatingTitlesearch(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <div className="search_container">
        <input
          type="search"
          value={titleSearch}
          className="title_search"
          placeholder="Search"
          onChange={updatingSearch}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              updatingTitleOnEnter()
            }
          }}
        />
        <BsSearch className="search_icon" />
      </div>
      <div className="cat_and_rat">
        <div className="cat_container">
          <h1 className="filter_heading">Category</h1>
          <ul className="category_list">
            {categoryOptions.map(each => (
              <p
                key={each.categoryId}
                className={
                  category === each.categoryId
                    ? 'category_button active'
                    : 'category_button'
                }
                type="button"
                onClick={() => updatingCategory(each.categoryId)}
              >
                {each.name}
              </p>
            ))}
          </ul>
        </div>
        <div className="rat_container">
          <h1 className="filter_heading">Rating</h1>
          <ul className="rating_list">
            {ratingsList.map(each => (
              <button
                key={each.ratingId}
                className={
                  rating === each.ratingId
                    ? 'rating_button active'
                    : 'rating_button'
                }
                type="button"
                onClick={() => updatingRating(each.ratingId)}
              >
                <img
                  className="rating_img"
                  src={each.imageUrl}
                  alt={`rating ${each.ratingId}`}
                />
                <p className="up_text">& up</p>
              </button>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="clearing_button"
        type="button"
        onClick={() => clearFilter()}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
