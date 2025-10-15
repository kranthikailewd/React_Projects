import {Component} from 'react'
import './index.css'
import DenominationItem from '../DenominationItem/index'

class CashWithdrawal extends Component {
  constructor(props) {
    super(props)
    this.state = {denominationsList: props.denominationsList, amount: 2000}
  }

  onClickDeduct = value => {
    this.setState(prevState => ({amount: prevState.amount - value}))
  }

  render() {
    const {denominationsList, amount} = this.state

    return (
      <div className="main_container">
        <div className="user_info">
          <p className="user_profile_pic">s</p>
          <h1 className="user_name">Sarah Williams</h1>
        </div>
        <div className="balance">
          <p className="your_balance">Your Balance</p>
          <p className="amount">{amount}</p>
        </div>
        <p className="currency">In Rupees</p>
        <p className="withdraw_heading">Withdraw</p>
        <p className="select_amount_heading">CHOOSE SUM (IN RUPEES)</p>
        <ul className="denominations_container">
          {denominationsList.map(each => (
            <DenominationItem
              key={each.id}
              denomsInfo={each}
              onClickDeduct={this.onClickDeduct}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default CashWithdrawal
