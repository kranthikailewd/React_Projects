import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: 'INCOME',
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
  }

  onDeletingListItem = id => {
    this.setState(prev => {
      const updatedTransactionsList = prev.transactionsList.filter(
        each => each.id !== id,
      )
      const income = updatedTransactionsList.reduce(
        (sum, each) =>
          sum + (each.optionId === 'Income' ? Number(each.amountInput) : 0),
        0,
      )
      const expenses = updatedTransactionsList.reduce(
        (sum, each) =>
          sum + (each.optionId === 'Expenses' ? Number(each.amountInput) : 0),
        0,
      )
      return {
        transactionsList: updatedTransactionsList,
        totalIncome: income,
        totalExpenses: expenses,
        totalBalance: income - expenses,
      }
    })
  }

  onSubmittingTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const newTransaction = {
      id: uuidv4(),
      titleInput,
      amountInput: Number(amountInput),
      optionId: transactionTypeOptions.find(each => each.optionId === optionId)
        .displayText, // Use displayText directly for consistency,
    }
    this.setState(prev => {
      const updatedTransactionsList = [...prev.transactionsList, newTransaction]
      const income = updatedTransactionsList.reduce(
        (sum, each) =>
          sum + (each.optionId === 'Income' ? Number(each.amountInput) : 0),
        0,
      )
      const expenses = updatedTransactionsList.reduce(
        (sum, each) =>
          sum + (each.optionId === 'Expenses' ? Number(each.amountInput) : 0),
        0,
      )
      return {
        transactionsList: updatedTransactionsList,
        titleInput: '',
        amountInput: '',
        totalIncome: income,
        totalExpenses: expenses,
        totalBalance: income - expenses,
      }
    })
  }

  onEnteringTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onEnteringAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onEnteringType = event => {
    this.setState({optionId: event.target.value})
  }

  render() {
    const {
      transactionsList,
      titleInput,
      optionId,
      amountInput,
      totalBalance,
      totalIncome,
      totalExpenses,
    } = this.state
    return (
      <div className="main_container">
        <div className="user_card">
          <h1 className="main_heading">Hi, Kranthi</h1>
          <p className="greetings">
            Welcome back to your <span className="app_name">Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <div className="add_transaction_and_history">
          <div className="add_transaction">
            <h2 className="add_transaction_heading">Add Transaction</h2>
            <form
              className="add_transaction_form"
              onSubmit={this.onSubmittingTransaction}
            >
              <label htmlFor="titleInput">TITLE</label>
              <input
                type="text"
                id="titleInput"
                value={titleInput}
                onChange={this.onEnteringTitle}
                placeholder="TITLE"
                required
              />
              <label htmlFor="amountInput">AMOUNT</label>
              <input
                type="text"
                id="amountInput"
                value={amountInput}
                onChange={this.onEnteringAmount}
                placeholder="AMOUNT"
                required
              />
              <label htmlFor="menu">TYPE</label>
              <select id="menu" value={optionId} onChange={this.onEnteringType}>
                {transactionTypeOptions.map(each => (
                  <option
                    key={each.optionId}
                    value={each.optionId}
                    placeholder={each.displayText}
                  >
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add_transaction_button">
                Add
              </button>
            </form>
          </div>

          <div className="history">
            <h2 className="history_heading">History</h2>
            <ul className="history_table">
              <li className="transaction_item">
                <p className="transaction_item_title table_heading">Title</p>
                <p className="transaction_item_amount table_heading">Amount</p>
                <p className="transaction_item_type table_heading">Type</p>
              </li>
              {transactionsList.map(each => (
                <TransactionItem
                  key={each.id}
                  transactionDetails={each}
                  onDeletingListItem={this.onDeletingListItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
