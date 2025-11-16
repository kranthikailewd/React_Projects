import './index.css'

const CryptocurrencyItem = props => {
  const {cryptoDetails} = props
  const {currencyName, usdValue, euroValue, currencyLogo} = cryptoDetails

  return (
    <li className="crypto_item">
      <div className="logo_name">
        <img className="crypto_logo" src={currencyLogo} alt={currencyName} />
        <p className="crypto_name">{currencyName}</p>
      </div>
      <div className="usd_euro">
        <p className="usd">{usdValue}</p>
        <p className="euro">{euroValue}</p>
      </div>
    </li>
  )
}

export default CryptocurrencyItem
