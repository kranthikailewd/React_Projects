import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeletingListItem} = props
  const {id, titleInput, amountInput, optionId} = transactionDetails

  const onClickingDelete = () => {
    onDeletingListItem(id)
  }
  return (
    <li className="transaction_item top_border_absent">
      <p className="transaction_item_title">{titleInput}</p>
      <p className="transaction_item_amount">{amountInput}</p>
      <p className="transaction_item_type">{optionId}</p>
      <button
        type="button"
        className="delete_button"
        onClick={onClickingDelete}
        data-testid="delete"
      >
        <img
          className="delete_image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
