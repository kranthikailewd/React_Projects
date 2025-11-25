import './index.css'

const LanguageFilterItem = props => {
  const {tabDetails, onSwitchingTab, activeRepoCategory} = props
  const {id, language} = tabDetails

  const onChangingTab = () => {
    onSwitchingTab(id)
  }

  const activeId = id === activeRepoCategory ? 'active' : ''

  return (
    <li className="tab">
      <button
        className={`tab_button ${activeId}`}
        type="button"
        onClick={onChangingTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
