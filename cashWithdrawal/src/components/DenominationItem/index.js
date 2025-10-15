import './index.css'

const DenominationItem = props => {
  const {denomsInfo, onClickDeduct} = props
  const {value} = denomsInfo
  const deductFunction = () => {
    onClickDeduct(value)
  }

  return (
    <li>
      <button
        className="deduct_amount"
        type="button"
        name={value}
        onClick={deductFunction}
      >
        {value}
      </button>
    </li>
  )
}

export default DenominationItem
