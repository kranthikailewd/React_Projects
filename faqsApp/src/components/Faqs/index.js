import {Component} from 'react'
import FaqItem from '../FaqItem/index'
import './index.css'

class Faqs extends Component {
  constructor(props) {
    super(props)
    this.state = {faqsList: props.faqsList.map(each => ({...each, hide: true}))}
  }

  unhide = id => {
    this.setState(prev => ({
      faqsList: prev.faqsList.map(each =>
        each.id === id ? {...each, hide: !each.hide} : each,
      ),
    }))
  }

  render() {
    const {faqsList} = this.state
    return (
      <div className="main_container">
        <h1 className="main_heading">FAQs</h1>
        <ul className="faq_container">
          {faqsList.map(each => (
            <FaqItem key={each.id} faqDetails={each} unhide={this.unhide} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Faqs
