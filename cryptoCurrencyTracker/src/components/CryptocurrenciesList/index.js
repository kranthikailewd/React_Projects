import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import CryptocurrencyItem from '../CryptocurrencyItem/index'
import './index.css'

class CryptocurrenciesList extends Component {
  state = {cryptoList: [], isLoading: true}

  componentDidMount() {
    this.gettingCryptoList()
  }

  gettingCryptoList = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    const formattedData = data.map(each => ({
      currencyName: each.currency_name,
      usdValue: each.usd_value,
      euroValue: each.euro_value,
      id: each.id,
      currencyLogo: each.currency_logo,
    }))
    this.setState({cryptoList: formattedData, isLoading: false})
  }

  render() {
    const {cryptoList, isLoading} = this.state
    return (
      <div className="crypto_container">
        {isLoading ? (
          <div className="loading_container" data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <div className="visible_decide_container">
            <h1 className="main_heading">Cryptocurrency Tracker</h1>
            <img
              className="main_img"
              src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
              alt="cryptocurrency"
            />
            <ul className="cryptos">
              <div className="crypto_list_headings">
                <p className="crypto_heading">Coin Type</p>
                <div className="currency_headings">
                  <p className="currency_heading">USD</p>
                  <p className="currency_heading">EURO</p>
                </div>
              </div>
              {cryptoList.map(each => (
                <CryptocurrencyItem key={each.id} cryptoDetails={each} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
