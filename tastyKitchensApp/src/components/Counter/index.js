import {Component} from 'react'
import Context from '../../context/context'
import './index.css'

class Counter extends Component {
  render() {
    const {
      foodItemId,
      quantity,
      decButtonTestId,
      incButtonTestId,
      quantityTestId,
    } = this.props
    return (
      <Context.Consumer>
        {value => {
          const {onDecrement, onIncrement} = value
          return (
            <div className="counter_group">
              <button
                data-testid={decButtonTestId}
                className="counter_button"
                type="button"
                onClick={() => onDecrement(foodItemId)}
              >
                -
              </button>
              <div data-testid={quantityTestId}>{quantity}</div>
              <button
                data-testid={incButtonTestId}
                className="counter_button"
                type="button"
                onClick={() => onIncrement(foodItemId)}
              >
                +
              </button>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

Counter.contextType = Context

export default Counter
