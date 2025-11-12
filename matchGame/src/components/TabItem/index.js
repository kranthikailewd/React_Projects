import './index.css'

const TabItem = props => {
  const {tabDetails, activeTab, changingTab} = props
  const {tabId, displayText} = tabDetails

  const onTabSwitching = () => {
    changingTab(tabId)
  }

  const active = activeTab === tabId ? 'active' : ''

  return (
    <li className={`tab_item ${active}`}>
      <button
        type="button"
        className="tab_item_button"
        onClick={onTabSwitching}
      >
        <p className="tab_name">{displayText}</p>
      </button>
    </li>
  )
}

export default TabItem
