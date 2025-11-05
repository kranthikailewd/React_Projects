import './index.css'

const MoneyDetails = props => {
  const {totalBalance, totalIncome, totalExpenses} = props
  return (
    <div className="money_details_container">
      <div className="money_details_card yellow">
        <img
          className="money_details_card_image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="money_card_text">
          <p className="money_card_heading">Your Balance</p>
          <p className="totalBalance" data-testid="balanceAmount">
            Rs {totalBalance}
          </p>
        </div>
      </div>
      <div className="money_details_card skyblue">
        <img
          className="money_details_card_image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="money_card_text">
          <p className="money_card_heading">Your Income</p>
          <p className="totalIncome" data-testid="incomeAmount">
            Rs {totalIncome}
          </p>
        </div>
      </div>
      <div className="money_details_card violet">
        <img
          className="money_details_card_image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="money_card_text">
          <p className="money_card_heading">Your Expenses</p>
          <p className="totalExpenses" data-testid="expensesAmount">
            Rs {totalExpenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
