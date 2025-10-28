import './index.css'

const TabItem = props => {
  const {onClickTabChange, activeTabId, tabDetails} = props
  const {tabId, displayText} = tabDetails

  const onTabClick = () => {
    onClickTabChange(tabId)
  }

  const checkActiveTab = tabId === activeTabId ? 'active_tab' : ''

  return (
    <li className="tabs_list_item">
      <button
        className={`tab_item ${checkActiveTab}`}
        type="button"
        onClick={onTabClick}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
